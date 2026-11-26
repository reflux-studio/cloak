import type { AssetKey, Locale, Os } from '../lib/store'

export const HERO_IMAGE_PATHS: string[] = Array(3)
  .fill([
    'images/hero/novels2.png',
    'images/hero/current.png',
    'images/hero/update.png',
    'images/hero/novels.png',
    'images/hero/preference.png',
    'images/hero/update.png',
    'images/hero/shortcut.png',
    'images/hero/window.png',
    'images/hero/chapter.png',
    'images/hero/preview.png',
  ])
  .flat()

export interface FeatureItem {
  key: string
  title: string
  description: string
  src: string
}

export interface FaqItem {
  q: string
  a: string[]
  steps?: string[]
  images?: { src: string; alt: string }[]
}

export interface PlatformInfo {
  key: Os
  name: string
  arch: string
  cta: string
  secondaryKey: AssetKey
  secondaryLabel: string
  note: string
}

const zh = {
  meta: {
    htmlLang: 'zh-CN',
    title: 'Cloak: 轻量透明的摸鱼阅读器',
    description:
      'Cloak 是一款基于 Tauri 2 构建的开源免费桌面端透明阅读器。支持 TXT、EPUB 本地导入、章节解析、自定义排版与老板键一键隐藏，纯本地离线运行。支持 macOS、Windows、Linux。',
    ogTitle: 'Cloak: 轻量透明的摸鱼阅读器',
    ogDescription: '开源免费的透明桌面阅读器，支持 macOS、Windows、Linux，纯本地离线运行。',
  },
  enHint: { text: 'Cloak 也有英文页面。', link: 'English →', close: '关闭' },
  nav: { features: '核心功能', download: '下载', faq: 'FAQ', theme: '切换明暗主题', tryLive: '在线体验' },
  hero: {
    badge: '开源免费 · macOS / Windows / Linux · Tauri 2',
    title: ['一个透明、隐蔽的', '桌面摸鱼阅读器。'],
    lead: '如果说摸鱼是一门技术，那么 Cloak 就是摸鱼界的“瑞士军刀”。基于 Tauri 2 + Rust，纯本地离线运行。',
    chips: ['Boss Key 秒隐', 'TXT / EPUB 本地导入', '纯离线零联网'],
    tryDemo: '在线试玩 · 免安装',
    source: '在 GitHub 看源码',
    other: '其他平台',
  },
  demo: {
    fabOpen: '在线体验 Cloak',
    fabSub: '可拖拽 · 拖边缘缩放 · 失焦透明隐身',
    fabDismiss: '收起悬浮入口',
    trayReaderHide: '隐藏 (Alt+H)',
    trayReaderShow: '恢复阅读窗',
    trayBossBadge: '老板键已隐藏 · Alt+H 恢复',
    trayFocus: '聚焦',
    trayBlur: '失焦隐身',
    traySettings: '设置',
    trayExit: '退出',
    readerTitle: 'Cloak 阅读窗',
    readerDragHint: '拖拽移动 · 拖边缘缩放 · 点空白处隐身',
    readerEmpty: '请从设置窗口的小说列表打开一本小说',
    bossHidden: '已通过老板键隐藏',
    bossRestore: '恢复显示',
    prevPage: '上一页',
    nextPage: '下一页',
    readingOff: '阅读模式未开启',
    tabs: {
      current: '当前阅读',
      library: '小说列表',
      settings: '阅读设置',
    },
    currentCard: {
      badge: '当前阅读',
      desc: '继续你的阅读之旅',
      progress: '阅读进度',
      totalChapters: (n: number) => `共 ${n} 章`,
      chaptersTitle: '章节目录',
      focusBtn: '聚焦阅读窗',
      shortcutsTitle: '体验快捷键',
      shortcuts: [
        ['← / →', '上一页 / 下一页'],
        ['[ / ]', '上一页 / 下一页'],
        ['Alt + H', '老板键隐藏 / 恢复'],
      ] as [string, string][],
    },
    library: {
      title: '小说列表',
      count: (n: number) => `共 ${n} 本小说`,
      importBtn: '导入本地 TXT',
      cols: { novel: '小说', author: '作者', progress: '进度', size: '大小', format: '格式' },
      reading: '在读',
      done: '已读完',
      importedPrefix: '本地导入',
      unknownAuthor: '未知',
    },
    settings: {
      windowTitle: '窗口设置',
      windowDesc: '自定义阅读窗口行为',
      transparent: '透明窗口',
      transparentDesc: '关闭窗口聚焦时，背景和虚线边框彻底隐去',
      readingMode: '阅读模式',
      readingModeDesc: '关闭后键盘快捷键自动让路，不影响正常网页浏览',
      readingTitle: '阅读设置',
      readingDesc: '实时调整字体参数并同步到悬浮阅读窗',
      lineSize: '每页字数',
      fontSize: '字体大小',
      lineHeight: '行高',
      letterSpacing: '字间距',
      fontWeight: '字体粗细',
      fontColor: '字体颜色',
      weights: [
        ['300', '细 (300)'],
        ['400', '正常 (400)'],
        ['500', '中等 (500)'],
        ['600', '半粗 (600)'],
        ['700', '粗 (700)'],
      ] as [string, string][],
    },
    books: [
      {
        id: 1,
        title: '诡秘之主',
        author: '爱潜水的乌贼',
        size: '14.2 MB',
        format: 'EPUB',
        chapters: [
          {
            title: '第一章 绯红',
            text: '痛！好痛！头好痛！光怪陆离的梦境碎裂成片，周明瑞只觉脑袋仿佛被一根烧红的铁钎狠狠搅动了一下。他艰难地睁开双眼，视线由模糊逐渐变得清晰，映入眼帘的是暗红色的光芒与带着灰尘的木制书桌。空气里浮动着淡淡的煤油味，窗外挂着一轮大得不太正常的绯红之月，安静地照在老旧的墙纸上。',
          },
          {
            title: '第二章 情况',
            text: '他在心里默数了三秒，确定这不是熬夜改线上 Bug 产生的幻觉，而是某种更彻底的变故。书桌角落摊着一本翻开的笔记，墨迹已经发暗，上面用陌生的花体字记录着前一天晚上的开支。窗外传来蒸汽机车低沉的汽笛声，一切细节都真实得让人一时间无法反驳。',
          },
        ],
      },
      {
        id: 2,
        title: '三体',
        author: '刘慈欣',
        size: '2.8 MB',
        format: 'TXT',
        chapters: [
          {
            title: '第 1 节 科学边界',
            text: '汪淼觉得，眼前的一切都像是一张尚未完全显影的照片，轮廓清晰，细节却透着说不出的诡异。在倒计时出现之前，他从来没有怀疑过宏观世界与微观物理之间那道看似坚固的边界。夜风吹过寂静的街道，他抬头望向墨黑色的夜空，整个宇宙正以一种无法理解的方式闪烁着。',
          },
          {
            title: '第 2 节 台球',
            text: '如果高能加速器里的每一次碰撞都给出截然相反的结果，那物理学就不再是一座大厦，而只是一场魔术。丁仪把白色的母球轻轻推向球桌中央的黑球，清脆的撞击声在空荡的房间里回响。五次撞击，五种完全一致或者完全荒谬的结果，足以动摇一个人半辈子的信念。',
          },
        ],
      },
      {
        id: 3,
        title: 'Unix 编程艺术',
        author: 'Eric S. Raymond',
        size: '4.6 MB',
        format: 'EPUB',
        chapters: [
          {
            title: '第 1 章 哲学: 保持简单',
            text: '简洁的系统并不等于功能贫瘠的系统，恰恰相反，最锋利的工具往往只把一件事做到极致。当软件学会克制自己的存在感，使用者反而能够更专注地沉浸在手头真正重要的任务里。把复杂留给底层状态机，把安静、直观和可组合的界面留到台前。',
          },
          {
            title: '第 2 章 最小惊奇原则',
            text: '好的交互不该强迫用户记住冗余规则，每一个动作的结果都应当符合直觉。当你按下老板键时，窗口不该带着拖泥带水的淡出动画，它应该在同一毫秒内消失。',
          },
        ],
      },
    ],
  },
  features: {
    eyebrow: '核心功能',
    title: '摸鱼？我来助你。',
    lead: '没有复杂花哨的冗余设计，每一项能力都围绕桌面静默阅读的真实场景打磨。点击截图可放大查看细节。',
    items: [
      {
        key: 'transparent-window',
        title: '透明悬浮窗口',
        description: '随意放置在任何你想伪装成文本的角落，代码编辑器、浏览器、表格或聊天窗口都能自然融入，支持置顶与透明度调节。',
        src: 'images/features/showcase.gif',
      },
      {
        key: 'local-import',
        title: '本地 TXT / EPUB 导入',
        description: '直接导入本地 TXT 与 EPUB 电子书，自动兼容多种文本编码，无需额外转换格式。',
        src: 'images/hero/novels.png',
      },
      {
        key: 'chapter-parsing',
        title: '章节解析与进度记忆',
        description: '自动识别小说目录结构，支持关键词搜章与跳章，每次翻页都会实时保存阅读进度。',
        src: 'images/hero/chapter.png',
      },
      {
        key: 'typography',
        title: '排版样式自由定制',
        description: '字体、字号、字重、行距、字距、每页字数与文字颜色均可按场景精细微调。',
        src: 'images/hero/reading.png',
      },
      {
        key: 'hotkeys',
        title: '自定义全局快捷键',
        description: '跳章、翻页、老板键一键隐藏全都可以自定义，无需鼠标，键盘敲得嘎嘎响。',
        src: 'images/hero/shortcut.png',
      },
      {
        key: 'reading-mode',
        title: '阅读模式与偏好设置',
        description: '退出阅读模式后自动释放快捷键，不与日常工作软件冲突；新版本后台检查自动更新。',
        src: 'images/hero/preference.png',
      },
    ] as FeatureItem[],
  },
  extras: {
    title: '还有这些细节',
    items: [
      ['纯本地离线', '无需注册账号，不依赖任何后端服务器，书籍与阅读记录全部保存在本地。'],
      ['多编码兼容', '导入 TXT 时自动检测并适配常见中文编码，减少乱码烦恼。'],
      ['轻量化低占用', '基于 Tauri 2 + Rust 原生构建，内存和体积远小于传统 Electron 应用。'],
      ['Dock / 托盘隐身', '支持隐藏 Dock 栏图标与托盘控制，从桌面到任务栏不留痕迹。'],
      ['窗口状态记忆', '自动记住上次窗口位置与大小，下次打开直接回到原来的角落。'],
      ['GitHub 自动更新', '直接拉取 GitHub Releases 新版本，一键完成更新安装。'],
    ] as [string, string][],
  },
  download: {
    title: '下载 Cloak',
    all: '全部版本 ›',
    ver: (v?: string) => (v ? `最新版本 ${v}` : '最新版本'),
    platforms: [
      {
        key: 'mac',
        name: 'macOS',
        arch: 'Apple Silicon (aarch64) · .dmg',
        cta: '下载 .dmg',
        secondaryKey: 'macIntel',
        secondaryLabel: 'Intel Mac (.dmg)',
        note: '安装包未经过 Apple 公证，首次打开如提示“无法验证开发者”，到 系统设置 → 隐私与安全性 底部点击“仍要打开”即可。',
      },
      {
        key: 'win',
        name: 'Windows',
        arch: 'x64 · -setup.exe',
        cta: '下载安装程序',
        secondaryKey: 'winMsi',
        secondaryLabel: '.msi 安装包',
        note: '如弹出 Microsoft Defender SmartScreen 提示，点击“更多信息 → 仍要运行”即可。',
      },
      {
        key: 'linux',
        name: 'Linux',
        arch: 'x64 (amd64) · .AppImage',
        cta: '下载 .AppImage',
        secondaryKey: 'linuxDeb',
        secondaryLabel: '.deb 安装包',
        note: '下载 .AppImage 后为其添加可执行权限（chmod +x）即可运行；Debian / Ubuntu 用户也可直接安装 .deb。',
      },
    ] as PlatformInfo[],
    cta: { mac: '下载 macOS 版', win: '下载 Windows 版', linux: '下载 Linux 版' } as Record<Os, string>,
    first: '首次打开',
    foot: 'Cloak 完全免费且开源，安装包由 GitHub Actions 自动构建。更新与版本发布均托管于 GitHub Releases。',
  },
  faq: {
    title: '常见问题',
    items: [
      {
        q: 'Cloak 收费吗？需要登录账号吗？',
        a: ['完全免费，而且已经在 GitHub 开源。不需要注册账号、没有订阅付费，下载后即可直接在本地使用。'],
      },
      {
        q: 'macOS 安装和打开应用时提示“无法验证开发者”怎么办？',
        a: [
          '由于个人开源项目暂未购买每年 99 美元的 Apple 开发者公证证书，macOS 默认会拦截未签名应用。只需手动信任一次即可正常使用：',
        ],
        steps: [
          '1. 先在提示弹窗中点击「完成」或「取消」。',
          '2. 打开「系统设置」→「隐私与安全性」→ 向下滚动到「安全性」。',
          '3. 点击「仍要打开」后输入设备密码确认，即可正常使用。',
        ],
        images: [
          {
            src: 'images/faq/macos-cannot-verify/dialog.png',
            alt: 'macOS 无法验证开发者弹窗',
          },
          {
            src: 'images/faq/macos-cannot-verify/solution.png',
            alt: 'macOS 仍要打开设置截图',
          },
        ],
      },
      {
        q: 'Windows 安装和打开应用时提示“已阻止此不安全内容”怎么办？',
        a: [
          '部分 Windows 电脑默认开启了 Microsoft Defender SmartScreen 保护，安装未签名应用时会弹出拦截提示，按以下步骤放行即可：',
        ],
        steps: [
          '1. 临时放行：在弹窗中点击「更多信息」，随后点击「仍要运行」即可。',
          '2. 永久放行：打开「设置」→「隐私和安全性」→「应用和浏览器控制」→「基于声誉的保护设置」，关闭对应检查项（Edge 浏览器需在浏览器设置中单独关闭）。',
        ],
        images: [
          {
            src: 'images/faq/microsoft-defender-smartscreen/dialog.png',
            alt: 'Windows SmartScreen 弹窗',
          },
          {
            src: 'images/faq/microsoft-defender-smartscreen/solution-1.png',
            alt: 'Windows 基于声誉的保护设置',
          },
          {
            src: 'images/faq/microsoft-defender-smartscreen/solution-2.png',
            alt: '关闭 SmartScreen 检查项',
          },
          {
            src: 'images/faq/microsoft-defender-smartscreen/solution-3.png',
            alt: 'Edge 浏览器单独关闭 SmartScreen',
          },
        ],
      },
      {
        q: '支持哪些电子书格式？会有书城吗？',
        a: [
          '目前支持导入本地 TXT 与 EPUB 格式，并在导入 TXT 时支持常见文本编码自动识别。出于版权原因，Cloak 不会内置在线书城，只作为纯粹的本地阅读工具。',
        ],
      },
      {
        q: '遇到 Bug 或想要新功能去哪里反馈？',
        a: ['欢迎直接在 GitHub 仓库提交 Issue，描述你的系统版本、复现步骤或功能建议，也可以直接提 PR 一起完善。'],
      },
    ] as FaqItem[],
  },
  donate: {
    eyebrow: '请作者喝杯咖啡',
    title: '喜欢这个小工具？',
    lead: 'Cloak 完全免费开源。如果它让你的工作间隙更愉快了一点，欢迎随缘打赏支持持续维护。',
    alipay: '支付宝',
    wechat: '微信支付',
  },
  end: { title: '悄悄打开，安心摸鱼。', star: '给个 Star' },
  footer: 'reflux studio 出品 · 开源免费 · 基于 Tauri 2',
}

const en: typeof zh = {
  meta: {
    htmlLang: 'en',
    title: 'Cloak: Lightweight transparent mini reader',
    description:
      'Cloak is a free, open-source desktop transparent reader built with Tauri 2. Import local TXT or EPUB files, customize typography and opacity, and hide instantly with a boss key. Available for macOS, Windows, and Linux.',
    ogTitle: 'Cloak: Lightweight transparent mini reader',
    ogDescription: 'Free, open-source transparent desktop reader for macOS, Windows, and Linux. 100% local.',
  },
  enHint: { text: 'Cloak is also available in English.', link: 'English →', close: 'Dismiss' },
  nav: { features: 'Features', download: 'Download', faq: 'FAQ', theme: 'Toggle theme', tryLive: 'Try live' },
  hero: {
    badge: 'Open source · macOS / Windows / Linux · Tauri 2',
    title: ['A transparent, stealth', 'mini desktop reader.'],
    lead: 'Think of Cloak as the Swiss Army knife of quiet desktop reading. Built with Tauri 2 and Rust, 100% local and offline.',
    chips: ['Instant Boss Key', 'Local TXT / EPUB', '100% Offline'],
    tryDemo: 'Try live · No install',
    source: 'View source on GitHub',
    other: 'Other platforms',
  },
  demo: {
    fabOpen: 'Try Cloak live',
    fabSub: 'Drag, resize edges & click outside to blend',
    fabDismiss: 'Dismiss launcher',
    trayReaderHide: 'Hide (Alt+H)',
    trayReaderShow: 'Show reader',
    trayBossBadge: 'Hidden · Alt+H to restore',
    trayFocus: 'Focus',
    trayBlur: 'Blend',
    traySettings: 'Settings',
    trayExit: 'Exit',
    readerTitle: 'Cloak Reader',
    readerDragHint: 'Drag to move · drag edges to resize · click outside to blend',
    readerEmpty: 'Open a book from the Library tab in Settings',
    bossHidden: 'Hidden via Boss Key',
    bossRestore: 'Restore',
    prevPage: 'Prev',
    nextPage: 'Next',
    readingOff: 'Reading mode is off',
    tabs: {
      current: 'Current',
      library: 'Library',
      settings: 'Settings',
    },
    currentCard: {
      badge: 'Reading',
      desc: 'Continue where you left off',
      progress: 'Progress',
      totalChapters: (n) => `${n} chapters`,
      chaptersTitle: 'Chapters',
      focusBtn: 'Focus reader window',
      shortcutsTitle: 'Demo shortcuts',
      shortcuts: [
        ['← / →', 'Previous / Next page'],
        ['[ / ]', 'Previous / Next page'],
        ['Alt + H', 'Boss key hide / restore'],
      ],
    },
    library: {
      title: 'Library',
      count: (n) => `${n} books`,
      importBtn: 'Import local TXT',
      cols: { novel: 'Title', author: 'Author', progress: 'Progress', size: 'Size', format: 'Format' },
      reading: 'Active',
      done: 'Done',
      importedPrefix: 'Imported',
      unknownAuthor: 'Unknown',
    },
    settings: {
      windowTitle: 'Window settings',
      windowDesc: 'Customize reader window behavior',
      transparent: 'Transparent window',
      transparentDesc: 'Background and dashed border vanish when blurred',
      readingMode: 'Reading mode',
      readingModeDesc: 'Turn off to release keyboard shortcuts back to the page',
      readingTitle: 'Typography',
      readingDesc: 'Adjust typography in real time on the floating reader',
      lineSize: 'Chars per page',
      fontSize: 'Font size',
      lineHeight: 'Line height',
      letterSpacing: 'Letter spacing',
      fontWeight: 'Font weight',
      fontColor: 'Text color',
      weights: [
        ['300', 'Light (300)'],
        ['400', 'Regular (400)'],
        ['500', 'Medium (500)'],
        ['600', 'Semibold (600)'],
        ['700', 'Bold (700)'],
      ],
    },
    books: [
      {
        id: 1,
        title: 'Lord of the Mysteries',
        author: 'Cuttlefish',
        size: '14.2 MB',
        format: 'EPUB',
        chapters: [
          {
            title: 'Chapter 1: Crimson',
            text: 'Pain! A splitting headache shattered the kaleidoscopic dream as Zhou Mingrui felt a red-hot iron rod stir inside his skull. He forced his eyes open. A faint crimson glow washed over a dusty wooden desk and stacks of unfamiliar notebooks. Outside the window, a giant crimson moon hung quietly above narrow brick chimneys wrapped in steam.',
          },
          {
            title: 'Chapter 2: Situation',
            text: 'He counted three seconds in silence, confirming this was not a late-night production debugging hallucination. Open on the desk corner lay a ledger written in crisp Hermes script detailing the previous evening’s expenses. A distant steam whistle drifted across the street, anchoring every impossible detail in place.',
          },
        ],
      },
      {
        id: 2,
        title: 'The Three-Body Problem',
        author: 'Liu Cixin',
        size: '2.8 MB',
        format: 'TXT',
        chapters: [
          {
            title: 'Section 1: Frontiers of Science',
            text: 'Wang Miao felt as if the scene before him were an underdeveloped photograph, sharp in outline yet unsettling in every corner. Before the countdown appeared, he had never doubted the boundary between macroscopic order and subatomic truth. Overhead, the night sky flickered in silence at a scale no instrument on Earth was built to explain.',
          },
          {
            title: 'Section 2: Billiards',
            text: 'If every high-energy collision gave contradictory answers, physics ceased to be a cathedral and became sleight of hand. Ding Yi rolled the white cue ball across the green felt toward the black sphere at center table. Five strikes, five impossible outcomes, enough to overturn half a lifetime of certainty.',
          },
        ],
      },
      {
        id: 3,
        title: 'The Art of Unix Programming',
        author: 'Eric S. Raymond',
        size: '4.6 MB',
        format: 'EPUB',
        chapters: [
          {
            title: 'Chapter 1: Keep It Simple',
            text: 'Simplicity is not the absence of capability. The sharpest tools do one job cleanly without fighting the user. When software knows how to stay out of the way, attention stays on the work that actually matters. Keep state machines deterministic under the hood and interfaces quiet on the surface.',
          },
          {
            title: 'Chapter 2: Least Surprise',
            text: 'Good interactions never make you memorize ceremonies. Every action behaves the way your fingers expect. When you press the boss key, the window should not fade slowly. It should vanish on the same millisecond.',
          },
        ],
      },
    ],
  },
  features: {
    eyebrow: 'Features',
    title: 'Built to do one thing cleanly.',
    lead: 'No bloat, no subscriptions, no cloud lock-in. Click any screenshot to inspect details.',
    items: [
      {
        key: 'transparent-window',
        title: 'Transparent floating window',
        description: 'Fine-tune window transparency and always-on-top behavior to blend naturally into editors, browsers, or spreadsheets.',
        src: 'images/features/showcase.gif',
      },
      {
        key: 'local-import',
        title: 'Local TXT / EPUB import',
        description: 'Import local TXT and EPUB files directly with multi-encoding detection and zero manual conversion.',
        src: 'images/hero/novels.png',
      },
      {
        key: 'chapter-parsing',
        title: 'Chapter parsing & progress sync',
        description: 'Automatically extracts chapters, supports instant chapter search and jump, and remembers your exact reading position.',
        src: 'images/hero/chapter.png',
      },
      {
        key: 'typography',
        title: 'Flexible typography',
        description: 'Customize font family, size, weight, line height, letter spacing, page size, and text color for any backdrop.',
        src: 'images/hero/reading.png',
      },
      {
        key: 'hotkeys',
        title: 'Custom global hotkeys',
        description: 'Bind your own keys for page turns, chapter jumps, and the instant boss key hide toggle.',
        src: 'images/hero/shortcut.png',
      },
      {
        key: 'reading-mode',
        title: 'Reading mode & preferences',
        description: 'Hotkeys stay dormant outside Reading Mode so they never clash with work apps. Updates arrive via GitHub Releases.',
        src: 'images/hero/preference.png',
      },
    ],
  },
  extras: {
    title: 'And the little things',
    items: [
      ['100% local & offline', 'No accounts, no backend servers. Your library and reading progress never leave your disk.'],
      ['Multi-encoding TXT', 'Detects common text encodings on import so files open cleanly without garbled characters.'],
      ['Tiny footprint', 'Powered by Tauri 2 + Rust with minimal RAM and disk usage compared to Electron apps.'],
      ['Stealthy Dock / Tray', 'Option to hide from the Dock while keeping quick controls in the system tray.'],
      ['Window memory', 'Remembers window size and position across restarts so it always lands in the same spot.'],
      ['GitHub auto-updater', 'Checks GitHub Releases for updates and installs cleanly inside the app.'],
    ],
  },
  download: {
    title: 'Download Cloak',
    all: 'All releases ›',
    ver: (v) => (v ? `Latest ${v}` : 'Latest release'),
    platforms: [
      {
        key: 'mac',
        name: 'macOS',
        arch: 'Apple Silicon (aarch64) · .dmg',
        cta: 'Download .dmg',
        secondaryKey: 'macIntel',
        secondaryLabel: 'Intel Mac (.dmg)',
        note: 'Builds are not notarized by Apple. On first launch, go to System Settings → Privacy & Security and click “Open Anyway”.',
      },
      {
        key: 'win',
        name: 'Windows',
        arch: 'x64 · -setup.exe',
        cta: 'Download installer',
        secondaryKey: 'winMsi',
        secondaryLabel: '.msi installer',
        note: 'If Microsoft Defender SmartScreen appears, click “More info → Run anyway”.',
      },
      {
        key: 'linux',
        name: 'Linux',
        arch: 'x64 (amd64) · .AppImage',
        cta: 'Download .AppImage',
        secondaryKey: 'linuxDeb',
        secondaryLabel: '.deb package',
        note: 'Make the .AppImage executable (chmod +x) before running, or grab the .deb package for Debian / Ubuntu.',
      },
    ],
    cta: { mac: 'Download for macOS', win: 'Download for Windows', linux: 'Download for Linux' },
    first: 'First launch',
    foot: 'Cloak is free and open source. All installers are built transparently via GitHub Actions and hosted on GitHub Releases.',
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'Is Cloak free? Do I need an account?',
        a: ['Yes. Cloak is completely free and open source on GitHub. No sign-ups, no subscriptions, no paywalls.'],
      },
      {
        q: 'macOS says it cannot verify the developer. How do I open it?',
        a: ['Because this indie open-source app does not pay for an Apple Developer notarization certificate, macOS Gatekeeper prompts once on first launch:'],
        steps: [
          '1. Click “Done” or “Cancel” on the initial dialog.',
          '2. Open System Settings → Privacy & Security and scroll to the Security section.',
          '3. Click “Open Anyway” and confirm with your password.',
        ],
        images: [
          {
            src: 'images/faq/macos-cannot-verify/dialog.png',
            alt: 'macOS Gatekeeper dialog',
          },
          {
            src: 'images/faq/macos-cannot-verify/solution.png',
            alt: 'macOS Open Anyway setting',
          },
        ],
      },
      {
        q: 'Windows SmartScreen blocked the installer. Is it safe?',
        a: ['Unsigned Windows installers trigger SmartScreen until reputation builds up. You can inspect all source code on GitHub and allow it once:'],
        steps: [
          '1. Quick allow: Click “More info” on the SmartScreen prompt, then click “Run anyway”.',
          '2. Permanent allow: Open Settings → Privacy & security → App & browser control → Reputation-based protection settings and toggle off SmartScreen checks (Edge requires turning it off separately in browser settings).',
        ],
        images: [
          {
            src: 'images/faq/microsoft-defender-smartscreen/dialog.png',
            alt: 'Windows SmartScreen dialog',
          },
          {
            src: 'images/faq/microsoft-defender-smartscreen/solution-1.png',
            alt: 'Windows Reputation-based protection settings',
          },
          {
            src: 'images/faq/microsoft-defender-smartscreen/solution-2.png',
            alt: 'Disable SmartScreen checks',
          },
          {
            src: 'images/faq/microsoft-defender-smartscreen/solution-3.png',
            alt: 'Disable SmartScreen in Microsoft Edge',
          },
        ],
      },
      {
        q: 'Which book formats are supported? Does it include an online library?',
        a: ['Cloak supports local TXT and EPUB files with automatic encoding detection for TXT. For copyright reasons, it does not bundle an online bookstore.'],
      },
      {
        q: 'Where can I report bugs or request features?',
        a: ['Please open an issue on the GitHub repository with your OS version and steps to reproduce. PRs are welcome too!'],
      },
    ],
  },
  donate: {
    eyebrow: 'Buy me a coffee',
    title: 'Enjoying Cloak?',
    lead: 'Cloak is free and open source. If it makes your workday a little brighter, feel free to tip a coffee.',
    alipay: 'Alipay',
    wechat: 'WeChat Pay',
  },
  end: { title: 'Ready when you are.', star: 'Star on GitHub' },
  footer: 'Made by reflux studio · Open source · Built with Tauri 2',
}

export type SiteDict = typeof zh
export const site: Record<Locale, SiteDict> = { zh, en }
