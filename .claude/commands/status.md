현재 phases의 진행 상황을 출력하라.

## 절차

1. `phases/index.json`이 존재하면 읽어서 전체 phase 목록과 상태를 파악한다.
   없으면 "phases/index.json 없음 — 아직 실행된 phase가 없습니다." 출력 후 종료.

2. 각 phase에 대해 `phases/{dir}/index.json`을 읽어 step 상세 정보를 가져온다.

3. 아래 형식으로 출력한다:

---

## Phase 전체 현황

| Phase | Status | 완료 | 전체 | 소요 시간 |
|-------|--------|------|------|-----------|
| {dir} | {status 이모지} {status} | {completed 수} | {전체 step 수} | {created_at → completed_at 또는 현재까지} |

**Status 이모지 규칙**: pending → ⏳ / completed → ✅ / error → ❌ / blocked → ⏸

---

## Phase별 Step 상세

각 phase마다 아래 형식으로 출력:

### {dir} ({status})

| Step | Name | Status | 시작 | 완료 | Summary / Error |
|------|------|--------|------|------|-----------------|
| {N}  | {name} | {이모지} {status} | {started_at 또는 -} | {completed_at 또는 -} | {summary 또는 error_message 또는 blocked_reason 또는 -} |

---

## 다음 액션

- pending step이 있으면: `python3 scripts/execute.py {dir}` 실행을 제안
- error step이 있으면: error_message를 요약하고 `index.json`에서 해당 step status를 `"pending"`으로 바꾼 뒤 재실행하라고 안내
- blocked step이 있으면: blocked_reason을 보여주고 사용자가 해결 후 재실행하도록 안내
- 모두 completed이면: 완료 축하 메시지 출력
