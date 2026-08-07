# Instrukcje dla asystentów AI (Agents)

## Lokalizacja (Localization)

Dokumentacja i instrukcje dla AI są w dwóch wersjach językowych:

- **Polski (PL):** `pl/` — ten plik, [pl/README.md](README.md), [pl/cursorrules.md](cursorrules.md)
- **English (EN):** [en/AGENTS.md](../en/AGENTS.md), [en/README.md](../en/README.md), [en/cursorrules.md](../en/cursorrules.md)

Odpowiadaj użytkownikowi w języku, w którym pisze. Przy generowaniu tekstów w UI (etykiety, przyciski, komunikaty) używaj tego samego języka co kontekst projektu lub życzenie użytkownika.

---

## Cursor Cloud specific instructions

- This repo is a **static, dependency-free** front-end UI library (vanilla HTML/CSS/JS). `package.json` declares **no dependencies and no scripts**, and there is **no build step, bundler, lint config, or test framework**. Do not expect `npm run build/test/lint` to exist.
- **Run the demo** by serving the repo root over static HTTP and opening `index.html`, e.g. `python3 -m http.server 8000` then browse to `http://localhost:8000/index.html`. Do not open `index.html` via a `file://` path — it loads assets with relative URLs and expects an HTTP origin. `examples/cdn-example.html` is a CDN-only variant.
- The demo entry point is `index.html` → `js/industrial-hud.js` + `js/main.js` (`main.js` auto-calls `IndustrialHUD.init('#app', ...)`). The `dist/` files are the pre-built distributable copies of `css/` + `js/` and are edited/maintained by hand (there is no script that regenerates them).
- Font Awesome icons and JetBrains Mono are loaded from CDNs; if egress is blocked, icons/fonts degrade gracefully but all HUD functionality still works.
- There is no automated test suite. For a quick JS sanity check use `node --check js/industrial-hud.js` (and the other `.js` files). Otherwise verify behavior manually in the browser (buttons trigger confirm modals, toasts, terminal log lines, and light/dark theme toggle).
