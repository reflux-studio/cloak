import { useEffect, useState } from 'react'
import { site, type FeatureItem } from '../i18n/site'
import type { Locale } from '../lib/store'

export default function FeatureGallery({ lang }: { lang: Locale }) {
  const items = site[lang].features.items
  const [zoomed, setZoomed] = useState<FeatureItem | null>(null)

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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-5">
        {items.map((item) => (
          <div key={item.key} className="flex flex-col overflow-hidden rounded-2xl border bg-background">
            <div className="flex flex-col gap-1.5 p-6 pb-4">
              <h3 className="m-0 text-[18px] font-semibold tracking-[-0.01em]">{item.title}</h3>
              <p className="m-0 text-[14px] leading-[1.6] text-pretty text-label">{item.description}</p>
            </div>
            <button
              type="button"
              onClick={() => setZoomed(item)}
              className="mt-auto ml-6 cursor-zoom-in overflow-hidden rounded-tl-xl border-t border-l bg-white p-0 text-left"
              aria-label={item.title}
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="block h-52 w-full object-cover object-top transition-transform duration-300 hover:scale-[1.02]"
              />
            </button>
          </div>
        ))}
      </div>

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomed.title}
          onClick={() => setZoomed(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] max-w-[960px] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-5 py-3">
              <span className="text-[15px] font-semibold">{zoomed.title}</span>
              <button
                type="button"
                onClick={() => setZoomed(null)}
                className="cursor-pointer rounded-full border border-input bg-white px-2.5 py-0.5 text-[16px] leading-none text-subtle hover:text-foreground"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <img src={zoomed.src} alt={zoomed.title} className="max-h-[78vh] w-auto object-contain bg-[#fbfbfa]" />
          </div>
        </div>
      )}
    </>
  )
}
