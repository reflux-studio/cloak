import { useEffect, useState } from 'react'
import { site } from '../i18n/site'
import type { Locale } from '../lib/store'

export default function Faq({ lang, base }: { lang: Locale; base: string }) {
  const [open, setOpen] = useState(0)
  const [zoomed, setZoomed] = useState<{ src: string; alt: string } | null>(null)

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
      <div className="flex flex-col border-t border-page-border">
        {site[lang].faq.items.map((item, i) => (
          <div key={item.q} className="border-b border-page-border">
            <button
              type="button"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full cursor-pointer items-center gap-4 border-0 bg-transparent py-5 text-left"
            >
              <span className="flex-1 text-[17px] font-semibold text-page-fg">{item.q}</span>
              <span
                className="text-[22px] leading-none text-page-subtle transition-transform duration-200"
                style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}
              >
                +
              </span>
            </button>
            {open === i && (
              <div className="flex flex-col gap-3 pr-4 pb-[22px] text-[15px] leading-[1.7] text-pretty text-page-muted sm:pr-10">
                {item.a.map((p) => (
                  <p key={p} className="m-0">
                    {p}
                  </p>
                ))}
                {item.steps && (
                  <ol className="m-0 flex list-none flex-col gap-1.5 pl-0 text-page-fg/90">
                    {item.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                )}
                {item.images && (
                  <div className="mt-1 grid gap-3 sm:grid-cols-2">
                    {item.images.map((img) => (
                      <button
                        key={img.src}
                        type="button"
                        onClick={() => setZoomed({ src: `${base}/${img.src}`, alt: img.alt })}
                        aria-label={img.alt}
                        className="cursor-zoom-in overflow-hidden rounded-xl border border-page-border bg-[#0c0e12] p-0 text-left"
                      >
                        <img
                          src={`${base}/${img.src}`}
                          alt={img.alt}
                          loading="lazy"
                          className="block h-44 w-full object-contain p-1.5"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomed.alt}
          onClick={() => setZoomed(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] max-w-[960px] flex-col overflow-hidden rounded-2xl border border-page-border-strong bg-page-surface shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-page-border px-5 py-3">
              <span className="text-[15px] font-semibold text-page-fg">{zoomed.alt}</span>
              <button
                type="button"
                onClick={() => setZoomed(null)}
                className="cursor-pointer rounded-full border border-page-border-strong bg-page-elevated px-2.5 py-0.5 text-[16px] leading-none text-page-muted hover:text-page-fg"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <img src={zoomed.src} alt={zoomed.alt} className="max-h-[78vh] w-auto bg-[#090a0c] object-contain" />
          </div>
        </div>
      )}
    </>
  )
}
