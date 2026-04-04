# Instructions for AI assistants (Agents)

This project uses **only** the **Industrial HUD Framework** library for the UI layer. When generating or changing the interface, always follow the rules below.

## 1. Source of styles and logic

- **One CSS:** `dist/css/industrial-hud.css` (or from CDN: `industrial-hud-framework` → `dist/css/industrial-hud.css`).
- **One JS:** `dist/js/industrial-hud.js` (or from CDN: `dist/js/industrial-hud.js`).
- **Initialization:** After DOM is ready, call `IndustrialHUD.init('#app', { themeRoot: document.documentElement })`. All HUD markup (including modals and `#toast-container`) must be inside **`#app`**. Use `document.body` only for a minimal page that is HUD-only.

## 2. Containers and dimensions

- **`#app`** — root passed to `init`: inside it put **`.container`** (visible HUD), **modals**, **sidebar**, **`#toast-container`** — do not leave these as direct `<body>` children outside `#app`.
- **`.container`** — main column layout inside `#app`; it does **not** replace `#app`.
- **Width / height** — set on `#app` or `.container` (or a specific panel, e.g. `.editor-container`) via inline styles or page CSS: `width`, `max-width`, `height`, `min-height`, `vh`/ `%`, `clamp()`; with fixed height add `overflow: auto` where content can grow. Details: **`en/cursorrules.md`** (section “Containers and dimensions”).

## 3. Forbidden frameworks

Do not use in this project: Bootstrap, Tailwind CSS, Material UI, Foundation, Bulma, or any other UI framework. All components must use Industrial HUD Framework classes and API only.

## 4. Components – classes to use

| Element           | Classes / structure                                                                                                                                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Init root         | `#app` — wraps `.container`, modals, `#toast-container`                                                                                                                                                                                                                                                                                 |
| Main column layout | `container` — always inside `#app`                                                                                                                                                                                                                                                                                 |
| HUD header        | `hud-header`, inside: `system-meta`, `system-meta-item`                                                                                                                                                                                                                                     |
| Action bar        | `action-bar panel`                                                                                                                                                                                                                                                                          |
| Buttons           | `btn-sm` / `btn-md` / `btn-lg` + **always** `btn-ripple`; dangerous: + `danger`                                                                                                                                                                                                             |
| Cards             | `card`, `card-header`, `card-body`                                                                                                                                                                                                                                                          |
| Panels / terminal | `terminal-panel`, `terminal-label`, `editor-container`; log: `id="terminalOutput"`, inside: `log-line`, `log-time`, `log-info`/`log-warn`/`log-error`, `log-msg`                                                                                                                            |
| Tabs              | `tab-container`, `tab-nav`, `tab-btn btn-ripple` (+ `active`), `tab-pane` (+ `active`), `data-target="id-pane"`                                                                                                                                                                             |
| Basic modal       | `modal-overlay`, `modal`, `modal-header`, `modal-body`, `modal-footer`, `close-modal btn-ripple`                                                                                                                                                                                            |
| Confirm modal     | `system-alert-modal`, ids: `confirmOverlay`, `confirmModal`, `confirmModalTitle`, `confirmModalMessage`, `confirmModalClose`, `confirmModalCancel`, `confirmModalConfirm`; classes: `close-btn btn-ripple`, `cancel-btn btn-ripple`, `system-alert-btn system-alert-btn-primary btn-ripple` |
| Toasts            | Container: `id="toast-container"` + `toast-container`                                                                                                                                                                                                                                       |
| Sidebar           | `settings-sidebar`, `settings-tab`, `settings-tab-content`, `setting-item`, `setting-label`, `close-settings btn-ripple`                                                                                                                                                                    |
| Select            | `ja-select-wrap`, `ja-select-btn btn-ripple`, `ja-select-list`, `ja-select-item`                                                                                                                                                                                                            |

## 5. API (use only this for messages and theme)

- **Confirm:** `IndustrialHUD.confirm({ type, title, message, confirmText, cancelText, onConfirm, onCancel })` → Promise&lt;boolean&gt;.
- **Toast:** `IndustrialHUD.toast('info'|'success'|'warning'|'critical', title, message, durationMs)`.
- **Terminal log:** `IndustrialHUD.log('INFO'|'WARN'|'ERROR', msg)`.
- **Theme:** `IndustrialHUD.setTheme(true|false)`, `IndustrialHUD.getTheme()`.

## 6. Markup reference

The full page structure (header, actions, panels, modals, toasts) is in **`index.html`**. When adding new views, reuse existing structures and classes; do not invent new component systems.

## 7. Theme (attribute and variables)

- `<html theme="dark">` = dark; no attribute = light.
- Colors: `var(--highlight-color)`, `var(--danger-color)`, `var(--success-color)`, `var(--warning-color)`, `var(--info-color)`, `var(--text-primary)`, `var(--text-muted)`, `var(--panel-bg)`, `var(--border-color)`.

---

**Summary:** All UI in this project = Industrial HUD Framework (one CSS, one JS, the classes and API above). Do not introduce other UI libraries.

**Polski:** [pl/AGENTS.md](../pl/AGENTS.md)
