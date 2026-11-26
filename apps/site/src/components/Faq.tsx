import { useEffect, useState } from 'react'
import { site } from '../i18n/site'
import type { Locale } from '../lib/store'

export default function Faq({ lang }: { lang: Locale }) {
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
      <div className="flex flex-col border-t border-input">
        {site[lang].faq.items.map((item, i) => (
          <div key={item.q} className="border-b border-input">
            <button
              type="button"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
              className="flex w-full cursor-pointer items-center gap-4 border-0 bg-transparent py-5 text-left"
            >
              <span className="flex-1 text-[18px] font-semibold">{item.q}</span>
              <span
                className="text-[22px] leading-none text-muted-foreground transition-transform duration-200"
                style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}
              >
                +
              </span>
            </button>
            {open === i && (
              <div className="flex flex-col gap-3 pr-4 pb-[22px] text-[15px] leading-[1.65] text-pretty text-label sm:pr-10">
                {item.a.map((p) => (
                  <p key={p} className="m-0">
                    {p}
                  </p>
                ))}
                {item.steps && (
                  <ol className="m-0 flex list-none flex-col gap-1.5 pl-0">
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
                        onClick={() => setZoomed(img)}
                        aria-label={img.alt}
                        className="cursor-zoom-in overflow-hidden rounded-xl border bg-white p-0 text-left"
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          loading="lazy"
                          className="block h-44 w-full object-contain bg-white p-1"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[90vh] max-w-[960px] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-5 py-3">
              <span className="text-[15px] font-semibold">{zoomed.alt}</span>
              <button
                type="button"
                onClick={() => setZoomed(null)}
                className="cursor-pointer rounded-full border border-input bg-white px-2.5 py-0.5 text-[16px] leading-none text-subtle hover:text-foreground"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <img src={zoomed.src} alt={zoomed.alt} className="max-h-[78vh] w-auto bg-[#fbfbfa] object-contain" />
          </div>
        </div>
      )}
    </>
  )
}
