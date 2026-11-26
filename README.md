<div align="center">
  <img src="./apps/desktop/public/logo.png" width="160" alt="icon"/>

  <h1 align="center">Cloak</h1>

  English / [简体中文](./README_CN.md)

  A see-through mini reader for slacking off at work.

  Based on [Tauri 2.x](https://github.com/tauri-apps/tauri)

  Website: <https://reflux-studio.github.io/cloak/> (中文) · [/en/](https://reflux-studio.github.io/cloak/en/) (English)

  ![repobeats](https://repobeats.axiom.co/api/embed/d02bba2d34b3b88d610c307249c5203800a251eb.svg)
</div>

## Install

Go to the [Release page](https://github.com/reflux-studio/cloak/releases) or [official website](https://reflux-studio.github.io/cloak/en/) to download the corresponding installation package.

## Features

### Implemented Features

- [x] Transparent background
- [x] Import `TXT` novel files
- [x] Import `EPUB` novel files
- [x] Chapter parsing & search / jump
- [x] Automatically save reading progress
- [x] Custom page size, font, font size, font weight, line height, character spacing
- [x] Custom page flip, chapter jump, and boss key hotkeys
- [x] Reading Mode - disable hotkeys when not in reading mode
- [x] Auto-update via GitHub Releases

### Supported Platforms

- [x] Windows
- [x] macOS
- [x] Linux

## Development

This repository is a pnpm workspace: desktop app in `apps/desktop` (Tauri 2 + React) and official website in `apps/site` (Astro).

```bash
pnpm install        # Install workspace dependencies
pnpm dev            # Run desktop frontend dev server
pnpm tauri dev      # Run Tauri desktop app in dev mode
pnpm dev:site       # Run Astro website locally
pnpm build:site     # Build static website to apps/site/dist/
pnpm typecheck      # Typecheck all workspace packages
pnpm release        # Bump version, tag, and trigger GitHub Actions release
```

## Bug Report / Feature Request

If you encounter any unexpected errors or have suggestions, please [open an issue](https://github.com/reflux-studio/cloak/issues).

## Donate

> If this project can make your work more enjoyable, your support would be greatly appreciated.

| Alipay | WeChat |
| :---: | :---: |
| <img src="./apps/desktop/public/alipay.jpg" width="200" alt="alipay"/> | <img src="./apps/desktop/public/wechat.jpg" width="200" alt="wechat"/> |
