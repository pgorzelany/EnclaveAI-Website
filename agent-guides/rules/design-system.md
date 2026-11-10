# Website visual system

Use semantic color tokens from `assets/css/themes.css`. Type sizes, spacing, content widths and radii live at the start of `assets/css/input.css`. `tailwind.config.js` exposes semantic color utilities and configures article typography from these tokens. Keep app-screenshot frame styling separate from the site's brand colors.

Reusable Jekyll components live in `_includes/ui/`:

- `button.html`: `href`, `label`, optional `variant` (`primary`, `secondary`, `contrast`), `class`, `arrow`.
- `section-heading.html`: `eyebrow`, `title`, optional `description`, `id`, `centered`.
- `phone.html`: `image` under `assets/images/product/`, `alt`, optional `width`, `height`, `eager`, `class`.
- `faq.html`: `items`, a list of questions and Markdown answers.
- `plan-card.html`: `plan`, from `_data/plans.yml`.
- `cta.html`: the shared download panel.

Keep dynamically assembled component variants in the Tailwind `safelist`; the scanner cannot infer Liquid values from data files.

Use the shared `container-site`, `card`, heading and text classes for new marketing sections. Use `wide: true` in a marketing page's frontmatter; ordinary document pages use the reading-width wrapper. Blog posts have their own shared reading layout.

After changing component CSS or template classes, run `npm run build:css`, then build Jekyll. Keep `assets/css/output.css` in sync. Check the homepage, pricing, blog index, a blog post and a document page at desktop and mobile widths when editing shared styles.

Local preview instructions and the component reference are in `_design-preview/REFRESH.md`. Preview sources, saved builds and screenshot provenance stay outside Jekyll's production output. Keep generated examples and sample conversations distinguishable from real customer content.

## Readability

Keep descriptive copy at 18px or above, menu items and buttons at 16px or above, and supporting labels at 14px or above at the default root size. Use the shared text tokens on mobile as well as desktop; do not shrink them to fit a fixed-height card. Allow content areas to grow and crop only decorative product imagery.

## Light and dark themes

`assets/css/themes.css` is the source of truth for both palettes. The default `:root` palette is light; `:root[data-theme="dark"]` replaces only semantic roles. Keep component colors expressed through tokens in both themes. Do not add per-component dark selectors to recolor surfaces.

- Canvas, surface, raised surface, text, link, border, accent, hover and focus roles cover ordinary components.
- Emphasis and contrast-action roles cover download panels and the Pro plan independently of primary-button inversion.
- Notice and article-code roles cover archived-document notices and article typography.
- `--media-*` tokens describe the original light screenshot presentation, shared by both themes. Preserve real screenshot pixels. The monochrome brand icon has its own theme-aware filter token.

Use semantic Tailwind colors in document templates instead of fixed gray, blue or yellow utility colors. Migrating classes must preserve the legal/document text.

`assets/js/theme.js` runs synchronously in the head before the stylesheet. It selects a valid saved `enclave-theme` preference or follows `prefers-color-scheme`; manual choices persist across pages and reloads. Blocked storage must not prevent switching. System changes apply only while there is no manual preference, and storage events synchronize other tabs. With JavaScript unavailable, the light palette remains readable and the toggle stays hidden.

`_includes/ui/theme-toggle.html` owns the navigation control. Keep its `aria-label="Dark mode"` stable and update `aria-pressed` to expose the current state. Both keyboard and touch operation must remain available. The control stays outside the mobile menu and has a 44px target.

Run `node --test _design-preview/theme.test.cjs` for initialization, persistence, system changes and storage-failure behavior. Check both palettes on the homepage, pricing, an article, the data guide, an archived legal notice and the component reference, including mobile widths. Verify normal and emphasis text contrast before adding or changing theme tokens.
