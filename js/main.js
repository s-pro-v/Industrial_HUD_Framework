/**
 * Industrial HUD Framework – demo / auto-init
 * Ładuje bibliotekę i inicjuje ją na document.body (strona demo).
 * Jako biblioteka: załaduj industrial-hud.js + CSS, potem wywołaj IndustrialHUD.init('#twoj-kontener').
 */
document.addEventListener('DOMContentLoaded', function () {
    if (typeof IndustrialHUD !== 'undefined') {
        IndustrialHUD.init(document.body, { themeRoot: document.documentElement });
    }
});
