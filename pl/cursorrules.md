# Industrial HUD Framework – reguły dla AI

W tym projekcie **wszystkie interfejsy użytkownika muszą być zbudowane wyłącznie na bibliotece Industrial HUD Framework**. Nie używaj Bootstrapa, Tailwind, Material UI ani innych frameworków UI.

## Dołączanie biblioteki

- **CSS:** jeden plik – `dist/css/industrial-hud.css` (lub z CDN: jsDelivr/unpkg `industrial-hud-framework/dist/css/industrial-hud.css`).
- **JS:** jeden plik – `dist/js/industrial-hud.js` (lub z CDN: `industrial-hud-framework/dist/js/industrial-hud.js`).
- Po załadowaniu DOM wywołaj: `IndustrialHUD.init('#app', { themeRoot: document.documentElement })`. **`#app` jest wzorcem domyślnym** — obejmuje cały HUD. `document.body` tylko wtedy, gdy na stronie nie ma nic poza HUD i świadomie rezygnujesz z osobnego roota.

## Kontenery (`#app` vs `.container`) i wymiary

- **`#app`** — jeden element przekazywany do **`IndustrialHUD.init`**. Wewnątrz muszą się znaleźć: **`div.container`** (nagłówek, pasek akcji, `workspace`…), **wszystkie modale / overlaye**, **sidebar ustawień** oraz **`#toast-container`**. Nie umieszczaj modali ani toastów poza tym rootem — biblioteka szuka ich w zakresie `root` (`querySelector`).
- **`.container`** — klasa **layoutu kolumny** (flex, `width: 100%`, `max-width` w CSS frameworka, ok. 2000px). To **nie** zamiennik `#app`; to dziecko `#app` z widoczną treścią HUD.
- **Szerokość i wysokość** — gdy trzeba dopasować UI do zadanych wymiarów:
  - Ustal rozmiar na **`#app`** albo na **`container`** przez **style inline** albo **CSS strony aplikacji** (`width`, `max-width`, `min-width`, `height`, `min-height`, `max-height`), używając `px`, `%`, `vh`/`vw`, ewentualnie `min()` / `clamp()` — bez zewnętrznych frameworków CSS.
  - **`.editor-container`** (log / obszar treści) ma w frameworku domyślną wysokość; aby ją zmienić, ustaw `style="height: …; min-height: …"` lub regułę w arkuszu hosta.
  - **`workspace`** — domyślnie dwie kolumny, poniżej ~1000px jedna; przy innym układzie użyj `grid-sys` + `grid-cols-*` albo dopasuj siatkę w CSS strony, zachowując klasy paneli frameworka.
  - Przy sztywnej wysokości dodawaj **`overflow: auto`** (lub `hidden` tam, gdzie celowe), żeby treść nie wychodziła poza kontener.

## Klasy komponentów (używaj dokładnie tych)

- **Layout:** `container`, `workspace`, `panel`, `grid-sys`, `grid-cols-1`, `grid-cols-2`, `grid-cols-3`, `grid-cols-4`.
- **Nagłówek:** `hud-header`, `system-meta`, `system-meta-item`, `system-meta-general`, `system-meta-item-value`.
- **Akcje:** `action-bar` (wraz z `panel`).
- **Przyciski:** `btn-sm`, `btn-md`, `btn-lg` + zawsze `btn-ripple` dla efektu ripple; dla akcji niebezpiecznej dodaj `danger`.
- **Karty:** `card`, `card-header`, `card-body`.
- **Terminal / log:** `terminal-panel`, `terminal-label`, `editor-container` (na kontener logu ustaw `id="terminalOutput"`), wewnątrz linie: `log-line`, `log-time`, `log-info` / `log-warn` / `log-error`, `log-msg`, `log-highlight`.
- **Zakładki:** `tab-container`, `tab-nav`, `tab-btn` (+ `btn-ripple`, `active` na aktywną), `tab-pane` (+ `active`), przyciski z `data-target="id-pane"`, panele z odpowiadającym `id`.
- **Modale:** `modal-overlay`, `modal`, `modal-header`, `modal-body`, `modal-footer`, `close-modal`; dla potwierdzeń: `system-alert-modal`, `modal-content`, `system-alert-header`, `system-alert-body`, `system-alert-footer`, `close-btn`, `cancel-btn`, `system-alert-btn`, `system-alert-btn-primary`. Wymagane id: `confirmOverlay`, `confirmModal`, `confirmModalTitle`, `confirmModalMessage`, `confirmModalClose`, `confirmModalCancel`, `confirmModalConfirm`.
- **Toasty:** kontener `id="toast-container"` i klasa `toast-container`.
- **Sidebar ustawień:** `settings-sidebar-overlay`, `settings-sidebar`, `settings-sidebar-header`, `settings-tabs`, `settings-tab`, `settings-sidebar-body`, `settings-tab-content`, `setting-item`, `setting-label`, `setting-control`, `close-settings`.
- **Select (dropdown):** `ja-select-wrap`, `ja-select-btn`, `ja-select-list`, `ja-select-item`, `ja-selected`, `ja-select-prefix`, `ja-select-arrow`.
- **Inne:** `color-group-title`, `color-node`, `swatch`, `node-info`, `node-selector`, `node-data`; dla przycisków w modalach i wszędzie – dodawaj `btn-ripple`.

## API JavaScript (używaj tylko tego)

- `IndustrialHUD.init(root, options)` – root: selektor lub element; options: `{ themeRoot: document.documentElement }`.
- `IndustrialHUD.confirm({ type, title, message, confirmText, cancelText, onConfirm, onCancel })` – zwraca Promise&lt;boolean&gt;; type: 'info'|'success'|'warning'|'critical'.
- `IndustrialHUD.toast(level, title, message, durationMs)` – level: 'info'|'success'|'warning'|'critical'.
- `IndustrialHUD.log(level, msg)` – level: 'INFO'|'WARN'|'ERROR'.
- `IndustrialHUD.setTheme(isDark)` – true = ciemny, false = jasny.
- `IndustrialHUD.getTheme()` – zwraca 'dark' lub 'light'.

## Motyw

- Na `<html>` ustaw `theme="dark"` dla ciemnego lub usuń atrybut dla jasnego. Kolory przez zmienne CSS: `var(--highlight-color)`, `var(--danger-color)`, `var(--success-color)`, `var(--warning-color)`, `var(--info-color)`, `var(--text-primary)`, `var(--text-muted)`, `var(--panel-bg)`, `var(--border-color)`.

## Zasady

- Każdy przycisk w interfejsie ma klasę `btn-ripple`.
- Nowe ekrany/panele buduj z istniejących klas (card, tab-nav, terminal-panel, modal, itd.); nie twórz własnego systemu komponentów.
- Komunikaty użytkownika: toasty przez `IndustrialHUD.toast()`, potwierdzenia przez `IndustrialHUD.confirm()`.
- Pełna struktura strony demo (wraz z wymaganymi id) jest w `index.html` – możesz się na nią powołać przy generowaniu nowych widoków.

**English:** [en/cursorrules.md](../en/cursorrules.md)
