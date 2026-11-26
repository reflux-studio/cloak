import { useState } from 'react'
import { site } from '../i18n/site'
import type { Locale } from '../lib/store'

export default function Faq({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(0)
  return (
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
                    <img
                      key={img.src}
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full rounded-xl border bg-white object-contain"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
