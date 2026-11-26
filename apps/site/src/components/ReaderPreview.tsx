import { useState } from 'react'
import { site } from '../i18n/site'
import type { Locale } from '../lib/store'

const CODE_LINES = [
  "import { createServer } from 'node:http'",
  "import { parseConfig, resolveTargets } from './runtime'",
  '',
  'export interface SyncOptions {',
  '  readonly workspace: string',
  '  readonly dryRun?: boolean',
  '  readonly concurrency: number',
  '}',
  '',
  'export async function runPipeline(opts: SyncOptions) {',
  '  const cfg = await parseConfig(opts.workspace)',
  '  const targets = resolveTargets(cfg.entries)',
  '  for (const item of targets) {',
  "    if (item.status === 'ready') await item.flush()",
  '  }',
  '  return { total: targets.length, ok: true }',
  '}',
]

export default function ReaderPreview({ lang }: { lang: Locale }) {
  const P = site[lang].preview
  const [opacity, setOpacity] = useState(82)
  const [fontSize, setFontSize] = useState(14)
  const [page, setPage] = useState(0)
  const [hidden, setHidden] = useState(false)

  return (
    <div className="mt-12 w-full max-w-[960px] self-center">
      <div className="overflow-hidden rounded-2xl border bg-white shadow-[0_24px_60px_-24px_rgba(0,0,0,0.16)]">
        {/* Top bar */}
        <div className="flex flex-wrap items-center gap-3 border-b bg-[#f7f7f5] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-2 rounded-md bg-white px-2.5 py-0.5 font-mono text-[12px] text-label border">
            {P.editorTab}
          </span>
          <div className="flex-1" />
          <div className="flex flex-wrap items-center gap-4 text-[12px] text-label">
            <label className="flex items-center gap-2">
              <span className="whitespace-nowrap">{P.opacity}</span>
              <input
                type="range"
                min={25}
                max={100}
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-20 accent-[#1d1d1f]"
              />
              <span className="w-8 font-mono text-right">{opacity}%</span>
            </label>
            <label className="flex items-center gap-2">
              <span className="whitespace-nowrap">{P.fontSize}</span>
              <input
                type="range"
                min={12}
                max={18}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-16 accent-[#1d1d1f]"
              />
              <span className="w-7 font-mono text-right">{fontSize}</span>
            </label>
            <button
              type="button"
              onClick={() => setHidden((v) => !v)}
              className="cursor-pointer rounded-full border border-input bg-white px-3 py-1 text-[12px] font-medium text-foreground hover:bg-accent"
            >
              {hidden ? P.restore : P.bossKey}
            </button>
          </div>
        </div>

        {/* Simulated IDE canvas + floating Cloak window */}
        <div className="relative bg-[#fbfbfa] px-5 py-6 text-left font-mono text-[13px] leading-[1.7] text-[#86868b] select-none sm:px-7">
          <div className="grid grid-cols-[28px_1fr] gap-x-4 overflow-hidden">
            {CODE_LINES.map((line, i) => (
              <div key={i} className="contents">
                <span className="text-right text-[12px] text-[#c7c7cc]">{i + 1}</span>
                <span className="truncate whitespace-pre">{line || ' '}</span>
              </div>
            ))}
          </div>

          {!hidden ? (
            <div
              className="mt-4 rounded-xl border border-[#d6d6d2] bg-white/95 p-4 font-sans text-foreground shadow-[0_18px_40px_-16px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-opacity sm:absolute sm:right-6 sm:bottom-6 sm:mt-0 sm:w-[400px]"
              style={{ opacity: opacity / 100 }}
            >
              <div className="mb-2 flex items-center justify-between border-b border-divider pb-2 text-[12px] text-subtle">
                <span className="font-medium text-foreground">{P.bookTitle}</span>
                <span className="font-mono">
                  {page + 1} / {P.pages.length}
                </span>
              </div>
              <p className="m-0 leading-[1.7] text-pretty text-foreground" style={{ fontSize: `${fontSize}px` }}>
                {P.pages[page]}
              </p>
              <div className="mt-3 flex items-center justify-between pt-1 text-[12px]">
                <button
                  type="button"
                  onClick={() => setPage((p) => (p - 1 + P.pages.length) % P.pages.length)}
                  className="cursor-pointer rounded-md border border-input bg-background px-2.5 py-1 text-label hover:bg-accent hover:text-foreground"
                >
                  ← {P.prev}
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => (p + 1) % P.pages.length)}
                  className="cursor-pointer rounded-md border border-input bg-background px-2.5 py-1 text-label hover:bg-accent hover:text-foreground"
                >
                  {P.next} →
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed border-[#d4d4cf] bg-white/80 px-4 py-2.5 font-sans text-[13px] text-subtle sm:absolute sm:right-6 sm:bottom-6 sm:mt-0">
              <span>{P.hiddenTip}</span>
              <button
                type="button"
                onClick={() => setHidden(false)}
                className="ml-3 cursor-pointer rounded-full border border-input bg-white px-3 py-1 text-[12px] font-medium text-foreground hover:bg-accent"
              >
                {P.restore}
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="mt-3 text-center text-[13px] text-subtle">{P.hint}</p>
    </div>
  )
}
