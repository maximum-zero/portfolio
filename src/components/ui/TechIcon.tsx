import Image from 'next/image'
import type { SkillItem } from '@/types/skill'

interface TechIconProps {
  item: SkillItem
  size?: 'sm' | 'md'
}

export default function TechIcon({ item, size = 'md' }: TechIconProps) {
  const isSm = size === 'sm'
  const containerCls = isSm
    ? 'w-9 h-9 rounded-lg'
    : 'w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-2xl'
  const imgSize = isSm ? 20 : 36
  const textCls = isSm ? 'text-[10px]' : 'text-[14px]'

  return (
    <div className="group/icon relative flex items-center justify-center">
      <div
        className={`${containerCls} bg-surface shadow-icon flex items-center justify-center transition-transform duration-200 group-hover/icon:-translate-y-0.5 cursor-default`}
      >
        {item.iconPath ? (
          <Image
            src={item.iconPath}
            alt={item.name}
            width={imgSize}
            height={imgSize}
            className="object-contain"
          />
        ) : item.iconSlug ? (
          <Image
            src={`https://cdn.simpleicons.org/${item.iconSlug}`}
            alt={item.name}
            width={imgSize}
            height={imgSize}
            unoptimized
          />
        ) : (
          <span className={`font-display ${textCls} font-bold text-ink-muted`}>
            {item.name.slice(0, 2)}
          </span>
        )}
      </div>

      {/* 툴팁 */}
      <div className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-150 z-20">
        <div className="bg-ink text-surface font-mono text-[11px] px-2.5 py-1 rounded-lg whitespace-nowrap">
          {item.name}
        </div>
        <div className="w-1.5 h-1.5 bg-ink rotate-45 absolute -bottom-0.5 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  )
}
