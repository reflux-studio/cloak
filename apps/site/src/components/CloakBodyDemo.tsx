import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
  Package,
  Plus,
  RotateCcw,
  Settings,
  X,
} from 'lucide-react'
import { site } from '../i18n/site'
import type { Locale } from '../lib/store'

interface ChapterItem {
  title: string
  text: string
}

interface BookItem {
  id: number
  title: string
  author: string
  size: string
  format: string
  chapters: ChapterItem[]
}

const OPEN_EVENT = 'cloak:demo-open'

export function DemoTriggerButton({ lang }: { lang: Locale }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_EVENT))}
      className="inline-flex cursor-pointer items-center gap-2 rounded-full border bg-background px-6 py-[13px] text-[15px] font-semibold whitespace-nowrap text-foreground shadow-xs transition-colors hover:bg-accent"
    >
      <Eye className="size-4 text-muted-foreground" />
      {site[lang].hero.tryDemo}
    </button>
  )
}

function paginateChapter(text: string, lineSize: number): string[] {
  const step = Math.max(20, lineSize)
  const clean = text.trim()
  if (!clean) return ['']
  const out: string[] = []
  for (let i = 0; i < clean.length; i += step) {
    out.push(clean.slice(i, i + step))
  }
  return out
}

function clampPos(x: number, y: number, w: number, h: number) {
  if (typeof window === 'undefined') return { x, y }
  return {
    x: Math.max(8, Math.min(x, Math.max(8, window.innerWidth - w - 8))),
    y: Math.max(8, Math.min(y, Math.max(8, window.innerHeight - h - 8))),
  }
}

function parseTxtToChapters(raw: string, fallbackTitle: string): ChapterItem[] {
  const normalized = raw.replace(/\r\n/g, '\n').trim()
  if (!normalized) return [{ title: fallbackTitle, text: '' }]
  const lines = normalized.split('\n')
  const chapterRe = /^(第[零一二三四五六七八九十百千万0-9]+[章节回卷集篇].*|Chapter\s+\d+.*)$/i
  const chapters: ChapterItem[] = []
  let currentTitle = fallbackTitle
  let buffer: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) continue
    if (chapterRe.test(trimmed) && trimmed.length <= 48) {
      if (buffer.length > 0) {
        chapters.push({ title: currentTitle, text: buffer.join(' ') })
        buffer = []
      }
      currentTitle = trimmed
    } else {
      buffer.push(trimmed)
    }
  }
  if (buffer.length > 0) {
    chapters.push({ title: currentTitle, text: buffer.join(' ') })
  }
  return chapters.length > 0 ? chapters.slice(0, 40) : [{ title: fallbackTitle, text: normalized.slice(0, 6000) }]
}

export default function CloakBodyDemo({ lang, base }: { lang: Locale; base: string }) {
  const D = site[lang].demo

  const [active, setActive] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(true)
  const [bossHidden, setBossHidden] = useState(false)
  const [isFocus, setIsFocus] = useState(true)
  const [tab, setTab] = useState<'current' | 'library' | 'settings'>('current')

  const [books, setBooks] = useState<BookItem[]>(() =>
    D.books.map((b) => ({ ...b, chapters: b.chapters.map((c) => ({ ...c })) })),
  )
  const [bookIdx, setBookIdx] = useState(0)
  const [chapIdx, setChapIdx] = useState(0)
  const [pageIdx, setPageIdx] = useState(0)

  // Real Cloak settings matching ReadingSettingsForm & WindowSettingsForm
  const [transparent, setTransparent] = useState(true)
  const [readingMode, setReadingMode] = useState(true)
  const [lineSize, setLineSize] = useState(64)
  const [fontSize, setFontSize] = useState(14)
  const [lineHeight, setLineHeight] = useState(1.7)
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [fontWeight, setFontWeight] = useState('400')
  const [fontColor, setFontColor] = useState('#52525b')

  // Window positions
  const [readerPos, setReaderPos] = useState({ x: 560, y: 120 })
  const [settingsPos, setSettingsPos] = useState({ x: 24, y: 88 })

  const readerRef = useRef<HTMLDivElement>(null)
  const settingsRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const openDemo = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const readerW = Math.min(440, vw - 24)
    const settingsW = Math.min(540, vw - 24)
    setReaderPos(clampPos(vw - readerW - 28, Math.max(76, vh - 260), readerW, 180))
    setSettingsPos(clampPos(24, Math.max(76, vh - 580), settingsW, 500))
    setActive(true)
    setBossHidden(false)
    setSettingsOpen(true)
    setIsFocus(true)
  }, [])

  useEffect(() => {
    const handler = () => openDemo()
    window.addEventListener(OPEN_EVENT, handler)
    return () => window.removeEventListener(OPEN_EVENT, handler)
  }, [openDemo])

  // Real focus / blur: clicking outside reader window blurs it so transparent mode kicks in
  useEffect(() => {
    if (!active) return
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node
      if (readerRef.current?.contains(target)) {
        setIsFocus(true)
      } else if (!settingsRef.current?.contains(target)) {
        setIsFocus(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [active])

  const book = books[bookIdx] ?? books[0]
  const paginatedChapters = useMemo(
    () => book.chapters.map((c) => ({ title: c.title, pages: paginateChapter(c.text, lineSize) })),
    [book, lineSize],
  )
  const currentChapter = paginatedChapters[chapIdx] ?? paginatedChapters[0]
  const safePageIdx = Math.min(pageIdx, Math.max(0, currentChapter.pages.length - 1))
  const totalPages = paginatedChapters.reduce((sum, c) => sum + c.pages.length, 0)
  const globalPage =
    paginatedChapters.slice(0, chapIdx).reduce((sum, c) => sum + c.pages.length, 0) + safePageIdx + 1
  const progress = totalPages > 0 ? Math.round((globalPage / totalPages) * 10000) / 100 : 0

  const nextPage = useCallback(() => {
    if (safePageIdx + 1 < currentChapter.pages.length) {
      setPageIdx(safePageIdx + 1)
    } else if (chapIdx + 1 < paginatedChapters.length) {
      setChapIdx(chapIdx + 1)
      setPageIdx(0)
    } else {
      setChapIdx(0)
      setPageIdx(0)
    }
  }, [safePageIdx, currentChapter.pages.length, chapIdx, paginatedChapters.length])

  const prevPage = useCallback(() => {
    if (safePageIdx > 0) {
      setPageIdx(safePageIdx - 1)
    } else if (chapIdx > 0) {
      const prevChap = paginatedChapters[chapIdx - 1]
      setChapIdx(chapIdx - 1)
      setPageIdx(Math.max(0, prevChap.pages.length - 1))
    }
  }, [safePageIdx, chapIdx, paginatedChapters])

  // Real keyboard shortcuts when demo is active & readingMode is ON
  useEffect(() => {
    if (!active || !readingMode) return
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      if (e.altKey && (e.key.toLowerCase() === 'h' || e.code === 'KeyH')) {
        e.preventDefault()
        setBossHidden((v) => !v)
        return
      }
      if (bossHidden) return
      if (e.key === 'ArrowRight' || e.key === ']') {
        e.preventDefault()
        nextPage()
      } else if (e.key === 'ArrowLeft' || e.key === '[') {
        e.preventDefault()
        prevPage()
      } else if (e.key === 'Escape' && isFocus) {
        setIsFocus(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active, readingMode, bossHidden, isFocus, nextPage, prevPage])

  const startDrag = (
    e: React.PointerEvent,
    pos: { x: number; y: number },
    setPos: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>,
    w: number,
    h: number,
  ) => {
    if ((e.target as HTMLElement).closest('button, input, [role="slider"], [role="switch"]')) return
    e.preventDefault()
    const startX = e.clientX - pos.x
    const startY = e.clientY - pos.y
    const onMove = (ev: PointerEvent) => {
      setPos(clampPos(ev.clientX - startX, ev.clientY - startY, w, h))
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  const handleImportTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const content = String(reader.result || '')
      const baseName = file.name.replace(/\.txt$/i, '')
      const chapters = parseTxtToChapters(content, baseName)
      const kb = Math.max(1, Math.round(file.size / 1024))
      const sizeStr = kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`
      const newBook: BookItem = {
        id: Date.now(),
        title: baseName,
        author: D.library.importedPrefix,
        size: sizeStr,
        format: 'TXT',
        chapters,
      }
      setBooks((prev) => [newBook, ...prev])
      setBookIdx(0)
      setChapIdx(0)
      setPageIdx(0)
      setBossHidden(false)
      setTab('current')
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <>
      {/* Persistent compact tray control in bottom-right corner */}
      <div className="fixed right-5 bottom-5 z-40">
        {!active ? (
          <Button
            onClick={openDemo}
            size="lg"
            className="rounded-full shadow-lg"
          >
            <img src={`${base}/logo.png`} alt="" width={18} height={18} className="rounded-xs" />
            <span>{D.fabOpen}</span>
          </Button>
        ) : (
          <div className="flex flex-wrap items-center gap-1.5 rounded-full border bg-background/95 p-1.5 shadow-lg backdrop-blur-md">
            <span
              className={cn('ml-2 size-2 rounded-full', readingMode ? 'bg-emerald-500' : 'bg-muted-foreground/40')}
              title={readingMode ? 'Reading Mode ON' : D.readingOff}
            />
            <Button
              size="sm"
              variant="ghost"
              className="h-7 rounded-full px-2.5 text-xs"
              onClick={() => setBossHidden((v) => !v)}
            >
              {bossHidden ? <RotateCcw className="mr-1 size-3.5" /> : <EyeOff className="mr-1 size-3.5" />}
              {bossHidden ? D.trayReaderShow : D.trayReaderHide}
            </Button>
            <Button
              size="sm"
              variant={settingsOpen ? 'secondary' : 'ghost'}
              className="h-7 rounded-full px-2.5 text-xs"
              onClick={() => setSettingsOpen((v) => !v)}
            >
              <Settings className="mr-1 size-3.5" />
              {D.traySettings}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 rounded-full px-2.5 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setActive(false)}
            >
              <X className="mr-1 size-3.5" />
              {D.trayExit}
            </Button>
          </div>
        )}
      </div>

      {/* Real draggable Cloak SettingsWindow over browser body */}
      {active && settingsOpen && (
        <div
          ref={settingsRef}
          style={{ left: `${settingsPos.x}px`, top: `${settingsPos.y}px` }}
          className="fixed z-50 flex h-[min(520px,calc(100vh-96px))] w-[min(540px,calc(100vw-24px))] flex-col overflow-hidden rounded-xl border bg-background text-foreground shadow-2xl"
        >
          {/* Draggable macOS-style title bar */}
          <div
            onPointerDown={(e) => startDrag(e, settingsPos, setSettingsPos, 540, 520)}
            className="flex h-10 shrink-0 cursor-grab items-center justify-between border-b bg-muted/40 px-4 select-none active:cursor-grabbing"
          >
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Close settings"
                onClick={() => setSettingsOpen(false)}
                className="flex size-3 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
              />
              <span className="size-3 rounded-full bg-yellow-400" />
              <span className="size-3 rounded-full bg-emerald-500" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Cloak</span>
            <span className="text-[11px] text-muted-foreground">{D.readerDragHint.split('·')[0]}</span>
          </div>

          {/* Exact layout from apps/desktop/src/windows/settings/index.tsx */}
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as 'current' | 'library' | 'settings')}
            className="flex h-0 flex-1 flex-col gap-0"
          >
            <div className="px-5 pt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="current" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {D.tabs.current}
                </TabsTrigger>
                <TabsTrigger value="library" className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  {D.tabs.library}
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  {D.tabs.settings}
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <TabsContent value="current" className="mt-0 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package size={16} />
                      <span>{book.title}</span>
                      <Badge>{D.currentCard.badge}</Badge>
                    </CardTitle>
                    <CardDescription>{D.currentCard.desc}</CardDescription>
                    <CardAction />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{D.currentCard.progress}</span>
                        <span className="font-medium tabular-nums">{progress.toFixed(2)}%</span>
                      </div>
                      <Progress value={progress} className="h-2 w-full" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{currentChapter.title}</span>
                        <span>{D.currentCard.totalChapters(paginatedChapters.length)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="text-xs font-medium text-muted-foreground">{D.currentCard.chaptersTitle}</div>
                      <div className="max-h-32 space-y-1.5 overflow-y-auto pr-1">
                        {paginatedChapters.map((c, idx) => (
                          <button
                            key={`${c.title}-${idx}`}
                            type="button"
                            onClick={() => {
                              setChapIdx(idx)
                              setPageIdx(0)
                              setBossHidden(false)
                            }}
                            className={cn(
                              'flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors hover:bg-accent',
                              idx === chapIdx && 'border-primary',
                            )}
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <span
                                className={cn(
                                  'size-2 shrink-0 rounded-full',
                                  idx <= chapIdx ? 'bg-green-500' : 'bg-muted-foreground/30',
                                )}
                              />
                              <span className="truncate">{c.title}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="gap-2">
                    <Button variant="outline" size="sm" onClick={prevPage}>
                      ← {D.prevPage}
                    </Button>
                    <Button variant="outline" size="sm" onClick={nextPage}>
                      {D.nextPage} →
                    </Button>
                    <Button
                      className="flex-1"
                      size="sm"
                      onClick={() => {
                        setBossHidden(false)
                        setIsFocus(true)
                      }}
                    >
                      {D.currentCard.focusBtn}
                    </Button>
                  </CardFooter>
                </Card>

                <div className="rounded-lg border bg-muted/30 px-4 py-3 text-xs">
                  <div className="mb-2 font-medium text-foreground">{D.currentCard.shortcutsTitle}</div>
                  <div className="grid grid-cols-3 gap-2 text-muted-foreground">
                    {D.currentCard.shortcuts.map(([k, desc]) => (
                      <div key={desc} className="flex flex-col gap-1">
                        <kbd className="w-fit rounded border bg-background px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                          {k}
                        </kbd>
                        <span>{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="library" className="mt-0 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="m-0 text-base font-bold">{D.library.title}</h3>
                    <p className="m-0 text-xs text-muted-foreground">{D.library.count(books.length)}</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".txt"
                    onChange={handleImportTxt}
                    className="hidden"
                  />
                  <Button size="sm" onClick={() => fileInputRef.current?.click()}>
                    <Plus className="mr-1.5 h-3.5 w-3.5" />
                    {D.library.importBtn}
                  </Button>
                </div>

                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{D.library.cols.novel}</TableHead>
                        <TableHead>{D.library.cols.author}</TableHead>
                        <TableHead>{D.library.cols.size}</TableHead>
                        <TableHead>{D.library.cols.format}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {books.map((item, idx) => {
                        const isCurrent = idx === bookIdx
                        return (
                          <TableRow
                            key={item.id}
                            onClick={() => {
                              setBookIdx(idx)
                              setChapIdx(0)
                              setPageIdx(0)
                              setBossHidden(false)
                            }}
                            className={cn('cursor-pointer', isCurrent && 'bg-muted/50')}
                          >
                            <TableCell>
                              <div className="flex items-center gap-2.5">
                                <div className="flex h-10 w-7 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
                                  <FileText size={14} />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5 font-medium">
                                    {isCurrent && (
                                      <Badge variant="outline" className="px-1 py-0 text-[10px]">
                                        {D.library.reading}
                                      </Badge>
                                    )}
                                    <span className="truncate">{item.title}</span>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {item.author || D.library.unknownAuthor}
                            </TableCell>
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
              </TabsContent>

              <TabsContent value="settings" className="mt-0 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Eye size={18} />
                      {D.settings.windowTitle}
                    </CardTitle>
                    <CardDescription>{D.settings.windowDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium">{D.settings.transparent}</div>
                        <div className="text-xs text-muted-foreground">{D.settings.transparentDesc}</div>
                      </div>
                      <Switch checked={transparent} onCheckedChange={setTransparent} />
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-medium">{D.settings.readingMode}</div>
                        <div className="text-xs text-muted-foreground">{D.settings.readingModeDesc}</div>
                      </div>
                      <Switch checked={readingMode} onCheckedChange={setReadingMode} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <BookOpen size={18} />
                      {D.settings.readingTitle}
                    </CardTitle>
                    <CardDescription>{D.settings.readingDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span>{D.settings.lineSize}</span>
                        <span className="font-mono tabular-nums">{lineSize}</span>
                      </div>
                      <Slider value={[lineSize]} min={30} max={120} step={2} onValueChange={([v]) => setLineSize(v)} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span>{D.settings.fontSize}</span>
                        <span className="font-mono tabular-nums">{fontSize}px</span>
                      </div>
                      <Slider value={[fontSize]} min={12} max={26} step={1} onValueChange={([v]) => setFontSize(v)} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span>{D.settings.lineHeight}</span>
                        <span className="font-mono tabular-nums">{lineHeight.toFixed(1)}</span>
                      </div>
                      <Slider value={[lineHeight]} min={1.2} max={2.4} step={0.1} onValueChange={([v]) => setLineHeight(v)} />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span>{D.settings.letterSpacing}</span>
                        <span className="font-mono tabular-nums">{letterSpacing.toFixed(1)}px</span>
                      </div>
                      <Slider value={[letterSpacing]} min={0} max={4} step={0.2} onValueChange={([v]) => setLetterSpacing(v)} />
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-medium">{D.settings.fontWeight}</div>
                      <div className="flex flex-wrap gap-1">
                        {D.settings.weights.map(([w, label]) => (
                          <Button
                            key={w}
                            type="button"
                            size="sm"
                            variant={fontWeight === w ? 'default' : 'outline'}
                            className="h-7 px-2 text-[11px]"
                            onClick={() => setFontWeight(w)}
                          >
                            {label.split(' ')[0]}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-2 space-y-2">
                      <div className="text-xs font-medium">{D.settings.fontColor}</div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="color"
                          value={fontColor}
                          onChange={(e) => setFontColor(e.target.value)}
                          className="h-9 w-14 shrink-0 p-1"
                        />
                        <Input
                          value={fontColor}
                          onChange={(e) => setFontColor(e.target.value)}
                          className="h-9 flex-1 font-mono text-xs"
                        />
                        {['#18181b', '#52525b', '#a1a1aa', '#0f766e'].map((c) => (
                          <button
                            key={c}
                            type="button"
                            aria-label={c}
                            onClick={() => setFontColor(c)}
                            className={cn(
                              'size-6 shrink-0 cursor-pointer rounded-full border',
                              fontColor === c && 'ring-2 ring-ring ring-offset-2',
                            )}
                            style={{ backgroundColor: c }}
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
      )}

      {/* Real draggable Cloak ReaderWindow floating anywhere over browser body */}
      {active && !bossHidden && (
        <div
          ref={readerRef}
          onPointerDown={(e) => {
            setIsFocus(true)
            startDrag(e, readerPos, setReaderPos, 440, 140)
          }}
          style={{
            left: `${readerPos.x}px`,
            top: `${readerPos.y}px`,
            fontSize: `${fontSize}px`,
            lineHeight,
            fontWeight,
            color: fontColor,
            letterSpacing: `${letterSpacing}px`,
          }}
          className={cn(
            'fixed z-50 w-[min(440px,calc(100vw-24px))] cursor-grab rounded border border-dashed p-3 select-none active:cursor-grabbing',
            isFocus
              ? 'border-black/20 dark:border-white/25 bg-background shadow-md'
              : transparent
                ? 'border-transparent bg-transparent'
                : 'border-transparent bg-background/95 shadow-xs',
          )}
        >
          <div>{currentChapter.pages[safePageIdx] || D.readerEmpty}</div>

          {isFocus && (
            <div className="mt-2 text-center text-xs text-muted-foreground tabular-nums">
              <p className="m-0">{currentChapter.title}</p>
              <p className="m-0">
                {globalPage}/{totalPages} ({progress.toFixed(2)}%)
              </p>
              <p className="mt-0.5 mb-0 text-[11px] opacity-75">{D.readerDragHint}</p>
            </div>
          )}

          {!readingMode && <p className="mt-1 mb-0 text-center text-xs text-destructive">{D.readingOff}</p>}

          {/* Exact top-right floating pill from apps/desktop/src/windows/reader/index.tsx */}
          <div
            className={cn(
              'absolute -top-3 right-2 flex gap-1 rounded-full border bg-background/90 p-1.5 shadow-md backdrop-blur-md transition-opacity',
              !isFocus && 'pointer-events-none opacity-0',
            )}
          >
            <button
              type="button"
              aria-label="Blur reader window"
              onClick={(e) => {
                e.stopPropagation()
                setIsFocus(false)
              }}
              className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600"
            >
              <Minus size={10} />
            </button>
            <button
              type="button"
              aria-label="Hide reader window"
              onClick={(e) => {
                e.stopPropagation()
                setBossHidden(true)
              }}
              className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              <X size={10} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
