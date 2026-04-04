/**
 * Industrial HUD Framework – demo / auto-init
 * Inicjalizacja na #app: layout (.container), modale i #toast-container muszą być wewnątrz tego kontenera.
 * Jako biblioteka: załaduj industrial-hud.js + CSS, potem IndustrialHUD.init('#twoj-kontener', { themeRoot: document.documentElement }).
 */
document.addEventListener('DOMContentLoaded', function () {
    if (typeof IndustrialHUD !== 'undefined') {
        IndustrialHUD.init('#app', { themeRoot: document.documentElement });
    }
});
