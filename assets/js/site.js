const header = document.querySelector('[data-site-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileNavigation = document.querySelector('#mobile-navigation');

function setMenu(open) {
    if (!menuToggle || !mobileNavigation) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    mobileNavigation.hidden = !open;
}

menuToggle?.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});
mobileNavigation?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});
document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuToggle.focus();
    }
});
matchMedia('(min-width: 769px)').addEventListener('change', event => {
    if (event.matches) setMenu(false);
});

if (header && 'ResizeObserver' in window) {
    new ResizeObserver(() => {
        document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`);
    }).observe(header);
}
