#!/usr/bin/env python3
"""
Harness Step Executor — phase 내 step을 순차 실행하고 자가 교정한다.

Usage:
    python3 scripts/execute.py <phase-dir> [--push] [--squash] [--step N]
"""

import argparse
import contextlib
import json
import os
import re
import subprocess
import sys
import threading
import time
import types
from datetime import datetime, timezone, timedelta
from pathlib import Path
from typing import Optional

ROOT = Path(__file__).resolve().parent.parent


@contextlib.contextmanager
def progress_indicator(label: str):
    """터미널 진행 표시기. with 문으로 사용하며 .elapsed 로 경과 시간을 읽는다."""
    frames = "◐◓◑◒"
    stop = threading.Event()
    t0 = time.monotonic()

    def _animate():
        idx = 0
        while not stop.wait(0.12):
            sec = int(time.monotonic() - t0)
            sys.stderr.write(f"\r{frames[idx % len(frames)]} {label} [{sec}s]")
            sys.stderr.flush()
            idx += 1
        sys.stderr.write("\r" + " " * (len(label) + 20) + "\r")
        sys.stderr.flush()

    th = threading.Thread(target=_animate, daemon=True)
    th.start()
    info = types.SimpleNamespace(elapsed=0.0)
    try:
        yield info
    finally:
        stop.set()
        th.join()
        info.elapsed = time.monotonic() - t0


class StepExecutor:
    """Phase 디렉토리 안의 step들을 순차 실행하는 하네스."""

    MAX_RETRIES = 3
    FEAT_MSG = "feat({phase}): step {num} — {name}"
    FIX_MSG  = "fix({phase}): step {num} — {name}"
    CHORE_MSG = "chore({phase}): step {num} output"
    TZ = timezone(timedelta(hours=9))

    def __init__(self, phase_dir_name: str, *, auto_push: bool = False,
                 only_step: Optional[int] = None, squash: bool = False,
                 is_fix: bool = False):
        self._root = str(ROOT)
        self._phases_dir = ROOT / "phases"
        self._phase_dir = self._phases_dir / phase_dir_name
        self._phase_dir_name = phase_dir_name
        self._top_index_file = self._phases_dir / "index.json"
        self._auto_push = auto_push
        self._only_step = only_step
        self._squash = squash
        self._is_fix = is_fix

        if not self._phase_dir.is_dir():
            print(f"ERROR: {self._phase_dir} not found")
            sys.exit(1)

        self._index_file = self._phase_dir / "index.json"
        if not self._index_file.exists():
            print(f"ERROR: {self._index_file} not found")
            sys.exit(1)

        idx = self._read_json(self._index_file)
        self._project = idx.get("project", "project")
        self._phase_name = idx.get("phase", phase_dir_name)
        self._total = len(idx["steps"])

        if only_step is not None:
            step_nums = [s["step"] for s in idx["steps"]]
            if only_step not in step_nums:
                print(f"ERROR: step {only_step} not found. Available: {step_nums}")
                sys.exit(1)

    def run(self):
        self._print_header()
        self._check_clean_worktree()
        self._check_blockers()
        self._checkout_branch()
        guardrails = self._load_guardrails()
        self._ensure_created_at()
        self._execute_all_steps(guardrails)
        if self._only_step is None:
            self._finalize()

    # --- timestamps ---

    def _stamp(self) -> str:
        return datetime.now(self.TZ).strftime("%Y-%m-%dT%H:%M:%S%z")

    # --- JSON I/O ---

    @staticmethod
    def _read_json(p: Path) -> dict:
        return json.loads(p.read_text(encoding="utf-8"))

    @staticmethod
    def _write_json(p: Path, data: dict):
        p.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")

    @property
    def _branch_name(self) -> str:
        prefix = "fix" if self._is_fix else "feat"
        return f"{prefix}-{self._phase_name}"

    # --- git ---

    def _run_git(self, *args) -> subprocess.CompletedProcess:
        cmd = ["git"] + list(args)
        return subprocess.run(cmd, cwd=self._root, capture_output=True, text=True)

    def _checkout_branch(self):
        branch = self._branch_name

        r = self._run_git("rev-parse", "--abbrev-ref", "HEAD")
        if r.returncode != 0:
            print(f"  ERROR: git을 사용할 수 없거나 git repo가 아닙니다.")
            print(f"  {r.stderr.strip()}")
            sys.exit(1)

        if r.stdout.strip() == branch:
            return

        r = self._run_git("rev-parse", "--verify", branch)
        r = self._run_git("checkout", branch) if r.returncode == 0 else self._run_git("checkout", "-b", branch)

        if r.returncode != 0:
            print(f"  ERROR: 브랜치 '{branch}' checkout 실패.")
            print(f"  {r.stderr.strip()}")
            print(f"  Hint: 변경사항을 stash하거나 commit한 후 다시 시도하세요.")
            sys.exit(1)

        print(f"  Branch: {branch}")

    def _commit_step(self, step_num: int, step_name: str):
        output_rel = f"phases/{self._phase_dir_name}/step{step_num}-output.json"
        index_rel = f"phases/{self._phase_dir_name}/index.json"

        self._run_git("add", "-A")
        self._run_git("reset", "HEAD", "--", output_rel)
        self._run_git("reset", "HEAD", "--", index_rel)

        if self._run_git("diff", "--cached", "--quiet").returncode != 0:
            template = self.FIX_MSG if self._is_fix else self.FEAT_MSG
            msg = template.format(phase=self._phase_name, num=step_num, name=step_name)
            r = self._run_git("commit", "-m", msg)
            if r.returncode == 0:
                print(f"  Commit: {msg}")
            else:
                print(f"  WARN: 코드 커밋 실패: {r.stderr.strip()}")

        self._run_git("add", "-A")
        if self._run_git("diff", "--cached", "--quiet").returncode != 0:
            msg = self.CHORE_MSG.format(phase=self._phase_name, num=step_num)
            r = self._run_git("commit", "-m", msg)
            if r.returncode != 0:
                print(f"  WARN: housekeeping 커밋 실패: {r.stderr.strip()}")

    # --- top-level index ---

    def _update_top_index(self, status: str):
        if not self._top_index_file.exists():
            return
        top = self._read_json(self._top_index_file)
        ts = self._stamp()
        for phase in top.get("phases", []):
            if phase.get("dir") == self._phase_dir_name:
                phase["status"] = status
                ts_key = {"completed": "completed_at", "error": "failed_at", "blocked": "blocked_at"}.get(status)
                if ts_key:
                    phase[ts_key] = ts
                break
        self._write_json(self._top_index_file, top)

    # --- guardrails & context ---

    def _load_guardrails(self) -> str:
        sections = []
        claude_md = ROOT / "CLAUDE.md"
        if claude_md.exists():
            sections.append(f"## 프로젝트 규칙 (CLAUDE.md)\n\n{claude_md.read_text()}")
        docs_dir = ROOT / "docs"
        if docs_dir.is_dir():
            for doc in sorted(docs_dir.glob("*.md")):
                sections.append(f"## {doc.stem}\n\n{doc.read_text()}")
        return "\n\n---\n\n".join(sections) if sections else ""

    @staticmethod
    def _build_step_context(index: dict) -> str:
        lines = [
            f"- Step {s['step']} ({s['name']}): {s['summary']}"
            for s in index["steps"]
            if s["status"] == "completed" and s.get("summary")
        ]
        if not lines:
            return ""
        return "## 이전 Step 산출물\n\n" + "\n".join(lines) + "\n\n"

    def _build_preamble(self, guardrails: str, step_context: str,
                        prev_error: Optional[str] = None) -> str:
        commit_template = self.FIX_MSG if self._is_fix else self.FEAT_MSG
        commit_example = commit_template.format(
            phase=self._phase_name, num="N", name="<step-name>"
        )
        retry_section = ""
        if prev_error:
            retry_section = (
                f"\n## ⚠ 이전 시도 실패 — 아래 에러를 반드시 참고하여 수정하라\n\n"
                f"{prev_error}\n\n---\n\n"
            )
        return (
            f"당신은 {self._project} 프로젝트의 개발자입니다. 아래 step을 수행하세요.\n\n"
            f"{guardrails}\n\n---\n\n"
            f"{step_context}{retry_section}"
            f"## 작업 규칙\n\n"
            f"1. 이전 step에서 작성된 코드를 확인하고 일관성을 유지하라.\n"
            f"2. 이 step에 명시된 작업만 수행하라. 추가 기능이나 파일을 만들지 마라.\n"
            f"3. 기존 테스트를 깨뜨리지 마라.\n"
            f"4. AC(Acceptance Criteria) 검증을 직접 실행하라.\n"
            f"5. /phases/{self._phase_dir_name}/index.json의 해당 step status를 업데이트하라:\n"
            f"   - AC 통과 → \"completed\" + \"summary\" 필드에 이 step의 산출물을 한 줄로 요약\n"
            f"   - {self.MAX_RETRIES}회 수정 시도 후에도 실패 → \"error\" + \"error_message\" 기록\n"
            f"   - 사용자 개입이 필요한 경우 (API 키, 인증, 수동 설정 등) → \"blocked\" + \"blocked_reason\" 기록 후 즉시 중단\n"
            f"6. 모든 변경사항을 커밋하라:\n"
            f"   {commit_example}\n\n---\n\n"
        )

    # --- AC 검증 ---

    def _extract_ac_commands(self, step_file: Path) -> list:
        """step.md의 ## Acceptance Criteria 섹션에서 bash 커맨드를 추출한다."""
        content = step_file.read_text(encoding="utf-8")
        m = re.search(r"## Acceptance Criteria\s+```bash\s+(.*?)```", content, re.DOTALL)
        if not m:
            return []
        return [
            line.strip()
            for line in m.group(1).splitlines()
            if line.strip() and not line.strip().startswith("#")
        ]

    def _verify_ac(self, step_num: int, commands: list) -> tuple:
        """AC 커맨드를 순서대로 실행한다. (성공 여부, 에러 메시지) 반환."""
        for cmd in commands:
            try:
                r = subprocess.run(
                    cmd, shell=True, cwd=self._root,
                    capture_output=True, text=True, timeout=300,
                )
            except subprocess.TimeoutExpired:
                return False, f"AC timeout (300s): `{cmd}`"
            if r.returncode != 0:
                stdout_tail = r.stdout[-500:] if r.stdout else ""
                stderr_tail = r.stderr[-500:] if r.stderr else ""
                return False, f"AC 실패: `{cmd}`\n{stdout_tail}\n{stderr_tail}".strip()
        return True, ""

    # --- Claude 호출 ---

    def _invoke_claude(self, step: dict, preamble: str) -> dict:
        step_num, step_name = step["step"], step["name"]
        step_file = self._phase_dir / f"step{step_num}.md"

        if not step_file.exists():
            print(f"  ERROR: {step_file} not found")
            sys.exit(1)

        prompt = preamble + step_file.read_text()
        out_path = self._phase_dir / f"step{step_num}-output.json"
        try:
            result = subprocess.run(
                ["claude", "-p", "--dangerously-skip-permissions", "--output-format", "json", prompt],
                cwd=self._root, capture_output=True, text=True, timeout=1800,
            )
        except subprocess.TimeoutExpired:
            print(f"\n  ERROR: Claude 호출 timeout (1800초 초과)")
            output = {
                "step": step_num, "name": step_name,
                "exitCode": -1, "stdout": "",
                "stderr": "TimeoutExpired: Claude 호출이 1800초를 초과했습니다.",
            }
            out_path.write_text(json.dumps(output, indent=2, ensure_ascii=False), encoding="utf-8")
            return output

        if result.returncode != 0:
            print(f"\n  WARN: Claude가 비정상 종료됨 (code {result.returncode})")
            if result.stderr:
                print(f"  stderr: {result.stderr[:500]}")

        output = {
            "step": step_num, "name": step_name,
            "exitCode": result.returncode,
            "stdout": result.stdout, "stderr": result.stderr,
        }
        with open(out_path, "w") as f:
            json.dump(output, f, indent=2, ensure_ascii=False)

        return output

    # --- 헤더 & 검증 ---

    def _check_clean_worktree(self):
        """uncommitted changes가 있으면 중단하고 복구 방법을 안내한다."""
        r = self._run_git("status", "--porcelain")
        if r.returncode == 0 and r.stdout.strip():
            print("\n  WARN: uncommitted changes 감지됨 (이전 실행이 중단됐을 수 있습니다)")
            print("  아래 중 하나를 선택하세요:")
            print("    보관:  git stash push -m 'harness-recovery'")
            print("    폐기:  git checkout -- . && git clean -fd")
            print("  처리 후 다시 실행하세요.")
            sys.exit(1)

    def _print_header(self):
        print(f"\n{'='*60}")
        print(f"  Harness Step Executor")
        print(f"  Phase: {self._phase_name} | Steps: {self._total}")
        if self._only_step is not None:
            print(f"  Single-step mode: step {self._only_step}")
        if self._auto_push:
            print(f"  Auto-push: enabled")
        print(f"{'='*60}")

    def _check_blockers(self):
        index = self._read_json(self._index_file)
        for s in index["steps"]:
            if s["status"] == "error":
                print(f"\n  ✗ Step {s['step']} ({s['name']}) failed.")
                print(f"  Error: {s.get('error_message', 'unknown')}")
                print(f"  Fix and reset status to 'pending' to retry.")
                sys.exit(1)
            if s["status"] == "blocked":
                print(f"\n  ⏸ Step {s['step']} ({s['name']}) blocked.")
                print(f"  Reason: {s.get('blocked_reason', 'unknown')}")
                print(f"  Resolve and reset status to 'pending' to retry.")
                sys.exit(2)

    def _ensure_created_at(self):
        index = self._read_json(self._index_file)
        if "created_at" not in index:
            index["created_at"] = self._stamp()
            self._write_json(self._index_file, index)

    # --- 실행 루프 ---

    def _execute_single_step(self, step: dict, guardrails: str, force_fix: bool = False) -> bool:
        """단일 step 실행 (재시도 포함). 완료되면 True, 실패/차단이면 False."""
        step_num, step_name = step["step"], step["name"]
        done = sum(1 for s in self._read_json(self._index_file)["steps"] if s["status"] == "completed")
        prev_error = None

        for attempt in range(1, self.MAX_RETRIES + 1):
            index = self._read_json(self._index_file)
            step_context = self._build_step_context(index)
            preamble = self._build_preamble(guardrails, step_context, prev_error)

            tag = f"Step {step_num}/{self._total - 1} ({done} done): {step_name}"
            if attempt > 1:
                tag += f" [retry {attempt}/{self.MAX_RETRIES}]"

            with progress_indicator(tag) as pi:
                self._invoke_claude(step, preamble)
                elapsed = int(pi.elapsed)

            index = self._read_json(self._index_file)
            status = next((s.get("status", "pending") for s in index["steps"] if s["step"] == step_num), "pending")
            ts = self._stamp()

            if status == "completed":
                # AC 독립 검증
                step_file = self._phase_dir / f"step{step_num}.md"
                ac_cmds = self._extract_ac_commands(step_file)
                if ac_cmds:
                    print(f"  Verifying AC ({len(ac_cmds)} command(s))...")
                    ac_ok, ac_err = self._verify_ac(step_num, ac_cmds)
                    if not ac_ok:
                        if attempt < self.MAX_RETRIES:
                            for s in index["steps"]:
                                if s["step"] == step_num:
                                    s["status"] = "pending"
                                    s.pop("error_message", None)
                            self._write_json(self._index_file, index)
                            prev_error = f"[AC 검증 실패] {ac_err}"
                            print(f"  ↻ Step {step_num}: AC 실패, retry {attempt}/{self.MAX_RETRIES}")
                            continue
                        else:
                            for s in index["steps"]:
                                if s["step"] == step_num:
                                    s["status"] = "error"
                                    s["error_message"] = f"[AC 검증 {self.MAX_RETRIES}회 실패] {ac_err}"
                                    s["failed_at"] = ts
                            self._write_json(self._index_file, index)
                            self._commit_step(step_num, step_name)
                            print(f"  ✗ Step {step_num}: AC 검증 실패 ({self.MAX_RETRIES}회 소진) [{elapsed}s]")
                            self._update_top_index("error")
                            sys.exit(1)

                for s in index["steps"]:
                    if s["step"] == step_num:
                        s["completed_at"] = ts
                self._write_json(self._index_file, index)
                self._commit_step(step_num, step_name)
                print(f"  ✓ Step {step_num}: {step_name} [{elapsed}s]")
                return True

            if status == "blocked":
                for s in index["steps"]:
                    if s["step"] == step_num:
                        s["blocked_at"] = ts
                self._write_json(self._index_file, index)
                reason = next((s.get("blocked_reason", "") for s in index["steps"] if s["step"] == step_num), "")
                print(f"  ⏸ Step {step_num}: {step_name} blocked [{elapsed}s]")
                print(f"    Reason: {reason}")
                self._update_top_index("blocked")
                sys.exit(2)

            err_msg = next(
                (s.get("error_message", "Step did not update status") for s in index["steps"] if s["step"] == step_num),
                "Step did not update status",
            )

            if attempt < self.MAX_RETRIES:
                for s in index["steps"]:
                    if s["step"] == step_num:
                        s["status"] = "pending"
                        s.pop("error_message", None)
                self._write_json(self._index_file, index)
                prev_error = err_msg
                print(f"  ↻ Step {step_num}: retry {attempt}/{self.MAX_RETRIES} — {err_msg}")
            else:
                for s in index["steps"]:
                    if s["step"] == step_num:
                        s["status"] = "error"
                        s["error_message"] = f"[{self.MAX_RETRIES}회 시도 후 실패] {err_msg}"
                        s["failed_at"] = ts
                self._write_json(self._index_file, index)
                self._commit_step(step_num, step_name)
                print(f"  ✗ Step {step_num}: {step_name} failed after {self.MAX_RETRIES} attempts [{elapsed}s]")
                print(f"    Error: {err_msg}")
                self._update_top_index("error")
                sys.exit(1)

        return False  # unreachable

    def _execute_all_steps(self, guardrails: str):
        if self._only_step is not None:
            self._execute_single_step_by_num(self._only_step, guardrails)
            return

        while True:
            index = self._read_json(self._index_file)
            pending = next((s for s in index["steps"] if s["status"] == "pending"), None)
            if pending is None:
                print("\n  All steps completed!")
                return

            step_num = pending["step"]
            for s in index["steps"]:
                if s["step"] == step_num and "started_at" not in s:
                    s["started_at"] = self._stamp()
                    self._write_json(self._index_file, index)
                    break

            self._execute_single_step(pending, guardrails)

    def _execute_single_step_by_num(self, step_num: int, guardrails: str):
        """--step 플래그로 지정된 특정 step을 강제 실행한다. 현재 status와 무관하게 실행."""
        index = self._read_json(self._index_file)
        step = next((s for s in index["steps"] if s["step"] == step_num), None)
        if step is None:
            print(f"  ERROR: step {step_num} not found in index")
            sys.exit(1)

        # 강제 실행을 위해 status를 pending으로 초기화
        original_status = step["status"]
        if original_status not in ("pending", "error"):
            print(f"  Forcing step {step_num} ({step['name']}) from '{original_status}' to 'pending'")
            for s in index["steps"]:
                if s["step"] == step_num:
                    s["status"] = "pending"
                    s.pop("error_message", None)
                    s.pop("completed_at", None)
            self._write_json(self._index_file, index)
            index = self._read_json(self._index_file)
            step = next(s for s in index["steps"] if s["step"] == step_num)

        if "started_at" not in step:
            for s in index["steps"]:
                if s["step"] == step_num:
                    s["started_at"] = self._stamp()
                    self._write_json(self._index_file, index)
                    break

        self._execute_single_step(step, guardrails)

    def _squash_commits(self):
        """branch의 모든 step 커밋을 단일 커밋으로 squash한다."""
        branch = self._branch_name
        merge_base = None
        for base in ("main", "master", "develop"):
            r = self._run_git("merge-base", base, branch)
            if r.returncode == 0:
                merge_base = r.stdout.strip()
                break

        if not merge_base:
            print("  WARN: squash 건너뜀 — base 브랜치(main/master/develop)를 찾을 수 없음")
            return

        r = self._run_git("rev-list", "--count", f"{merge_base}..HEAD")
        if r.returncode != 0:
            print(f"  WARN: squash 건너뜀 — rev-list 실패: {r.stderr.strip()}")
            return
        commit_count = int(r.stdout.strip())
        if commit_count <= 1:
            print(f"  squash: 커밋이 {commit_count}개라 건너뜀")
            return

        r = self._run_git("reset", "--soft", merge_base)
        if r.returncode != 0:
            print(f"  WARN: squash 실패 — reset 오류: {r.stderr.strip()}")
            return

        prefix = "fix" if self._is_fix else "feat"
        msg = f"{prefix}({self._phase_name}): complete phase"
        r = self._run_git("commit", "-m", msg)
        if r.returncode == 0:
            print(f"  ✓ Squashed {commit_count} commits → {msg}")
        else:
            print(f"  WARN: squash 커밋 실패: {r.stderr.strip()}")

    def _finalize(self):
        index = self._read_json(self._index_file)
        index["completed_at"] = self._stamp()
        self._write_json(self._index_file, index)
        self._update_top_index("completed")

        self._run_git("add", "-A")
        if self._run_git("diff", "--cached", "--quiet").returncode != 0:
            msg = f"chore({self._phase_name}): mark phase completed"
            r = self._run_git("commit", "-m", msg)
            if r.returncode == 0:
                print(f"  ✓ {msg}")

        if self._squash:
            self._squash_commits()

        if self._auto_push:
            r = self._run_git("push", "-u", "origin", self._branch_name)
            if r.returncode != 0:
                print(f"\n  ERROR: git push 실패: {r.stderr.strip()}")
                sys.exit(1)
            print(f"  ✓ Pushed to origin/{self._branch_name}")

        print(f"\n{'='*60}")
        print(f"  Phase '{self._phase_name}' completed!")
        print(f"{'='*60}")


def main():
    parser = argparse.ArgumentParser(description="Harness Step Executor")
    parser.add_argument("phase_dir", help="Phase directory name (e.g. 0-mvp)")
    parser.add_argument("--push", action="store_true", help="Push branch after completion")
    parser.add_argument("--step", type=int, default=None, metavar="N",
                        help="Run only step N (forces re-execution regardless of current status)")
    parser.add_argument("--squash", action="store_true",
                        help="Squash all step commits into one after phase completion")
    parser.add_argument("--fix", action="store_true",
                        help="Create fix-{phase} branch and use fix: commit type (for bug-fix phases)")
    args = parser.parse_args()

    if args.step is not None and args.push:
        print("ERROR: --step과 --push는 함께 쓸 수 없습니다. phase 전체 완료 후 push하세요.")
        sys.exit(1)
    if args.step is not None and args.squash:
        print("ERROR: --squash는 --step과 함께 쓸 수 없습니다. phase 전체 완료 후 squash하세요.")
        sys.exit(1)

    StepExecutor(args.phase_dir, auto_push=args.push, only_step=args.step,
                 squash=args.squash, is_fix=args.fix).run()


if __name__ == "__main__":
    main()
