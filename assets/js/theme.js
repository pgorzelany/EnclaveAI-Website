(() => {
    const key = 'enclave-theme';
    const root = document.documentElement;
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    const validPreference = value => value === 'light' || value === 'dark' ? value : null;
    let preference = null;

    try {
        preference = validPreference(localStorage.getItem(key));
    } catch {}

    function applyTheme() {
        const dark = preference ? preference === 'dark' : system.matches;
        root.dataset.theme = dark ? 'dark' : 'light';
        root.dataset.themePreference = preference || 'system';
        document.querySelectorAll('[data-theme-toggle]').forEach(button => {
            button.hidden = false;
            button.setAttribute('aria-pressed', String(dark));
            button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
        });
    }

    applyTheme();

    document.addEventListener('DOMContentLoaded', () => {
        applyTheme();
        document.addEventListener('click', event => {
            if (!event.target.closest('[data-theme-toggle]')) return;
            preference = root.dataset.theme === 'dark' ? 'light' : 'dark';
            try {
                localStorage.setItem(key, preference);
            } catch {}
            applyTheme();
        });
    });

    system.addEventListener('change', () => {
        if (!preference) applyTheme();
    });
    window.addEventListener('storage', event => {
        if (event.key !== key && event.key !== null) return;
        preference = validPreference(event.newValue);
        applyTheme();
    });
})();
