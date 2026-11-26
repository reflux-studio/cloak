import { useState } from 'react'
import { site } from '../i18n/site'
import { useRelease, type Locale, type Os } from '../lib/store'
import { Seg } from './Seg'

export default function Download({ lang }: { lang: Locale }) {
  const D = site[lang].download
  const { os, url } = useRelease()
  const [pick, setPick] = useState<Os | null>(null)
  const cur = pick ?? os
  const info = D.platforms.find((p) => p.key === cur)!

  return (
    <>
      <Seg
        opts={D.platforms.map((p) => [p.key, p.name])}
        value={cur}
        onChange={setPick}
        className="rounded-xl border border-page-border bg-page-surface p-1"
        item="rounded-[9px] px-[22px] py-2 text-[14px]"
        on="bg-white font-semibold text-[#090a0c] shadow-xs"
        off="bg-transparent text-page-muted hover:text-page-fg"
      />
      <div className="box-border w-full overflow-hidden rounded-2xl border border-page-border bg-page-surface text-left">
        <div className="flex flex-wrap items-center gap-4 px-6 py-[22px]">
          <div className="flex min-w-[180px] flex-1 flex-col gap-[3px]">
            <span className="text-[19px] font-semibold tracking-[-0.01em] text-page-fg">{info.name}</span>
            <span className="text-[13px] text-page-muted">{info.arch}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={url(info.secondaryKey)}
              className="rounded-full border border-page-border-strong bg-page-elevated px-4 py-2.5 text-[13px] font-medium whitespace-nowrap text-page-muted hover:bg-white/10 hover:text-page-fg"
            >
              {info.secondaryLabel}
            </a>
            <a
              href={url(cur)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-semibold whitespace-nowrap text-[#090a0c] hover:bg-white/90 hover:text-[#090a0c]"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" className="block" aria-hidden="true">
                <path
                  d="M8 2v8.5M4.5 7.5 8 11l3.5-3.5M3 13.5h10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {info.cta}
            </a>
          </div>
        </div>
        <div className="flex gap-3 border-t border-page-border bg-[#0c0e12] px-6 pt-4 pb-5">
          <span className="pt-px text-[13px] font-semibold whitespace-nowrap text-page-fg">{D.first}</span>
          <span className="text-[13px] leading-[1.65] text-pretty text-page-muted">{info.note}</span>
        </div>
      </div>
    </>
  )
}
