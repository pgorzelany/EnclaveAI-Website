# Refreshed original website

Development preview for the reviewed website refresh. It uses the shared Jekyll templates and styles. Production is built with `_config.yml` only; preview configuration and generated review files are excluded from publication.

Run from `EnclaveAI-Website`:

```sh
python3 _design-preview/serve-refresh.py
```

- Refreshed site: http://127.0.0.1:4174/
- Saved original: http://127.0.0.1:4175/
- Shared component reference: http://127.0.0.1:4174/design-system/

The script rebuilds Tailwind and Jekyll, then serves the current build on loopback. If a local `before/index.html` snapshot exists, it also serves the saved original; this snapshot is optional and is not stored in Git. Use `--skip-build` to serve an existing build. Stop with Ctrl-C. Builds under `site/` and `before/` are Git-ignored. The original `before/` snapshot was captured before the refresh; it is never overwritten by the preview build.

To rebuild while the server runs:

```sh
npm run build:css
bundle exec jekyll build --config _config.yml,_design-preview/config.yml --destination _design-preview/site
```

Reload the browser after rebuilding. Earlier design experiments and screenshots remain local and are not versioned with the production source.

## What changed

- Semantic CSS tokens centralize the palette, responsive type scale, spacing, widths, radii and shadows.
- Shared includes own buttons, headings, phone frames, plan cards, FAQ and download panels.
- The original homepage now has a clearer headline, a primary download action, a Mac/iPhone product composition, more compact feature sections, precise local/cloud wording and native disclosure FAQ.
- Navigation, footer, pricing, blog index, article layout and article download panel use the shared visual system. Existing legal/data documents retain their content with the updated shared page frame.
- The example prices on the prototype pricing page come from the existing repository's USD pricing. They have not been revalidated against App Store Connect. Regional terms are shown in the app.
- The preview-only banner links to the same saved original route. It is enabled by `_design-preview/config.yml` and absent from a normal production build.

## Product screenshots

New WebP assets are resized exports of native English snapshot fixtures from the local App Store pipeline, captured on 17 September 2026. They show real app views with synthetic sample content; no current customer content is used. They are newer than the website's original device artwork, but were not captured from today's app build.

`refresh-assets.json` records capture timestamps, source revisions and verified original PNG hashes. CSS supplies simplified presentation frames. App screenshots have not been redrawn or translated.

Before publication, review the final product copy and pricing, and decide whether to recapture from the latest app build.

## Validation

- Tailwind build and normal production Jekyll build passed.
- Checked links, local assets, unique IDs and JSON-LD on the homepage, pricing, blog index, second blog page, an article, data guide, privacy policy and terms.
- Confirmed production output has no preview banner, localhost links, component-catalog page or prototype directory.
- Browser checks covered desktop, tablet, 390px mobile and 320px narrow layouts. Navigation opens and closes, Escape returns focus to the menu button, and selecting a menu link closes it. Native FAQ disclosure works.
- Confirmed dynamic Liquid component variants survive Tailwind compilation.

Review captures are saved under `review/refresh-*.jpg`.

## Readability revision and content check

In response to review, descriptive copy now uses 18px, introductory copy 20px, controls 16px, and supporting labels at least 14px at the default root size. Muted text is darker. Content areas grow with their text; only screenshot areas are cropped.

All five original feature topics remain: local models, voice, assistants, documents, and Shortcuts/Siri. Voice and Shortcuts use shorter feature blocks. Contact email, Discord and X moved to the shared footer. Reviews remain unchanged, and blog posts and legal/data document contents are unchanged.

The first prototype shortened the main FAQ from 16 questions to 6. Four answers have now been added back: local conversation history, platform differences, document context and model selection in Shortcuts. The FAQ now contains 10 questions, alongside the separate billing FAQ. Repetitive privacy/offline questions remain consolidated. Broad claims about encryption, Neural Engine efficiency, data never leaving the device, fixed model names and provider availability were not copied without verification; local/cloud handling links to the existing data guide.

## SEO and responsive review

Removed the redundant hero eyebrow on user review. Compared the production build with the saved original: identical HTML URL set, identical sitemap locations, unchanged canonicals, no broken local page links, and valid JSON-LD. Article content, headings and descriptions are preserved; the brand suffix in document titles is shorter. The blog index has a descriptive local-AI title and heading. Metadata now escapes attribute values and JSON strings.

Fixed a pre-existing build issue where the default page layout wrapped robots.txt in HTML; it now emits plain text. The new internal design-system guide is excluded from publication. The local preview remains noindex while the normal production build remains indexable. The Google verification file intentionally has no normal page metadata.

Checked homepage, pricing and blog at viewport widths 320, 390, 488 and 768px: no horizontal page overflow or clipped feature descriptions. Text remains 18px or larger for descriptive copy. Field Core Web Vitals and search-ranking effects were not measured; this is a local build/layout audit, not a guarantee of unchanged search traffic.

## Shared light and dark themes

Both palettes live in `assets/css/themes.css`; components consume semantic roles rather than separate dark overrides. Emphasis panels, article code, document notices, focus, hover and links have dedicated roles. Original product screenshots retain their source colors through shared media tokens.

The navigation toggle works on desktop and mobile, including keyboard activation. Without a saved preference, the site follows system appearance. Manual choices persist through navigation and reloads; blocked storage does not break the control. The theme is applied in the head before the stylesheet is loaded.

Validation: 7 theme-state tests passed; 16 text/background token pairs in each palette exceed 4.5:1 contrast. Both palettes were checked on the homepage, pricing and blog at 320, 390, 488, 768 and 769px, with no horizontal page overflow and a 44×44px toggle. Article code/tables, archived-document notices, data-guide links and the component reference were checked in dark mode. Text in 12 document pages is unchanged; their fixed-color utility classes were migrated to semantic roles. Production build and the URL/canonical/sitemap checks passed.
