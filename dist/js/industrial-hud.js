/**
 * Industrial HUD Framework – biblioteka UI (industrial / HUD style)
 * Użycie: IndustrialHUD.init('#app') lub IndustrialHUD.init(document.body)
 * API: IndustrialHUD.confirm(), IndustrialHUD.toast(), IndustrialHUD.log(), IndustrialHUD.setTheme()
 */
(function (global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global);
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return factory(global); });
    } else {
        global.IndustrialHUD = factory(global);
    }
})(typeof window !== 'undefined' ? window : this, function (global) {
    'use strict';

    const doc = global.document;
    const THEME_KEY = 'hud-theme';
    const LOG_LEVELS = { INFO: 'log-info', WARN: 'log-warn', ERROR: 'log-error' };
    const TOAST_CLASS = { info: 'toast-info', success: 'toast-success', warning: 'toast-warning', critical: 'toast-critical' };
    const CONFIRM_TYPE_ICONS = { info: 'fa-info-circle', success: 'fa-check-circle', warning: 'fa-exclamation-triangle', critical: 'fa-radiation' };

    let scope = null;
    let themeRoot = null;
    let addLogFn = function () { };
    let showToastFn = function () { };
    let openConfirmModalFn = function () { return Promise.resolve(false); };
    let confirmResolve = null;

    function escapeHtml(str) {
        if (str == null) return '';
        const div = doc.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    function runInit(rootEl, options) {
        const root = typeof rootEl === 'string' ? doc.querySelector(rootEl) : rootEl;
        if (!root || !doc) return;

        scope = root;
        themeRoot = options.themeRoot || doc.documentElement;

        const terminalOutput = scope.querySelector('#terminalOutput');
        const toastContainer = scope.querySelector('#toast-container');
        const confirmOverlay = scope.querySelector('#confirmOverlay');
        const confirmModal = scope.querySelector('#confirmModal');
        const confirmModalTitle = scope.querySelector('#confirmModalTitle');
        const confirmModalMainTitle = scope.querySelector('#confirmModalMainTitle');
        const confirmModalMessage = scope.querySelector('#confirmModalMessage');
        const confirmModalClose = scope.querySelector('#confirmModalClose');
        const confirmModalCancel = scope.querySelector('#confirmModalCancel');
        const confirmModalConfirm = scope.querySelector('#confirmModalConfirm');
        const themeToggleBtn = scope.querySelector('#themeToggle');
        const sidebarThemeToggle = scope.querySelector('#sidebarThemeToggle');
        const settingsBtn = scope.querySelector('#settingsBtn');
        const closeSidebarBtn = scope.querySelector('#closeSidebarBtn');
        const settingsSidebar = scope.querySelector('#settingsSidebar');
        const settingsOverlay = scope.querySelector('#settingsOverlay');
        const purgeCacheBtn = scope.querySelector('#purgeCacheBtn');
        const demoModal = scope.querySelector('#demoModal');
        const demoModalOverlay = scope.querySelector('#demoModalOverlay');
        const openModalBtn = scope.querySelector('#openModalBtn');
        const closeModalBtn = scope.querySelector('#closeModalBtn');
        const cancelModalBtn = scope.querySelector('#cancelModalBtn');
        const executeOverrideBtn = scope.querySelector('#executeOverrideBtn');

        // --- RIPPLE ---
        doc.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn-ripple');
            if (!btn) return;
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const size = Math.max(rect.width, rect.height) * 2;
            const ripple = doc.createElement('span');
            ripple.className = 'ripple';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (x - size / 2) + 'px';
            ripple.style.top = (y - size / 2) + 'px';
            btn.appendChild(ripple);
            setTimeout(function () { ripple.remove(); }, 560);
        }, true);

        // --- LOG ---
        function addLog(level, msg) {
            if (!terminalOutput) return;
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { hour12: false });
            const levelClass = LOG_LEVELS[level] || LOG_LEVELS.INFO;
            const logEntry = doc.createElement('div');
            logEntry.className = 'log-line';
            logEntry.innerHTML = '<span class="log-time">[' + timeString + ']</span><span class="' + levelClass + '">' + level + ':</span><span class="log-msg">' + escapeHtml(msg) + '</span>';
            terminalOutput.appendChild(logEntry);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
        addLogFn = addLog;

        // --- TOAST ---
        function showToast(level, title, message, durationMs) {
            durationMs = durationMs === undefined ? 5000 : durationMs;
            if (!toastContainer) return;
            const levelClass = TOAST_CLASS[level] || '';
            const toast = doc.createElement('div');
            toast.className = ('toast ' + levelClass).trim();
            toast.innerHTML = '<div class="toast-header"><span class="toast-label">' + escapeHtml(title) + '</span><button type="button" class="toast-close" aria-label="Zamknij"><i class="fas fa-times"></i></button></div>' +
                (message ? '<div class="toast-message">' + escapeHtml(message) + '</div>' : '');
            toastContainer.appendChild(toast);
            const close = function () {
                toast.classList.add('closing');
                setTimeout(function () { toast.remove(); }, 300);
            };
            var closeBtn = toast.querySelector('.toast-close');
            if (closeBtn) closeBtn.addEventListener('click', close);
            if (durationMs > 0) setTimeout(close, durationMs);
        }
        showToastFn = showToast;

        if (toastContainer) {
            toastContainer.addEventListener('click', function (e) {
                const closeBtn = e.target.closest('.toast-close');
                if (closeBtn) {
                    const toast = closeBtn.closest('.toast');
                    if (toast) { toast.classList.add('closing'); setTimeout(function () { toast.remove(); }, 300); }
                }
            });
        }

        // --- CONFIRM MODAL ---
        function openConfirmModal(opts) {
            opts = opts || {};
            const type = opts.type || 'info';
            const title = opts.title || 'Confirm';
            const message = opts.message || '';
            const confirmText = opts.confirmText || 'Confirm';
            const cancelText = opts.cancelText || 'Cancel';
            const onConfirm = opts.onConfirm;
            const onCancel = opts.onCancel;

            if (!confirmModal || !confirmOverlay) return Promise.resolve(false);

            const iconClass = CONFIRM_TYPE_ICONS[type] || CONFIRM_TYPE_ICONS.info;
            const titleHtml = '<i class="fas ' + iconClass + '" aria-hidden="true" style="margin-right: 0.4rem;"></i>' + escapeHtml(title);

            confirmModal.setAttribute('data-alert-type', type);
            if (confirmModalTitle) confirmModalTitle.innerHTML = titleHtml;
            if (confirmModalMainTitle) confirmModalMainTitle.innerHTML = titleHtml;
            if (confirmModalMessage) confirmModalMessage.textContent = message;
            if (confirmModalConfirm) confirmModalConfirm.innerHTML = '<i class="fas fa-check"></i> ' + escapeHtml(confirmText);
            if (confirmModalCancel) confirmModalCancel.innerHTML = '<i class="fas fa-times"></i> ' + escapeHtml(cancelText);

            confirmResolve = null;
            confirmModal.classList.add('active');
            confirmOverlay.classList.add('active');
            confirmOverlay.setAttribute('aria-hidden', 'false');
            confirmModal.setAttribute('aria-hidden', 'false');

            return new Promise(function (resolve) {
                confirmResolve = function (result) {
                    closeConfirmModal();
                    if (result && onConfirm) onConfirm(); else if (!result && onCancel) onCancel();
                    resolve(result);
                };
            });
        }
        openConfirmModalFn = openConfirmModal;

        function closeConfirmModal() {
            if (confirmModal) confirmModal.classList.remove('active');
            if (confirmOverlay) {
                confirmOverlay.classList.remove('active');
                confirmOverlay.setAttribute('aria-hidden', 'true');
            }
            if (confirmModal) confirmModal.setAttribute('aria-hidden', 'true');
        }

        function handleConfirmChoice(confirmed) {
            if (typeof confirmResolve === 'function') {
                confirmResolve(confirmed);
                confirmResolve = null;
            } else {
                closeConfirmModal();
            }
        }

        if (confirmModalClose) confirmModalClose.addEventListener('click', function () { handleConfirmChoice(false); });
        if (confirmModalCancel) confirmModalCancel.addEventListener('click', function () { handleConfirmChoice(false); });
        if (confirmModalConfirm) confirmModalConfirm.addEventListener('click', function () { handleConfirmChoice(true); });
        if (confirmOverlay) confirmOverlay.addEventListener('click', function () { handleConfirmChoice(false); });
        if (confirmModal) confirmModal.addEventListener('click', function (e) { e.stopPropagation(); });

        // --- ZEGAR ---
        function updateTime() {
            const timeElement = scope.querySelector('#timestamp');
            if (timeElement) timeElement.textContent = new Date().toLocaleTimeString('en-US', { hour12: false });
        }
        setInterval(updateTime, 1000);
        updateTime();

        // --- THEME ---
        function setTheme(isDark, silent) {
            silent = !!silent;
            themeRoot.classList.add('theme-switching');
            if (isDark) {
                themeRoot.setAttribute('theme', 'dark');
                if (sidebarThemeToggle) sidebarThemeToggle.checked = true;
            } else {
                themeRoot.removeAttribute('theme');
                if (sidebarThemeToggle) sidebarThemeToggle.checked = false;
            }
            try { global.localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light'); } catch (_) { }
            if (!silent) {
                addLog('INFO', 'Theme engine switched to: ' + (isDark ? 'DARK' : 'LIGHT') + ' mode.');
                showToast('info', 'Theme', (isDark ? 'Dark' : 'Light') + ' mode active.');
            }
            setTimeout(function () { themeRoot.classList.remove('theme-switching'); }, 50);
        }

        function initTheme() {
            try {
                const saved = global.localStorage.getItem(THEME_KEY);
                if (saved === 'dark') setTheme(true, true);
                else if (saved === 'light') setTheme(false, true);
            } catch (_) { }
        }
        initTheme();

        if (themeToggleBtn) themeToggleBtn.addEventListener('click', function () { setTheme(themeRoot.getAttribute('theme') !== 'dark'); });
        if (sidebarThemeToggle) sidebarThemeToggle.addEventListener('change', function (e) { setTheme(e.target.checked); });

        // --- SIDEBAR ---
        function openSidebar() {
            if (settingsSidebar) settingsSidebar.classList.add('active');
            if (settingsOverlay) settingsOverlay.classList.add('active');
        }
        function closeSidebar() {
            if (settingsSidebar) settingsSidebar.classList.remove('active');
            if (settingsOverlay) settingsOverlay.classList.remove('active');
        }
        function toggleSidebar() {
            if (settingsSidebar && settingsSidebar.classList.contains('active')) closeSidebar();
            else openSidebar();
        }
        if (settingsBtn) settingsBtn.addEventListener('click', toggleSidebar);
        if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
        if (settingsOverlay) settingsOverlay.addEventListener('click', closeSidebar);

        scope.querySelectorAll('.settings-tab').forEach(function (tab) {
            tab.addEventListener('click', function () {
                const container = tab.closest('.settings-sidebar');
                if (!container) return;
                const targetId = tab.getAttribute('data-tab');
                if (!targetId) return;
                container.querySelectorAll('.settings-tab').forEach(function (t) { t.classList.remove('active'); });
                container.querySelectorAll('.settings-tab-content').forEach(function (c) { c.classList.remove('active'); });
                tab.classList.add('active');
                const content = scope.querySelector('#' + targetId);
                if (content) content.classList.add('active');
            });
        });

        scope.querySelectorAll('.settings-sidebar .setting-label input[type="checkbox"]').forEach(function (cb) {
            cb.addEventListener('change', function (e) {
                const label = e.target.closest('.setting-label');
                const name = label ? label.textContent.replace(/\s+/g, ' ').trim() : 'Setting';
                addLog('INFO', name + ': ' + (e.target.checked ? 'ON' : 'OFF'));
            });
        });

        // --- PURGE CACHE ---
        if (purgeCacheBtn) {
            purgeCacheBtn.addEventListener('click', function () {
                openConfirmModal({
                    type: 'warning',
                    title: 'Purge Cache',
                    message: 'This will clear all local cache. Continue?',
                    confirmText: 'Purge',
                    cancelText: 'Cancel',
                    onConfirm: function () {
                        addLog('WARN', 'Purge Cache initiated. Local cache cleared.');
                        addLog('INFO', 'Cache purge complete. System ready.');
                        showToast('success', 'Cache Purge', 'Local cache cleared. System ready.');
                    }
                });
            });
        }

        // --- TABS ---
        scope.querySelectorAll('.tab-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const tabContainer = btn.closest('.tab-container');
                const targetId = btn.getAttribute('data-target');
                if (!tabContainer || !targetId) return;
                tabContainer.querySelectorAll('.tab-btn').forEach(function (b) { b.classList.remove('active'); });
                tabContainer.querySelectorAll('.tab-pane').forEach(function (p) { p.classList.remove('active'); });
                btn.classList.add('active');
                const targetPane = tabContainer.querySelector('#' + targetId);
                if (targetPane) targetPane.classList.add('active');
                addLog('INFO', 'Switched view to tab: ' + targetId);
            });
        });

        // --- DEMO MODAL ---
        function openModal() {
            if (demoModal) demoModal.classList.add('active');
            if (demoModalOverlay) demoModalOverlay.classList.add('active');
        }
        function closeModal() {
            if (demoModal) demoModal.classList.remove('active');
            if (demoModalOverlay) demoModalOverlay.classList.remove('active');
        }
        if (openModalBtn) openModalBtn.addEventListener('click', openModal);
        if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
        if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeModal);
        if (demoModalOverlay) demoModalOverlay.addEventListener('click', closeModal);
        if (executeOverrideBtn) {
            executeOverrideBtn.addEventListener('click', function () {
                const confirmCb = demoModal && demoModal.querySelector('.setting-label input[type="checkbox"]');
                if (confirmCb && !confirmCb.checked) {
                    addLog('WARN', 'Override blocked: Confirm Authorization required.');
                    showToast('warning', 'Override Blocked', 'Confirm Authorization required.');
                    return;
                }
                addLog('WARN', 'System override executed. Manual protocol active.');
                showToast('critical', 'System Override', 'Manual protocol active.');
                closeModal();
            });
        }
        if (demoModal) demoModal.addEventListener('click', function (e) { e.stopPropagation(); });

        // --- JA-SELECT ---
        scope.querySelectorAll('.ja-select-wrap').forEach(function (wrap) {
            const btn = wrap.querySelector('.ja-select-btn');
            const list = wrap.querySelector('.ja-select-list');
            const items = wrap.querySelectorAll('.ja-select-item');
            if (!btn || !list) return;
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                doc.querySelectorAll('.ja-select-list').forEach(function (l) { if (l !== list) l.classList.remove('ja-visible'); });
                doc.querySelectorAll('.ja-select-btn').forEach(function (b) { if (b !== btn) b.classList.remove('ja-open'); });
                list.classList.toggle('ja-visible');
                btn.classList.toggle('ja-open');
            });
            items.forEach(function (item) {
                item.addEventListener('click', function () {
                    items.forEach(function (i) { i.classList.remove('ja-selected'); });
                    item.classList.add('ja-selected');
                    const text = item.textContent.replace(/>/g, '').trim();
                    btn.innerHTML = text + ' <i class="fas fa-chevron-down ja-select-arrow"></i>';
                    list.classList.remove('ja-visible');
                    btn.classList.remove('ja-open');
                    addLog('INFO', 'Parameter updated: ' + text);
                });
            });
        });
        doc.addEventListener('click', function () {
            doc.querySelectorAll('.ja-select-list').forEach(function (l) { l.classList.remove('ja-visible'); });
            doc.querySelectorAll('.ja-select-btn').forEach(function (b) { b.classList.remove('ja-open'); });
        });

        // --- RANGE ---
        scope.querySelectorAll('.setting-control input[type="range"]').forEach(function (range) {
            range.addEventListener('input', function (e) {
                const valDisplay = e.target.nextElementSibling;
                if (valDisplay && valDisplay.classList.contains('setting-value')) {
                    const suffix = Number(e.target.max) > 100 ? 'px' : '%';
                    valDisplay.textContent = e.target.value + suffix;
                }
            });
        });

        // --- ESCAPE ---
        doc.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            if (confirmModal && confirmModal.classList.contains('active')) {
                handleConfirmChoice(false);
                e.preventDefault();
            } else if (demoModal && demoModal.classList.contains('active')) {
                closeModal();
                e.preventDefault();
            } else if (settingsSidebar && settingsSidebar.classList.contains('active')) {
                closeSidebar();
                e.preventDefault();
            } else {
                doc.querySelectorAll('.ja-select-list').forEach(function (l) { l.classList.remove('ja-visible'); });
                doc.querySelectorAll('.ja-select-btn').forEach(function (b) { b.classList.remove('ja-open'); });
            }
        });
    }

    function getTheme() {
        try {
            const stored = global.localStorage.getItem(THEME_KEY);
            if (stored) return stored;
            const root = themeRoot || (doc && doc.documentElement);
            return root && root.getAttribute('theme') === 'dark' ? 'dark' : 'light';
        } catch (_) {
            return 'light';
        }
    }

    var api = {
        init: function (root, options) {
            root = root || doc.body;
            options = options || {};
            if (doc.readyState === 'loading') {
                doc.addEventListener('DOMContentLoaded', function () { runInit(root, options); });
            } else {
                runInit(root, options);
            }
            return api;
        },
        confirm: function (options) {
            return openConfirmModalFn(options);
        },
        toast: function (level, title, message, durationMs) {
            showToastFn(level, title, message, durationMs);
        },
        log: function (level, msg) {
            addLogFn(level, msg);
        },
        setTheme: function (isDark) {
            const root = themeRoot || (doc && doc.documentElement);
            if (root) {
                root.classList.add('theme-switching');
                if (isDark) root.setAttribute('theme', 'dark');
                else root.removeAttribute('theme');
                try { global.localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light'); } catch (_) { }
                setTimeout(function () { root.classList.remove('theme-switching'); }, 50);
            }
        },
        getTheme: function () {
            return getTheme();
        }
    };

    return api;
});
