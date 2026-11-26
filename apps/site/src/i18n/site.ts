import type { AssetKey, Locale, Os } from '../lib/store'

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
    title: 'Cloak — 轻量透明的摸鱼阅读器',
    description:
      'Cloak 是一款基于 Tauri 2 构建的开源免费桌面端透明阅读器。支持 TXT、EPUB 本地导入、章节解析、自定义排版与老板键一键隐藏，纯本地离线运行。支持 macOS、Windows、Linux。',
    ogTitle: 'Cloak — 轻量透明的摸鱼阅读器',
    ogDescription: '开源免费的透明桌面阅读器，支持 macOS、Windows、Linux，纯本地离线运行。',
  },
  enHint: { text: 'Cloak 也有英文页面。', link: 'English →', close: '关闭' },
  nav: { preview: '体验', features: '功能', download: '下载', faq: 'FAQ' },
  hero: {
    badge: '开源免费 · macOS / Windows / Linux · Tauri 2',
    title: ['把小说藏进工作界面，', '透明，安静，秒隐。'],
    lead: '一款用 Tauri 2 + Rust 写的轻量级透明桌面阅读器。把半透明阅读窗叠在代码、文档或表格上，敲键盘翻页，老板键一秒隐藏。',
    source: '在 GitHub 上看源码',
    other: '其他平台',
  },
  preview: {
    eyebrow: '交互预览',
    title: '就像本来就长在你的工作软件里。',
    lead: '调节透明度、字号，或者点一下老板键试试看。在桌面端里，这些全部绑定为全局快捷键，双手不用离开键盘。',
    editorTab: 'order-service.ts',
    opacity: '透明度',
    fontSize: '字号',
    prev: '上一页',
    next: '下一页',
    bossKey: '老板键',
    hiddenTip: '窗口已隐藏 · 再按一次老板键恢复阅读',
    restore: '恢复窗口',
    bookTitle: '第一章 · 幽灵窗',
    pages: [
      '屏幕右下角那行小字，透明度刚好压到百分之三十五。背景里还是密密麻麻的 TypeScript 类型定义，谁从工位后面走过去，看到的都只是你在认真排查线上接口。',
      '右手无名指轻轻搭在方向键上，不需要切窗口，也不用把鼠标移出编辑器。翻页、跳章、调整行距，全部静默完成；非阅读模式下快捷键自动让路，不打扰正常写代码。',
      '本地 TXT 与 EPUB 自动解析目录并保存阅读进度。没有账号体系，没有云端同步，也不联网上传任何内容——你的小说只留在你自己的电脑里。',
    ],
    hint: '提示：在上方试着拖动透明度滑块，或点击「老板键」体验一键隐藏。',
  },
  features: {
    eyebrow: '核心功能',
    title: '专心做好「看小说」这一件事。',
    lead: '没有复杂花哨的冗余设计，每一项能力都围绕桌面摸鱼阅读的真实场景打磨。',
    items: [
      {
        key: 'transparent-window',
        title: '透明悬浮窗口',
        description: '支持调节窗口透明度和置顶状态，自然融入编辑器、浏览器、文档或聊天窗口，不抢焦点。',
        src: 'https://cos.reflux-studio.cn/public/cloak/features/showcase.gif',
      },
      {
        key: 'local-import',
        title: '本地 TXT / EPUB 导入',
        description: '直接导入本地 TXT 与 EPUB 电子书，自动兼容多种文本编码，无需额外转换格式。',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/novels.png',
      },
      {
        key: 'chapter-parsing',
        title: '章节解析与进度记忆',
        description: '自动识别小说目录结构，支持关键词搜章与跳章，每次翻页都会实时保存阅读进度。',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/chapter.png',
      },
      {
        key: 'typography',
        title: '排版样式自由定制',
        description: '字体、字号、字重、行距、字距、每页字数与文字颜色均可按场景精细微调。',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/reading.png',
      },
      {
        key: 'hotkeys',
        title: '自定义全局快捷键',
        description: '翻页、跳章、老板键一键隐藏全都可以自定义，键盘敲得响亮，摸鱼却毫无破绽。',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/shortcut.png',
      },
      {
        key: 'reading-mode',
        title: '阅读模式与自动更新',
        description: '退出阅读模式后自动释放快捷键，不与日常工作软件冲突；新版本后台检查自动更新。',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/preference.png',
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
        q: 'macOS 打开时提示“无法验证开发者”怎么办？',
        a: [
          '个人开源项目暂未购买每年 99 美元的 Apple 开发者公证证书，macOS Gatekeeper 会对未公证应用默认拦截。只需在首次打开时放行一次即可：',
        ],
        steps: [
          '1. 在弹窗中点击「完成」或「取消」。',
          '2. 打开「系统设置」→「隐私与安全性」→ 向下滚动找到安全性提示。',
          '3. 点击「仍要打开」并输入密码确认，之后即可正常启动。',
        ],
        images: [
          {
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/macos-cannot-verify/solution.png',
            alt: 'macOS 仍要打开设置截图',
          },
        ],
      },
      {
        q: 'Windows 提示“已阻止此不安全内容 / Windows 已保护你的电脑”怎么办？',
        a: ['未购买商业代码签名证书的 Windows 安装包通常会触发 SmartScreen 提醒，按下面步骤放行即可：'],
        steps: [
          '1. 在 SmartScreen 弹窗中点击「更多信息」。',
          '2. 点击出现的「仍要运行」按钮继续安装。',
        ],
        images: [
          {
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/microsoft-defender-smartscreen/dialog.png',
            alt: 'Windows SmartScreen 弹窗',
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
    title: 'Cloak — Lightweight transparent mini reader',
    description:
      'Cloak is a free, open-source desktop transparent reader built with Tauri 2. Import local TXT or EPUB files, customize typography and opacity, and hide instantly with a boss key. Available for macOS, Windows, and Linux.',
    ogTitle: 'Cloak — Lightweight transparent mini reader',
    ogDescription: 'Free, open-source transparent desktop reader for macOS, Windows, and Linux. 100% local.',
  },
  enHint: { text: 'Cloak is also available in English.', link: 'English →', close: 'Dismiss' },
  nav: { preview: 'Preview', features: 'Features', download: 'Download', faq: 'FAQ' },
  hero: {
    badge: 'Open source · macOS / Windows / Linux · Tauri 2',
    title: ['Hide your reading in plain sight,', 'transparent and instant.'],
    lead: 'A tiny transparent desktop reader built with Tauri 2 and Rust. Float a subtle text window over your editor or spreadsheet, flip pages from the keyboard, and vanish in one keystroke.',
    source: 'View source on GitHub',
    other: 'Other platforms',
  },
  preview: {
    eyebrow: 'Interactive preview',
    title: 'Blends right into whatever you are working on.',
    lead: 'Adjust opacity, tweak font size, or hit the Boss Key below. In the desktop app, these bind to global hotkeys so your hands never leave the keyboard.',
    editorTab: 'order-service.ts',
    opacity: 'Opacity',
    fontSize: 'Font size',
    prev: 'Prev',
    next: 'Next',
    bossKey: 'Boss key',
    hiddenTip: 'Window hidden · press Boss Key again to resume',
    restore: 'Restore',
    bookTitle: 'Chapter 1 · Ghost Window',
    pages: [
      'Down in the corner of the screen, the text sits at 35% opacity right over dense TypeScript definitions. Anyone walking past your desk only sees you debugging production code.',
      'Your fingers stay on the arrow keys — no alt-tabbing, no moving the mouse out of the editor. When Reading Mode is off, Cloak releases every shortcut so your normal workflow stays untouched.',
      'Import local TXT or EPUB files with automatic chapter parsing and progress saving. No accounts, no cloud sync, no network tracking — your books stay strictly on your machine.',
    ],
    hint: 'Tip: drag the opacity slider or press “Boss key” to see it vanish.',
  },
  features: {
    eyebrow: 'Features',
    title: 'Built to do one thing cleanly.',
    lead: 'No bloat, no subscriptions. Everything is tuned for quiet, distraction-free desktop reading.',
    items: [
      {
        key: 'transparent-window',
        title: 'Transparent floating window',
        description: 'Fine-tune window transparency and always-on-top behavior to blend naturally into editors, browsers, or documents.',
        src: 'https://cos.reflux-studio.cn/public/cloak/features/showcase.gif',
      },
      {
        key: 'local-import',
        title: 'Local TXT / EPUB import',
        description: 'Import local TXT and EPUB files directly with multi-encoding detection — no manual format conversion needed.',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/novels.png',
      },
      {
        key: 'chapter-parsing',
        title: 'Chapter parsing & progress sync',
        description: 'Automatically extracts chapters, supports instant chapter search and jump, and remembers your exact reading position.',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/chapter.png',
      },
      {
        key: 'typography',
        title: 'Flexible typography',
        description: 'Customize font family, size, weight, line height, letter spacing, page size, and text color for any backdrop.',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/reading.png',
      },
      {
        key: 'hotkeys',
        title: 'Custom global hotkeys',
        description: 'Bind your own keys for page turns, chapter jumps, and the instant boss key hide toggle.',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/shortcut.png',
      },
      {
        key: 'reading-mode',
        title: 'Reading mode & auto-updates',
        description: 'Hotkeys stay dormant outside Reading Mode so they never clash with work apps. Updates arrive via GitHub Releases.',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/preference.png',
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
        a: ['Yes — Cloak is completely free and open source on GitHub. No sign-ups, no subscriptions, no paywalls.'],
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
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/macos-cannot-verify/solution.png',
            alt: 'macOS Open Anyway setting',
          },
        ],
      },
      {
        q: 'Windows SmartScreen blocked the installer. Is it safe?',
        a: ['Unsigned Windows installers trigger SmartScreen until reputation builds up. You can inspect all source code on GitHub and click through once:'],
        steps: ['1. Click “More info” on the SmartScreen prompt.', '2. Click “Run anyway” to install.'],
        images: [
          {
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/microsoft-defender-smartscreen/dialog.png',
            alt: 'Windows SmartScreen dialog',
          },
        ],
      },
      {
        q: 'Which book formats are supported? Does it include an online library?',
        a: ['Cloak supports local TXT and EPUB files with automatic encoding detection for TXT. For copyright reasons, it does not bundle an online bookstore.'],
      },
      {
        q: 'Where can I report bugs or request features?',
        a: ['Please open an issue on the GitHub repository with your OS version and steps to reproduce — PRs are also welcome!'],
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
