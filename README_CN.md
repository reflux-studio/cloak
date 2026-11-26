<div align="center">
  <img src="./apps/desktop/public/logo.png" width="160" alt="icon"/>

  <h1 align="center">Cloak</h1>

  [English](./README.md) / 简体中文

  一个轻量级的透明摸鱼阅读器

  基于 [Tauri 2.x](https://github.com/tauri-apps/tauri)

  官网：<https://reflux-studio.github.io/cloak/>（中文）· [/en/](https://reflux-studio.github.io/cloak/en/)（英文）

  ![repobeats](https://repobeats.axiom.co/api/embed/d02bba2d34b3b88d610c307249c5203800a251eb.svg)
</div>

## 安装

前往 [官网下载页](https://reflux-studio.github.io/cloak/#download) 或 [GitHub Releases](https://github.com/reflux-studio/cloak/releases) 下载对应平台的安装包。

## 功能

### 已实现功能

- [x] 透明背景窗口
- [x] 导入 `TXT` 小说文件（支持多种文本编码）
- [x] 导入 `EPUB` 小说文件
- [x] 章节解析、搜索与跳转
- [x] 自动保存阅读进度
- [x] 自定义每页字数、字体、字号、字重、行间距、字符间距
- [x] 自定义翻页、跳章、老板键快捷键
- [x] 阅读模式（非阅读模式下不占用快捷键）
- [x] 自动检查更新 / 自动安装更新

### 支持平台

- [x] Windows
- [x] macOS
- [x] Linux

## 开发

仓库使用 pnpm workspace：`apps/desktop` 为 Tauri 2 + React 桌面端，`apps/site` 为 Astro 静态官网。

```bash
pnpm install        # 安装整个 workspace 依赖
pnpm dev            # 运行桌面端前端开发服务
pnpm tauri dev      # 运行 Tauri 桌面端开发环境
pnpm dev:site       # 本地运行官网（apps/site）
pnpm build:site     # 构建静态官网到 apps/site/dist/
pnpm typecheck      # 校验全部包类型
pnpm release        # 交互式升级版本、打 tag 并触发 GitHub Actions 发布
```

## 报告问题 / 请求功能

如果您遇到任何异常或有功能建议，欢迎在 [GitHub Issues](https://github.com/reflux-studio/cloak/issues) 中反馈。

## 捐赠

> 如果这个小工具能够在枯燥乏味的工作中给您带来些许乐趣，不妨给作者打赏一杯咖啡～

| 支付宝 | 微信支付 |
| :---: | :---: |
| <img src="./apps/desktop/public/alipay.jpg" width="200" alt="alipay"/> | <img src="./apps/desktop/public/wechat.jpg" width="200" alt="wechat"/> |
