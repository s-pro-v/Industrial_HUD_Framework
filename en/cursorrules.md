# Industrial HUD Framework – rules for AI (English)

In this project **all user interfaces must be built only with the Industrial HUD Framework library**. Do not use Bootstrap, Tailwind, Material UI, or any other UI framework.

## Including the library

- **CSS:** One file – `dist/css/industrial-hud.css` (or from CDN: jsDelivr/unpkg `industrial-hud-framework/dist/css/industrial-hud.css`).
- **JS:** One file – `dist/js/industrial-hud.js` (or from CDN: `industrial-hud-framework/dist/js/industrial-hud.js`).
- After DOM ready call: `IndustrialHUD.init('#app')` (or `IndustrialHUD.init(document.body)`), where `#app` is the container that holds all HUD content (including modals and toast-container).

## Component classes (use these exactly)

- **Layout:** `container`, `workspace`, `panel`, `grid-sys`, `grid-cols-1`, `grid-cols-2`, `grid-cols-3`, `grid-cols-4`.
- **Header:** `hud-header`, `system-meta`, `system-meta-item`, `system-meta-general`, `system-meta-item-value`.
- **Actions:** `action-bar` (with `panel`).
- **Buttons:** `btn-sm`, `btn-md`, `btn-lg` + always `btn-ripple` for ripple effect; for dangerous action add `danger`.
- **Cards:** `card`, `card-header`, `card-body`.
- **Terminal / log:** `terminal-panel`, `terminal-label`, `editor-container` (set `id="terminalOutput"` on the log container), inside lines: `log-line`, `log-time`, `log-info` / `log-warn` / `log-error`, `log-msg`, `log-highlight`.
- **Tabs:** `tab-container`, `tab-nav`, `tab-btn` (+ `btn-ripple`, `active` on active), `tab-pane` (+ `active`), buttons with `data-target="id-pane"`, panes with matching `id`.
- **Modals:** `modal-overlay`, `modal`, `modal-header`, `modal-body`, `modal-footer`, `close-modal`; for confirm: `system-alert-modal`, `modal-content`, `system-alert-header`, `system-alert-body`, `system-alert-footer`, `close-btn`, `cancel-btn`, `system-alert-btn`, `system-alert-btn-primary`. Required ids: `confirmOverlay`, `confirmModal`, `confirmModalTitle`, `confirmModalMessage`, `confirmModalClose`, `confirmModalCancel`, `confirmModalConfirm`.
- **Toasts:** Container `id="toast-container"` and class `toast-container`.
- **Settings sidebar:** `settings-sidebar-overlay`, `settings-sidebar`, `settings-sidebar-header`, `settings-tabs`, `settings-tab`, `settings-sidebar-body`, `settings-tab-content`, `setting-item`, `setting-label`, `setting-control`, `close-settings`.
- **Select (dropdown):** `ja-select-wrap`, `ja-select-btn`, `ja-select-list`, `ja-select-item`, `ja-selected`, `ja-select-prefix`, `ja-select-arrow`.
- **Other:** `color-group-title`, `color-node`, `swatch`, `node-info`, `node-selector`, `node-data`; for buttons in modals and everywhere – add `btn-ripple`.

## JavaScript API (use only this)

- `IndustrialHUD.init(root, options)` – root: selector or element; options: `{ themeRoot: document.documentElement }`.
- `IndustrialHUD.confirm({ type, title, message, confirmText, cancelText, onConfirm, onCancel })` – returns Promise&lt;boolean&gt;; type: 'info'|'success'|'warning'|'critical'.
- `IndustrialHUD.toast(level, title, message, durationMs)` – level: 'info'|'success'|'warning'|'critical'.
- `IndustrialHUD.log(level, msg)` – level: 'INFO'|'WARN'|'ERROR'.
- `IndustrialHUD.setTheme(isDark)` – true = dark, false = light.
- `IndustrialHUD.getTheme()` – returns 'dark' or 'light'.

## Theme

- On `<html>` set `theme="dark"` for dark or omit the attribute for light. Colors via CSS variables: `var(--highlight-color)`, `var(--danger-color)`, `var(--success-color)`, `var(--warning-color)`, `var(--info-color)`, `var(--text-primary)`, `var(--text-muted)`, `var(--panel-bg)`, `var(--border-color)`.

## Rules

- Every button in the UI has the `btn-ripple` class.
- Build new screens/panels from existing classes (card, tab-nav, terminal-panel, modal, etc.); do not create a custom component system.
- User messages: toasts via `IndustrialHUD.toast()`, confirmations via `IndustrialHUD.confirm()`.
- Full demo page structure (including required ids) is in `index.html` – use it as reference when generating new views.

**Polski:** [pl/cursorrules.md](../pl/cursorrules.md)
