# Industrial HUD Framework

Industrial / HUD-style UI framework: panels, modals, toasts, confirm dialogs, tabs, ripple buttons, light/dark theme. Use it like **UIkit** – one CSS file, one JS file.

**For AI assistants (Cursor, etc.):** In this project, UI must be built **only** with this library. Rules and component/API reference: **`en/cursorrules.md`**, **`en/AGENTS.md`** (Polish: **`pl/cursorrules.md`**, **`pl/AGENTS.md`**) – follow them when generating code.

---

## Installation

### CDN (recommended)

Include one stylesheet and one script. After publishing to npm (`npm publish`):

**jsDelivr:**

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/industrial-hud-framework@1.0.0/dist/css/industrial-hud.css">
<script src="https://cdn.jsdelivr.net/npm/industrial-hud-framework@1.0.0/dist/js/industrial-hud.js"></script>
```

**unpkg:**

```html
<link rel="stylesheet" href="https://unpkg.com/industrial-hud-framework@1.0.0/dist/css/industrial-hud.css">
<script src="https://unpkg.com/industrial-hud-framework@1.0.0/dist/js/industrial-hud.js"></script>
```

Replace `@1.0.0` with `@latest` for the newest version.

**CDN from GitHub (no npm):** Replace `USER/REPO` and version (e.g. tag):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/USER/REPO@v1.0.0/dist/css/industrial-hud.css">
<script src="https://cdn.jsdelivr.net/gh/USER/REPO@v1.0.0/dist/js/industrial-hud.js"></script>
```

---

### Download files

Copy into your project from the `dist/` folder:

- `dist/css/industrial-hud.css` – single stylesheet (layout, components, toasts, modals)
- `dist/js/industrial-hud.js` – framework logic

---

### npm

```bash
npm install industrial-hud-framework
```

In your project:

- `node_modules/industrial-hud-framework/dist/css/industrial-hud.css`
- `node_modules/industrial-hud-framework/dist/js/industrial-hud.js`

---

## Quick start

1. Include the CSS and JS (from CDN or locally – see above).
2. Optional: Font Awesome and JetBrains Mono (recommended for icons and font):

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
```

1. Put the HUD markup inside a container (e.g. `<div id="app">...</div>`). All elements (header, panels, modals, `#toast-container`) must be inside that container – see `index.html` for the full structure.

2. After DOM ready, call init:

```html
<script>
  document.addEventListener('DOMContentLoaded', function () {
    IndustrialHUD.init('#app');  // or document.body
  });
</script>
```

---

## API (after calling `init`)

| Method | Description |
| --- | --- |
| `IndustrialHUD.init(root, options)` | Initializes the framework. `root` – CSS selector (e.g. `'#app'`) or DOM element; `options.themeRoot` – optional element for theme (default `document.documentElement`). |
| `IndustrialHUD.confirm(options)` | Opens a confirm modal. Returns `Promise<boolean>`. |
| `IndustrialHUD.toast(level, title, message, durationMs)` | Shows a toast. `level`: `'info'`, `'success'`, `'warning'`, `'critical'`. |
| `IndustrialHUD.log(level, msg)` | Appends a line to the terminal log (`#terminalOutput`). `level`: `'INFO'`, `'WARN'`, `'ERROR'`. |
| `IndustrialHUD.setTheme(isDark)` | Theme: `true` = dark, `false` = light. |
| `IndustrialHUD.getTheme()` | Returns `'dark'` or `'light'`. |

### Example: confirm

```javascript
IndustrialHUD.confirm({
  type: 'warning',
  title: 'Warning',
  message: 'Are you sure you want to delete?',
  confirmText: 'Delete',
  cancelText: 'Cancel',
  onConfirm: function () { console.log('Deleted'); },
  onCancel: function () { console.log('Cancelled'); }
}).then(function (confirmed) {
  console.log('Choice:', confirmed);
});
```

### Example: toast

```javascript
IndustrialHUD.toast('success', 'Saved', 'Data has been saved.', 5000);
```

---

## Project structure

```text
Industrial HUD Framework/
├── index.html
├── examples/
├── js/
├── css/
├── dist/
├── pl/                 # Documentation (Polish)
│   ├── README.md
│   ├── AGENTS.md
│   └── cursorrules.md
├── en/                 # Documentation (English)
│   ├── README.md
│   ├── AGENTS.md
│   └── cursorrules.md
├── package.json
└── README.md           # This file (entry point)
```

---

## Demo

Open `index.html` in a browser. CDN-only example: `examples/cdn-example.html`.

---

**Language:** [Polski (pl/README.md)](../pl/README.md)
