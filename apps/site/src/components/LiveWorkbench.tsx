import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  BookOpen,
  ChevronRight,
  Eye,
  EyeOff,
  File,
  FileText,
  HardDrive,
  Heart,
  Minus,
  Moon,
  Package,
  Plus,
  RotateCcw,
  Settings,
  Sun,
  X,
} from 'lucide-react'
import { site } from '../i18n/site'
import type { Locale } from '../lib/store'

const CODE_LINES = [
  "import { invoke } from '@tauri-apps/api/core'",
  "import { listen } from '@tauri-apps/api/event'",
  "import { getCurrentWindow } from '@tauri-apps/api/window'",
  '',
  'export async function syncReaderPosition(novelId: number, line: number) {',
  '  const state = await invoke("set_read_position", { novelId, line })',
  '  return state',
  '}',
  '',
  'export function bindBossKey(shortcut: string, onTrigger: () => void) {',
  '  return listen("cloak://boss-key", () => {',
  '    onTrigger()',
  '  })',
  '}',
]

export default function LiveWorkbench({ lang }: { lang: Locale }) {
  const W = site[lang].workbench
  const books = W.books

  const [activeTab, setActiveTab] = useState<'current' | 'library' | 'settings'>('current')
  const [appTheme, setAppTheme] = useState<'light' | 'dark'>('light')
  const [bookIdx, setBookIdx] = useState(0)
  const [chapIdx, setChapIdx] = useState(0)
  const [lineIdx, setLineIdx] = useState(0)

  // Real ReaderWindow states from apps/desktop/src/windows/reader/index.tsx
  const [isFocus, setIsFocus] = useState(false)
  const [transparent, setTransparent] = useState(true)
  const [readingMode, setReadingMode] = useState(true)
  const [bossHidden, setBossHidden] = useState(false)

  // Typography settings matching ReadingSettingsForm
  const [fontSize, setFontSize] = useState(14)
  const [lineHeight, setLineHeight] = useState(1.7)
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [fontColor, setFontColor] = useState('#52525b')

  const book = books[bookIdx]
  const chapter = book.chapters[chapIdx] ?? book.chapters[0]
  const totalLines = book.chapters.reduce((acc, c) => acc + c.lines.length, 0)
  const globalLine =
    book.chapters.slice(0, chapIdx).reduce((acc, c) => acc + c.lines.length, 0) + lineIdx + 1
  const progress = Math.round((globalLine / totalLines) * 10000) / 100

  const selectBook = (idx: number) => {
    setBookIdx(idx)
    setChapIdx(0)
    setLineIdx(0)
    setBossHidden(false)
  }

  const nextLine = () => {
    if (lineIdx + 1 < chapter.lines.length) {
      setLineIdx(lineIdx + 1)
    } else if (chapIdx + 1 < book.chapters.length) {
      setChapIdx(chapIdx + 1)
      setLineIdx(0)
    } else {
      setChapIdx(0)
      setLineIdx(0)
    }
  }

  const prevLine = () => {
    if (lineIdx > 0) {
      setLineIdx(lineIdx - 1)
    } else if (chapIdx > 0) {
      const prevChap = book.chapters[chapIdx - 1]
      setChapIdx(chapIdx - 1)
      setLineIdx(prevChap.lines.length - 1)
    }
  }

  const swatches = appTheme === 'light'
    ? ['#18181b', '#52525b', '#71717a', '#0f766e']
    : ['#f4f4f5', '#a1a1aa', '#71717a', '#5eead4']

  const appScopeClass = appTheme === 'light' ? 'cloak-app-light' : 'cloak-app-dark'

  return (
    <div className="flex flex-col gap-4">
      {/* Stage control bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-page-border bg-page-surface px-4 py-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const next = appTheme === 'light' ? 'dark' : 'light'
              setAppTheme(next)
              setFontColor(next === 'light' ? '#52525b' : '#d4d4d8')
            }}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-page-border-strong bg-page-elevated px-3 py-1.5 text-[12px] font-medium text-page-fg hover:bg-white/10"
          >
            {appTheme === 'light' ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
            <span>
              {W.themeLabel}: {appTheme === 'light' ? W.light : W.dark}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsFocus((v) => !v)}
            className={cn(
              'inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium',
              isFocus
                ? 'border-white/30 bg-white text-[#090a0c]'
                : 'border-page-border-strong bg-page-elevated text-page-fg hover:bg-white/10',
            )}
          >
            {isFocus ? <Eye className="size-3.5" /> : <EyeOff className="size-3.5" />}
            <span>{isFocus ? W.focusOn : W.focusOff}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setBossHidden((v) => !v)}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-page-border-strong bg-page-elevated px-3 py-1.5 font-mono text-[12px] font-medium text-stealth-mint hover:bg-white/10"
        >
          {bossHidden ? <RotateCcw className="size-3.5" /> : <EyeOff className="size-3.5" />}
          <span>{bossHidden ? W.bossRestore : W.bossKey}</span>
        </button>
      </div>

      {/* Real two-window Cloak workbench */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        {/* Left: Real Cloak SettingsWindow (apps/desktop/src/windows/settings/index.tsx) */}
        <div
          className={cn(
            appScopeClass,
            'flex h-[540px] flex-col overflow-hidden rounded-2xl border border-page-border-strong bg-background shadow-[0_24px_60px_rgba(0,0,0,0.45)]',
          )}
        >
          {/* Native macOS window chrome */}
          <div className="flex h-10 shrink-0 items-center justify-between border-b bg-muted/40 px-4">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-[12px] font-medium text-muted-foreground">Cloak</span>
            <div className="w-10" />
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as 'current' | 'library' | 'settings')}
            className="flex h-0 flex-1 flex-col gap-0"
          >
            <div className="px-5 pt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="current" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {W.tabs.current}
                </TabsTrigger>
                <TabsTrigger value="library" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  {W.tabs.library}
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {W.tabs.settings}
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {/* CurrentTab (apps/desktop/src/windows/settings/tabs/current/index.tsx) */}
              <TabsContent value="current" className="mt-0 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package size={16} />
                      <span>{book.title}</span>
                      <Badge>{W.currentCard.badge}</Badge>
                    </CardTitle>
                    <CardDescription>{W.currentCard.desc}</CardDescription>
                    <CardAction />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{W.currentCard.progress}</span>
                          <span className="font-medium tabular-nums">{progress.toFixed(2)}%</span>
                        </div>
                        <Progress value={progress} className="h-2 w-full" />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{chapter.title}</span>
                          <span>{W.currentCard.totalChapters(book.chapters.length)}</span>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="text-xs font-medium text-muted-foreground">{W.currentCard.jumpHint}</div>
                        <div className="space-y-1.5">
                          {book.chapters.map((c, idx) => (
                            <button
                              key={c.title}
                              type="button"
                              onClick={() => {
                                setChapIdx(idx)
                                setLineIdx(0)
                                setBossHidden(false)
                              }}
                              className={cn(
                                'flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors hover:bg-accent',
                                idx === chapIdx ? 'border-primary bg-accent/60 font-medium' : 'border-border',
                              )}
                            >
                              <div className="flex items-center gap-2.5">
                                <span
                                  className={cn(
                                    'size-2 rounded-full',
                                    idx <= chapIdx ? 'bg-emerald-500' : 'bg-muted-foreground/30',
                                  )}
                                />
                                <span>{c.title}</span>
                              </div>
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="gap-3">
                    <Button
                      className="flex-1"
                      onClick={() => {
                        setBossHidden(false)
                        setIsFocus(true)
                      }}
                    >
                      {W.currentCard.continueBtn}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              {/* LibraryTab (apps/desktop/src/windows/settings/tabs/library/index.tsx) */}
              <TabsContent value="library" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="m-0 text-base font-bold">{W.library.title}</h3>
                    <p className="m-0 text-xs text-muted-foreground">{W.library.count(books.length)}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => selectBook((bookIdx + 1) % books.length)}>
                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                    {W.library.importBtn}
                  </Button>
                </div>

                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{W.library.cols.novel}</TableHead>
                        <TableHead>{W.library.cols.author}</TableHead>
                        <TableHead>{W.library.cols.size}</TableHead>
                        <TableHead>{W.library.cols.format}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {books.map((item, idx) => {
                        const isActive = idx === bookIdx
                        return (
                          <TableRow
                            key={item.id}
                            onClick={() => selectBook(idx)}
                            className={cn('cursor-pointer', isActive && 'bg-muted/60')}
                          >
                            <TableCell>
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-9 w-7 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
                                  <FileText size={14} />
                                </div>
                                <div className="flex items-center gap-1.5 font-medium">
                                  {isActive && (
                                    <Badge variant="outline" className="px-1 py-0 text-[10px]">
                                      {W.library.reading}
                                    </Badge>
                                  )}
                                  <span>{item.title}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">{item.author}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <HardDrive size={12} />
                                {item.size}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <File size={12} />
                                {item.format}
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
                <p className="m-0 text-xs text-muted-foreground">{W.library.clickHint}</p>
              </TabsContent>

              {/* SettingsTab (WindowSettingsForm + ReadingSettingsForm) */}
              <TabsContent value="settings" className="mt-0 space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Eye size={18} />
                      {W.settings.windowTitle}
                    </CardTitle>
                    <CardDescription>{W.settings.windowDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium">{W.settings.transparent}</div>
                        <div className="text-xs text-muted-foreground">{W.settings.transparentDesc}</div>
                      </div>
                      <Switch checked={transparent} onCheckedChange={setTransparent} />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium">{W.settings.readingMode}</div>
                        <div className="text-xs text-muted-foreground">{W.settings.readingModeDesc}</div>
                      </div>
                      <Switch checked={readingMode} onCheckedChange={setReadingMode} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <BookOpen size={18} />
                      {W.settings.readingTitle}
                    </CardTitle>
                    <CardDescription>{W.settings.readingDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span>{W.settings.fontSize}</span>
                        <span className="font-mono tabular-nums">{fontSize}px</span>
                      </div>
                      <Slider
                        value={[fontSize]}
                        min={12}
                        max={22}
                        step={1}
                        onValueChange={([v]) => setFontSize(v)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span>{W.settings.lineHeight}</span>
                        <span className="font-mono tabular-nums">{lineHeight.toFixed(1)}</span>
                      </div>
                      <Slider
                        value={[lineHeight]}
                        min={1.3}
                        max={2.4}
                        step={0.1}
                        onValueChange={([v]) => setLineHeight(v)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span>{W.settings.letterSpacing}</span>
                        <span className="font-mono tabular-nums">{letterSpacing.toFixed(1)}px</span>
                      </div>
                      <Slider
                        value={[letterSpacing]}
                        min={0}
                        max={3}
                        step={0.2}
                        onValueChange={([v]) => setLetterSpacing(v)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs font-medium">{W.settings.fontColor}</div>
                      <div className="flex items-center gap-2 pt-0.5">
                        {swatches.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setFontColor(color)}
                            aria-label={color}
                            className={cn(
                              'size-6 cursor-pointer rounded-full border transition-transform hover:scale-110',
                              fontColor === color ? 'ring-2 ring-ring ring-offset-2 ring-offset-background' : '',
                            )}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Right: Real ReaderWindow floating over realistic code/doc workspace */}
        <div
          className={cn(
            appScopeClass,
            'relative flex h-[540px] flex-col overflow-hidden rounded-2xl border border-page-border-strong bg-background shadow-[0_24px_60px_rgba(0,0,0,0.45)]',
          )}
        >
          {/* Simulated IDE backdrop */}
          <div className="flex h-10 shrink-0 items-center justify-between border-b bg-muted/40 px-4">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-[12px] text-muted-foreground">reader-sync.ts</span>
            <span className="font-mono text-[11px] text-muted-foreground">TypeScript</span>
          </div>

          <div className="relative flex-1 overflow-hidden p-5 font-mono text-[12.5px] leading-[1.75] text-muted-foreground/60 select-none">
            <div className="grid grid-cols-[24px_1fr] gap-x-3">
              {CODE_LINES.map((code, i) => (
                <div key={i} className="contents">
                  <span className="text-right text-[11px] text-muted-foreground/40 tabular-nums">{i + 1}</span>
                  <span className="truncate whitespace-pre">{code || ' '}</span>
                </div>
              ))}
            </div>

            {/* Real ReaderWindow (apps/desktop/src/windows/reader/index.tsx) */}
            {!bossHidden ? (
              <div
                onClick={() => setIsFocus(true)}
                className={cn(
                  'absolute inset-x-4 bottom-16 rounded p-3 font-sans select-none border border-dashed',
                  isFocus
                    ? 'border-black/20 dark:border-white/25 bg-card shadow-md'
                    : transparent
                      ? 'border-transparent bg-transparent'
                      : 'border-transparent bg-card/95',
                )}
              >
                <div
                  style={{
                    fontSize: `${fontSize}px`,
                    lineHeight,
                    letterSpacing: `${letterSpacing}px`,
                    color: fontColor,
                  }}
                >
                  {chapter.lines[lineIdx]}
                </div>

                {isFocus && (
                  <div className="mt-2 text-center text-xs text-muted-foreground tabular-nums">
                    <p className="m-0">{chapter.title}</p>
                    <p className="m-0">
                      {globalLine}/{totalLines} ({progress.toFixed(2)}%)
                    </p>
                  </div>
                )}

                {!readingMode && (
                  <p className="mt-1.5 mb-0 text-center text-xs text-destructive">{W.settings.readingOffTip}</p>
                )}

                {/* Real ReaderWindow top-right floating pill */}
                <div
                  className={cn(
                    'absolute -top-3 right-2 flex gap-1 rounded-full border bg-background/90 p-1.5 shadow-sm backdrop-blur-md transition-opacity',
                    !isFocus && 'pointer-events-none opacity-0',
                  )}
                >
                  <button
                    type="button"
                    aria-label="Minimize"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsFocus(false)
                    }}
                    className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
                  >
                    <Minus size={9} />
                  </button>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={(e) => {
                      e.stopPropagation()
                      setBossHidden(true)
                    }}
                    className="flex h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    <X size={9} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="absolute right-4 bottom-16 left-4 flex items-center justify-between rounded-lg border border-dashed bg-muted/80 px-4 py-2.5 text-xs text-muted-foreground">
                <span>{W.bossHiddenTip}</span>
                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setBossHidden(false)}>
                  {W.bossRestore}
                </Button>
              </div>
            )}
          </div>

          {/* Bottom live page turn bar */}
          <div className="flex items-center justify-between border-t bg-muted/40 px-4 py-2.5">
            <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
              {chapter.title} · {globalLine}/{totalLines}
            </span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs" onClick={prevLine}>
                ← {W.prevPage}
              </Button>
              <Button size="sm" variant="default" className="h-7 px-2.5 text-xs" onClick={nextLine}>
                {W.nextPage} →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
