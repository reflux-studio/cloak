import { useEffect, useState } from 'react'
import { site, type ShowcaseTab } from '../i18n/site'
import type { Locale } from '../lib/store'
import { Seg } from './Seg'

export default function ScreenshotShowcase({ lang }: { lang: Locale }) {
  const S = site[lang].showcase
  const [active, setActive] = useState<string>(S.tabs[0].key)
  const [zoomed, setZoomed] = useState<ShowcaseTab | null>(null)
  const current = S.tabs.find((t) => t.key === active) ?? S.tabs[0]

  useEffect(() => {
    if (!zoomed) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomed])

  return (
    <>
      <div className="flex flex-col items-center gap-6">
        <div className="max-w-full overflow-x-auto pb-1">
          <Seg
            opts={S.tabs.map((t) => [t.key, t.label])}
            value={current.key}
            onChange={setActive}
            className="rounded-xl bg-muted p-1"
            item="rounded-[9px] px-4 py-2 text-[14px]"
            on="bg-white font-semibold text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
            off="bg-transparent text-label"
          />
        </div>

        <div className="w-full overflow-hidden rounded-2xl border bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.16)]">
          <div className="flex items-center justify-between border-b bg-[#f7f7f5] px-5 py-3 text-[13px]">
            <span className="font-medium text-foreground">{current.label}</span>
            <span className="text-subtle">{current.caption}</span>
          </div>
          <button
            type="button"
            onClick={() => setZoomed(current)}
            aria-label={current.label}
            className="group relative block w-full cursor-zoom-in border-0 bg-[#fbfbfa] p-0"
          >
            <img
              src={current.src}
              alt={current.label}
              className="mx-auto block max-h-[560px] w-full object-contain"
            />
            <span className="pointer-events-none absolute right-4 bottom-4 rounded-full border bg-white/90 px-3 py-1 text-[12px] text-label opacity-0 shadow-xs backdrop-blur-xs transition-opacity group-hover:opacity-100">
              {S.zoomHint}
            </span>
          </button>
        </div>
      </div>

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomed.label}
          onClick={() => setZoomed(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] max-w-[1040px] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="text-[15px] font-semibold">{zoomed.label}</span>
                <span className="text-[13px] text-subtle">{zoomed.caption}</span>
              </div>
              <button
                type="button"
                onClick={() => setZoomed(null)}
                className="cursor-pointer rounded-full border border-input bg-white px-2.5 py-0.5 text-[16px] leading-none text-subtle hover:text-foreground"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <img src={zoomed.src} alt={zoomed.label} className="max-h-[80vh] w-auto bg-[#fbfbfa] object-contain" />
          </div>
        </div>
      )}
    </>
  )
}
