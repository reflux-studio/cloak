import { useEffect, useSyncExternalStore } from 'react'

export type Locale = 'zh' | 'en'
export type Os = 'mac' | 'win' | 'linux'
export type AssetKey = 'mac' | 'macIntel' | 'win' | 'winMsi' | 'linux' | 'linuxDeb'
export type Release = { v: string; publishedAt?: string } & Partial<Record<AssetKey, string>>

interface State {
  os: Os
  rel: Release | null
}

let state: State = { os: 'mac', rel: null }
const subs = new Set<() => void>()
const subscribe = (f: () => void) => (subs.add(f), () => void subs.delete(f))
const get = () => state

const setSite = (p: Partial<State>) => {
  state = { ...state, ...p }
  subs.forEach((f) => f())
}

const useSite = () => useSyncExternalStore(subscribe, get, get)

export const REPO = 'https://github.com/reflux-studio/cloak'
export const LATEST = `${REPO}/releases/latest`

const ASSET: Record<AssetKey, RegExp> = {
  mac: /_aarch64\.dmg$/i,
  macIntel: /_x64\.dmg$/i,
  win: /_x64-setup\.exe$/i,
  winMsi: /_x64_.*\.msi$/i,
  linux: /_amd64\.AppImage$/i,
  linuxDeb: /_amd64\.deb$/i,
}

let loading = false
function load() {
  if (loading) return
  loading = true
  const ua = navigator.userAgent
  setSite({ os: /Windows/i.test(ua) ? 'win' : /Linux/i.test(ua) && !/Android/i.test(ua) ? 'linux' : 'mac' })
  fetch('https://api.github.com/repos/reflux-studio/cloak/releases/latest')
    .then((r) => (r.ok ? r.json() : null))
    .then((j: { tag_name: string; published_at?: string; assets?: { name: string; browser_download_url: string }[] } | null) => {
      if (!j?.tag_name) return
      const rel: Release = { v: j.tag_name, publishedAt: j.published_at }
      // 响应内容不可信：只接受来自本仓库 GitHub Releases 的下载地址，否则回退到 releases/latest
      const safe = (u?: string) => (u?.startsWith(`${REPO}/releases/download/`) ? u : undefined)
      for (const k of Object.keys(ASSET) as AssetKey[]) {
        rel[k] = safe(j.assets?.find((a) => ASSET[k].test(a.name))?.browser_download_url)
      }
      setSite({ rel })
    })
    // 请求失败时链接回退到 releases/latest，版本号保持不显示
    .catch(() => {})
}

export function useRelease() {
  useEffect(load, [])
  const { rel, os } = useSite()
  return { rel, os, url: (k: AssetKey) => rel?.[k] ?? LATEST }
}
