import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.key} className="flex flex-col overflow-hidden pb-0 shadow-none">
            <CardHeader>
              <CardTitle className="text-lg font-bold tracking-tight">{item.title}</CardTitle>
              <p className="m-0 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </CardHeader>
            <CardContent className="mt-auto px-0 pb-0">
              <button
                type="button"
                onClick={() => setZoomed(item)}
                aria-label={item.title}
                className="group ml-6 block w-[calc(100%-1.5rem)] cursor-zoom-in overflow-hidden rounded-tl-xl border-t border-l bg-muted/30 p-0 text-left"
              >
                <img
                  src={`${base}/${item.src}`}
                  alt={item.title}
                  loading="lazy"
                  className="block h-52 w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </button>
            </CardContent>
          </Card>
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
            className="flex max-h-[90vh] max-w-[1000px] flex-col overflow-hidden rounded-2xl border bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-5 py-3">
              <span className="text-[15px] font-semibold text-foreground">{zoomed.title}</span>
              <button
                type="button"
                onClick={() => setZoomed(null)}
                className="cursor-pointer rounded-full border bg-background px-2.5 py-0.5 text-[16px] leading-none text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <img src={`${base}/${zoomed.src}`} alt={zoomed.title} className="max-h-[80vh] w-auto bg-muted/30 object-contain" />
          </div>
        </div>
      )}
    </>
  )
}
