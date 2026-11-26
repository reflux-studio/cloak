import { useEffect, useState } from 'react'
import { site, type FeatureItem } from '../i18n/site'
import type { Locale } from '../lib/store'

export default function FeatureGallery({ lang, base }: { lang: Locale; base: string }) {
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
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.key}
            className={`flex flex-col overflow-hidden rounded-2xl border border-page-border bg-page-surface ${
              item.featured ? 'md:col-span-2 lg:flex-row lg:items-stretch' : ''
            }`}
          >
            <div className={`flex flex-col gap-2 p-6 ${item.featured ? 'lg:w-[340px] lg:shrink-0 lg:justify-center' : 'pb-4'}`}>
              <h3 className="m-0 text-[18px] font-semibold tracking-[-0.01em] text-page-fg">{item.title}</h3>
              <p className="m-0 text-[14px] leading-[1.65] text-pretty text-page-muted">{item.description}</p>
            </div>
            <button
              type="button"
              onClick={() => setZoomed(item)}
              aria-label={item.title}
              className={`group cursor-zoom-in overflow-hidden border-0 bg-[#0d0f13] p-0 text-left ${
                item.featured
                  ? 'border-t border-page-border lg:flex-1 lg:border-t-0 lg:border-l'
                  : 'mt-auto ml-6 rounded-tl-xl border-t border-l border-page-border'
              }`}
            >
              <img
                src={`${base}/${item.src}`}
                alt={item.title}
                loading="lazy"
                className={`block w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02] ${
                  item.featured ? 'h-64 sm:h-72 lg:h-full lg:min-h-[280px]' : 'h-52'
                }`}
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] max-w-[1000px] flex-col overflow-hidden rounded-2xl border border-page-border-strong bg-page-surface shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-page-border px-5 py-3">
              <span className="text-[15px] font-semibold text-page-fg">{zoomed.title}</span>
              <button
                type="button"
                onClick={() => setZoomed(null)}
                className="cursor-pointer rounded-full border border-page-border-strong bg-page-elevated px-2.5 py-0.5 text-[16px] leading-none text-page-muted hover:text-page-fg"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <img src={`${base}/${zoomed.src}`} alt={zoomed.title} className="max-h-[80vh] w-auto bg-[#090a0c] object-contain" />
          </div>
        </div>
      )}
    </>
  )
}
