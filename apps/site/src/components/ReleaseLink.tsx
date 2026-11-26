import { site } from '../i18n/site'
import { useRelease, type Locale } from '../lib/store'

export function PrimaryButton({ lang }: { lang: Locale }) {
  const { os, url } = useRelease()
  return (
    <a
      href={url(os)}
      className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-[13px] text-[15px] font-semibold whitespace-nowrap text-primary-foreground transition-opacity hover:opacity-90"
    >
      {site[lang].download.cta[os]}
    </a>
  )
}

export function VerLine({ lang }: { lang: Locale }) {
  return <>{site[lang].download.ver(useRelease().rel?.v)}</>
}
