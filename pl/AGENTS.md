# Instrukcje dla asystentów AI (Agents)

Ten projekt używa **wyłącznie** biblioteki **Industrial HUD Framework** do warstwy UI. Generując lub zmieniając interfejs, zawsze stosuj się do poniższych zasad.

## 1. Źródło stylów i logiki

- **Jeden CSS:** `dist/css/industrial-hud.css` (lub z CDN: `industrial-hud-framework` → `dist/css/industrial-hud.css`).
- **Jeden JS:** `dist/js/industrial-hud.js` (lub z CDN: `dist/js/industrial-hud.js`).
- **Inicjalizacja:** po załadowaniu DOM wywołaj `IndustrialHUD.init('#app')` (lub `IndustrialHUD.init(document.body)`). Cały markup HUD (w tym modale i `#toast-container`) musi być wewnątrz tego kontenera.

## 2. Zakazane frameworki

Nie używaj w tym projekcie: Bootstrap, Tailwind CSS, Material UI, Foundation, Bulma ani żadnych innych frameworków UI. Wszystkie komponenty muszą opierać się na klasach i API Industrial HUD Framework.

## 3. Komponenty – klasy do użycia

| Element             | Klasy / struktura                                                                                                                                                                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kontener główny     | `container`                                                                                                                                                                                                                                                                              |
| Nagłówek HUD        | `hud-header`, wewnątrz `system-meta`, `system-meta-item`                                                                                                                                                                                                                                 |
| Pasek akcji         | `action-bar panel`                                                                                                                                                                                                                                                                       |
| Przyciski           | `btn-sm` / `btn-md` / `btn-lg` + **zawsze** `btn-ripple`; niebezpieczne: + `danger`                                                                                                                                                                                                      |
| Karty               | `card`, `card-header`, `card-body`                                                                                                                                                                                                                                                       |
| Panele / terminal   | `terminal-panel`, `terminal-label`, `editor-container`; log: `id="terminalOutput"`, wewnątrz `log-line`, `log-time`, `log-info`/`log-warn`/`log-error`, `log-msg`                                                                                                                        |
| Zakładki            | `tab-container`, `tab-nav`, `tab-btn btn-ripple` (+ `active`), `tab-pane` (+ `active`), `data-target="id-pane"`                                                                                                                                                                          |
| Modal zwykły        | `modal-overlay`, `modal`, `modal-header`, `modal-body`, `modal-footer`, `close-modal btn-ripple`                                                                                                                                                                                         |
| Modal potwierdzenia | `system-alert-modal`, id: `confirmOverlay`, `confirmModal`, `confirmModalTitle`, `confirmModalMessage`, `confirmModalClose`, `confirmModalCancel`, `confirmModalConfirm`; klasy: `close-btn btn-ripple`, `cancel-btn btn-ripple`, `system-alert-btn system-alert-btn-primary btn-ripple` |
| Toasty              | Kontener: `id="toast-container"` + `toast-container`                                                                                                                                                                                                                                     |
| Sidebar             | `settings-sidebar`, `settings-tab`, `settings-tab-content`, `setting-item`, `setting-label`, `close-settings btn-ripple`                                                                                                                                                                 |
| Select              | `ja-select-wrap`, `ja-select-btn btn-ripple`, `ja-select-list`, `ja-select-item`                                                                                                                                                                                                         |

## 4. API (tylko to do komunikatów i motywu)

- **Potwierdzenie:** `IndustrialHUD.confirm({ type, title, message, confirmText, cancelText, onConfirm, onCancel })` → Promise&lt;boolean&gt;.
- **Toast:** `IndustrialHUD.toast('info'|'success'|'warning'|'critical', title, message, durationMs)`.
- **Log w terminalu:** `IndustrialHUD.log('INFO'|'WARN'|'ERROR', msg)`.
- **Motyw:** `IndustrialHUD.setTheme(true|false)`, `IndustrialHUD.getTheme()`.

## 5. Referencja markupu

Wzór pełnej strony (nagłówek, akcje, panele, modale, toasty) jest w pliku **`index.html`**. Przy dodawaniu nowych widoków kopiuj istniejące struktury i klasy; nie wymyślaj nowych systemów komponentów.

## 6. Motyw (atrybut i zmienne)

- `<html theme="dark">` = ciemny, brak atrybutu = jasny.
- Kolory: `var(--highlight-color)`, `var(--danger-color)`, `var(--success-color)`, `var(--warning-color)`, `var(--info-color)`, `var(--text-primary)`, `var(--text-muted)`, `var(--panel-bg)`, `var(--border-color)`.

---

**Podsumowanie:** Wszystkie UI w tym projekcie = Industrial HUD Framework (jeden CSS, jeden JS, podane klasy i API). Nie wprowadzaj innych bibliotek UI.

**English:** [en/AGENTS.md](../en/AGENTS.md)
