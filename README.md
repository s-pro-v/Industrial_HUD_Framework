# Industrial HUD Framework

Framework UI w stylu industrial / HUD: panele, modale, toasty, potwierdzenia, zakładki, przyciski z ripple, motyw jasny/ciemny. Można używać jako biblioteki w dowolnym projekcie.

---

## Instalacja (jako biblioteka)

### Opcja 1: Zdalna biblioteka (CDN)

Po opublikowaniu paczki na npm (`npm publish`) możesz ładować framework z CDN, bez kopiowania plików.

**unpkg:**

```html
<link href="https://unpkg.com/industrial-hud-framework@1.0.0/css/style.css" rel="stylesheet">
<link href="https://unpkg.com/industrial-hud-framework@1.0.0/css/alert.css" rel="stylesheet">
<script src="https://unpkg.com/industrial-hud-framework@1.0.0/dist/industrial-hud.js"></script>
```

**jsDelivr:**

```html
<link href="https://cdn.jsdelivr.net/npm/industrial-hud-framework@1.0.0/css/style.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/industrial-hud-framework@1.0.0/css/alert.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/industrial-hud-framework@1.0.0/dist/industrial-hud.js"></script>
```

Zamiast `@1.0.0` możesz użyć `@latest` (zawsze najnowsza wersja) lub innej wersji. Następnie wywołaj `IndustrialHUD.init('#app')` po załadowaniu DOM.

**CDN z GitHub (bez npm):** Jeśli repozytorium jest na GitHubie, możesz użyć jsDelivr:

```html
<!-- Zamień USER/REPO na np. twojuser/industrial-hud-framework, oraz v1.0.0 na tag lub branch -->
<link href="https://cdn.jsdelivr.net/gh/USER/REPO@v1.0.0/css/style.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/gh/USER/REPO@v1.0.0/css/alert.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/gh/USER/REPO@v1.0.0/dist/industrial-hud.js"></script>
```

---

### Opcja 2: Skopiowanie plików

Skopiuj do projektu:

- `dist/industrial-hud.js` (lub `js/industrial-hud.js`)
- `css/style.css`
- `css/alert.css`

### Opcja 3: npm (lokalnie)

```bash
npm install ./ścieżka/do/Industrial-HUD-Framework
```

W projekcie będziesz miał dostęp do plików z `node_modules/industrial-hud-framework/`.

---

## Użycie w stronie (script + CSS)

1. Podłącz style (Font Awesome i JetBrains Mono są opcjonalne, ale zalecane):

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
<link href="css/alert.css" rel="stylesheet">
```

2. Podłącz skrypt biblioteki:

```html
<script src="dist/industrial-hud.js"></script>
```

3. Umieść markup HUD w kontenerze (np. `id="app"`). Wszystkie wymagane elementy (nagłówek, terminal, toasty, modale itd.) muszą być wewnątrz tego kontenera – możesz skopiować strukturę z `index.html`.

4. Po załadowaniu DOM wywołaj inicjalizację:

```html
<script>
  document.addEventListener('DOMContentLoaded', function () {
    IndustrialHUD.init('#app');  // lub document.body
  });
</script>
```

Jeśli HUD ma zajmować całą stronę, możesz użyć `IndustrialHUD.init(document.body)` i umieścić całą zawartość strony (wraz z modalami i `#toast-container`) w `body`.

---

## API (po wywołaniu `init`)

| Metoda                                                   | Opis                                                                                                                                                                   |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IndustrialHUD.init(root, options)`                      | Inicjuje framework. `root` – selektor CSS (np. `'#app'`) lub element DOM; `options.themeRoot` – opcjonalnie element dla motywu (domyślnie `document.documentElement`). |
| `IndustrialHUD.confirm(options)`                         | Otwiera modal potwierdzenia. Zwraca `Promise<boolean>`.                                                                                                                |
| `IndustrialHUD.toast(level, title, message, durationMs)` | Pokazuje toast. `level`: `'info'`, `'success'`, `'warning'`, `'critical'`.                                                                                             |
| `IndustrialHUD.log(level, msg)`                          | Dopisuje linię do logu terminala (jeśli jest `#terminalOutput`). `level`: `'INFO'`, `'WARN'`, `'ERROR'`.                                                               |
| `IndustrialHUD.setTheme(isDark)`                         | Ustawia motyw: `true` = ciemny, `false` = jasny.                                                                                                                       |
| `IndustrialHUD.getTheme()`                               | Zwraca `'dark'` lub `'light'`.                                                                                                                                         |

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

```
Industrial HUD Framework/
├── index.html          # Strona demo (używa main.js + industrial-hud.js)
├── examples/
│   └── cdn-example.html   # Przykład ładowania zdalnej biblioteki z CDN
├── js/
│   ├── industrial-hud.js   # Biblioteka (API + init)
│   └── main.js             # Demo: wywołuje IndustrialHUD.init(document.body)
├── css/
│   ├── style.css       # Główne style (layout, przyciski, karty, sidebar…)
│   └── alert.css       # Toasty, modale potwierdzeń
├── dist/
│   └── industrial-hud.js   # Kopia biblioteki do dystrybucji (CDN / npm)
├── package.json
└── README.md
```

---

## Demo

Otwórz `index.html` w przeglądarce. Ładowane są `industrial-hud.js` i `main.js`; `main.js` wywołuje `IndustrialHUD.init(document.body)`, więc cała strona działa jak demo frameworka.
