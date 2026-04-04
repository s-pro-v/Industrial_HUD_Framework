# Industrial HUD Framework

Framework UI w stylu industrial / HUD: panele, modale, toasty, potwierdzenia, zakładki, przyciski z ripple, motyw jasny/ciemny. Użycie jak **UIkit** – jeden plik CSS, jeden plik JS.

**Dla asystentów AI (Cursor, itp.):** W tym projekcie UI buduje się **wyłącznie** z tej biblioteki. Zasady i lista komponentów/API: **`pl/cursorrules.md`**, **`pl/AGENTS.md`** (angielskie: **`en/cursorrules.md`**, **`en/AGENTS.md`**) – stosuj się do nich przy generowaniu kodu.

---

## Instalacja

### CDN (zalecane)

Dołącz jeden arkusz CSS i jeden skrypt. Po publikacji na npm (`npm publish`) użyj:

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

Zamiast `@1.0.0` możesz użyć `@latest` (najnowsza wersja).

**CDN z GitHub (bez npm):** zamień `USER/REPO` i wersję (np. tag):

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/USER/REPO@v1.0.0/dist/css/industrial-hud.css">
<script src="https://cdn.jsdelivr.net/gh/USER/REPO@v1.0.0/dist/js/industrial-hud.js"></script>
```

---

### Pobranie plików

Skopiuj do projektu z katalogu `dist/`:

- `dist/css/industrial-hud.css` – jeden zestaw stylów (layout, komponenty, toasty, modale)
- `dist/js/industrial-hud.js` – logika frameworka

---

### npm

```bash
npm install industrial-hud-framework
```

W projekcie:

- `node_modules/industrial-hud-framework/dist/css/industrial-hud.css`
- `node_modules/industrial-hud-framework/dist/js/industrial-hud.js`

---

## Szybki start (Getting started)

1. Dołącz CSS i JS (z CDN lub lokalnie – patrz wyżej).
2. Opcjonalnie: Font Awesome i JetBrains Mono (zalecane dla ikon i czcionki):

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
```

1. Umieść markup HUD w kontenerze (np. `<div id="app">...</div>`). Wszystkie elementy (nagłówek, panele, modale, `#toast-container`) muszą być wewnątrz tego kontenera – wzór w `index.html`.

2. Po załadowaniu DOM wywołaj inicjalizację:

```html
<script>
  document.addEventListener('DOMContentLoaded', function () {
    IndustrialHUD.init('#app');  // lub document.body
  });
</script>
```

---

## API (po wywołaniu `init`)

| Metoda                                                   | Opis                                                                                                                        |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `IndustrialHUD.init(root, options)`                      | Inicjuje framework. `root` – selektor (np. `'#app'`) lub element DOM; `options.themeRoot` – opcjonalnie element dla motywu. |
| `IndustrialHUD.confirm(options)`                         | Otwiera modal potwierdzenia. Zwraca `Promise<boolean>`.                                                                     |
| `IndustrialHUD.toast(level, title, message, durationMs)` | Toast. `level`: `'info'`, `'success'`, `'warning'`, `'critical'`.                                                           |
| `IndustrialHUD.log(level, msg)`                          | Wpis do logu terminala (`#terminalOutput`). `level`: `'INFO'`, `'WARN'`, `'ERROR'`.                                         |
| `IndustrialHUD.setTheme(isDark)`                         | Motyw: `true` = ciemny, `false` = jasny.                                                                                    |
| `IndustrialHUD.getTheme()`                               | Zwraca `'dark'` lub `'light'`.                                                                                              |

### Przykład: confirm

```javascript
IndustrialHUD.confirm({
  type: 'warning',
  title: 'Uwaga',
  message: 'Czy na pewno chcesz usunąć?',
  confirmText: 'Usuń',
  cancelText: 'Anuluj',
  onConfirm: function () { console.log('Usunięto'); },
  onCancel: function () { console.log('Anulowano'); }
}).then(function (confirmed) {
  console.log('Wybór:', confirmed);
});
```

### Przykład: toast

```javascript
IndustrialHUD.toast('success', 'Zapisano', 'Dane zostały zapisane.', 5000);
```

---

## Struktura projektu

```text
Industrial HUD Framework/
├── index.html
├── examples/
├── js/
├── css/
├── dist/
├── pl/                 # Dokumentacja PL
│   ├── README.md
│   ├── AGENTS.md
│   └── cursorrules.md
├── en/                 # Dokumentacja EN
│   ├── README.md
│   ├── AGENTS.md
│   └── cursorrules.md
├── package.json
└── README.md           # Ten plik (start)
```

---

## Demo

Otwórz `index.html` w przeglądarce. Przykład tylko z CDN: `examples/cdn-example.html`.

---

**Język:** [English (en/README.md)](../en/README.md)
