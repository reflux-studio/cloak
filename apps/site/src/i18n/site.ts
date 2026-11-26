import type { AssetKey, Locale, Os } from '../lib/store'

export const HERO_IMAGES: string[] = Array(3)
  .fill([
    'https://cos.reflux-studio.cn/public/cloak/hero/novels2.png',
    'https://cos.reflux-studio.cn/public/cloak/hero/current.png',
    'https://cos.reflux-studio.cn/public/cloak/hero/update.png',
    'https://cos.reflux-studio.cn/public/cloak/hero/novels.png',
    'https://cos.reflux-studio.cn/public/cloak/hero/preference.png',
    'https://cos.reflux-studio.cn/public/cloak/hero/update.png',
    'https://cos.reflux-studio.cn/public/cloak/hero/shortcut.png',
    'https://cos.reflux-studio.cn/public/cloak/hero/window.png',
    'https://cos.reflux-studio.cn/public/cloak/hero/chapter.png',
    'https://cos.reflux-studio.cn/public/cloak/hero/preview.png',
  ])
  .flat()

export interface ShowcaseTab {
  key: string
  label: string
  caption: string
  src: string
}

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
  nav: { preview: '实机截图', features: '功能', download: '下载', faq: 'FAQ' },
  hero: {
    badge: '开源免费 · macOS / Windows / Linux · Tauri 2',
    title: ['一个透明、隐蔽的', '桌面摸鱼阅读器。'],
    lead: '如果说摸鱼是一门技术，那么 Cloak 就是摸鱼界的“瑞士军刀”。基于 Tauri 2 + Rust，纯本地离线运行。',
    source: '在 GitHub 上看源码',
    other: '其他平台',
  },
  showcase: {
    eyebrow: '实机截图',
    title: '真实界面与透明效果，一眼看清。',
    lead: '所有截图均来自 Cloak 真实桌面端：透明阅读窗、本地书库、窗口设置与自动更新一目了然。点击图片可放大查看。',
    zoomHint: '点击放大',
    tabs: [
      {
        key: 'showcase',
        label: '透明窗口实录',
        caption: '透明阅读窗口直接叠加在工作界面上，翻页安静自然',
        src: 'https://cos.reflux-studio.cn/public/cloak/features/showcase.gif',
      },
      {
        key: 'preview',
        label: '阅读预览',
        caption: '文字样式、透明度与阅读效果实时预览',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/preview.png',
      },
      {
        key: 'current',
        label: '当前阅读',
        caption: '查看正在阅读的书籍状态与章节进度',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/current.png',
      },
      {
        key: 'novels2',
        label: '书库管理',
        caption: '本地导入 TXT / EPUB 电子书，统一管理阅读列表',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/novels2.png',
      },
      {
        key: 'window',
        label: '窗口设置',
        caption: '自定义窗口置顶、透明度与 Dock 栏显示策略',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/window.png',
      },
      {
        key: 'update',
        label: '自动更新',
        caption: '内置 GitHub Releases 检查与一键更新窗口',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/update.png',
      },
    ] as ShowcaseTab[],
  },
  features: {
    eyebrow: '核心功能',
    title: '摸鱼？我来助你。',
    lead: '没有复杂花哨的冗余设计，每一项能力都围绕桌面摸鱼阅读的真实场景打磨。',
    items: [
      {
        key: 'transparent-window',
        title: '透明悬浮窗口',
        description: '随意放置在任何你想伪装成文本的角落，比如代码编辑器、浏览器、文档或聊天窗口，支持置顶与透明度调节。',
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
        description: '跳章、翻页、老板键一键隐藏全都可以自定义，无需鼠标，键盘敲得嘎嘎响。',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/shortcut.png',
      },
      {
        key: 'reading-mode',
        title: '阅读模式与偏好设置',
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
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/macos-cannot-verify/dialog.png',
            alt: 'macOS 无法验证开发者弹窗',
          },
          {
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/macos-cannot-verify/solution.png',
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
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/microsoft-defender-smartscreen/dialog.png',
            alt: 'Windows SmartScreen 弹窗',
          },
          {
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/microsoft-defender-smartscreen/solution-1.png',
            alt: 'Windows 基于声誉的保护设置',
          },
          {
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/microsoft-defender-smartscreen/solution-2.png',
            alt: '关闭 SmartScreen 检查项',
          },
          {
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/microsoft-defender-smartscreen/solution-3.png',
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
    title: 'Cloak — Lightweight transparent mini reader',
    description:
      'Cloak is a free, open-source desktop transparent reader built with Tauri 2. Import local TXT or EPUB files, customize typography and opacity, and hide instantly with a boss key. Available for macOS, Windows, and Linux.',
    ogTitle: 'Cloak — Lightweight transparent mini reader',
    ogDescription: 'Free, open-source transparent desktop reader for macOS, Windows, and Linux. 100% local.',
  },
  enHint: { text: 'Cloak is also available in English.', link: 'English →', close: 'Dismiss' },
  nav: { preview: 'Screenshots', features: 'Features', download: 'Download', faq: 'FAQ' },
  hero: {
    badge: 'Open source · macOS / Windows / Linux · Tauri 2',
    title: ['A transparent, stealth', 'mini desktop reader.'],
    lead: 'Think of Cloak as the Swiss Army knife of quiet desktop reading. Built with Tauri 2 and Rust, 100% local and offline.',
    source: 'View source on GitHub',
    other: 'Other platforms',
  },
  showcase: {
    eyebrow: 'Screenshots',
    title: 'Real screens from the desktop app.',
    lead: 'Every screenshot below is captured directly from Cloak: transparent reading overlay, local library, window controls, and built-in updater. Click any image to zoom.',
    zoomHint: 'Click to zoom',
    tabs: [
      {
        key: 'showcase',
        label: 'Transparent demo',
        caption: 'Transparent reader window floating naturally over your workspace',
        src: 'https://cos.reflux-studio.cn/public/cloak/features/showcase.gif',
      },
      {
        key: 'preview',
        label: 'Reader preview',
        caption: 'Live preview of typography, opacity, and styling',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/preview.png',
      },
      {
        key: 'current',
        label: 'Current book',
        caption: 'Check active reading status and chapter progress',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/current.png',
      },
      {
        key: 'novels2',
        label: 'Library',
        caption: 'Import local TXT / EPUB books and manage your shelf',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/novels2.png',
      },
      {
        key: 'window',
        label: 'Window settings',
        caption: 'Configure always-on-top, opacity, and Dock visibility',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/window.png',
      },
      {
        key: 'update',
        label: 'Auto updater',
        caption: 'Built-in update check and install dialog backed by GitHub Releases',
        src: 'https://cos.reflux-studio.cn/public/cloak/hero/update.png',
      },
    ],
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
        title: 'Reading mode & preferences',
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
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/macos-cannot-verify/dialog.png',
            alt: 'macOS Gatekeeper dialog',
          },
          {
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/macos-cannot-verify/solution.png',
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
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/microsoft-defender-smartscreen/dialog.png',
            alt: 'Windows SmartScreen dialog',
          },
          {
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/microsoft-defender-smartscreen/solution-1.png',
            alt: 'Windows Reputation-based protection settings',
          },
          {
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/microsoft-defender-smartscreen/solution-2.png',
            alt: 'Disable SmartScreen checks',
          },
          {
            src: 'https://cos.reflux-studio.cn/public/cloak/faq/microsoft-defender-smartscreen/solution-3.png',
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
