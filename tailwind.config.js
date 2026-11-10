/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_pages/**/*.html',
    './_posts/**/*.md',
    './blog/**/*.html',
    './index.html',
    './404.html',
    './_design-preview/design-system.html',
  ],
  safelist: ['button--primary', 'button--secondary', 'button--contrast', 'feature-card--wide', 'feature-card--compact'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        surface: 'var(--color-surface)',
        'surface-raised': 'var(--color-surface-raised)',
        'on-accent': 'var(--color-on-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'link-color': 'var(--color-link)',
        'notice-bg': 'var(--color-notice-bg)',
        'notice-ink': 'var(--color-notice-ink)',
        'notice-border': 'var(--color-notice-border)',
        ink: 'var(--color-ink)',
        muted: 'var(--color-muted)',
        line: 'var(--color-line)',
        accent: 'var(--color-accent)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--color-ink)',
            '--tw-prose-headings': 'var(--color-ink)',
            '--tw-prose-links': 'var(--color-link)',
            '--tw-prose-bold': 'var(--color-ink)',
            '--tw-prose-counters': 'var(--color-muted)',
            '--tw-prose-bullets': 'var(--color-muted)',
            '--tw-prose-quotes': 'var(--color-ink)',
            '--tw-prose-quote-borders': 'var(--color-line)',
            '--tw-prose-hr': 'var(--color-line)',
            '--tw-prose-code': 'var(--color-code-ink)',
            '--tw-prose-pre-code': 'var(--color-pre-ink)',
            '--tw-prose-pre-bg': 'var(--color-pre-bg)',
            '--tw-prose-captions': 'var(--color-muted)',
            '--tw-prose-th-borders': 'var(--color-line)',
            '--tw-prose-td-borders': 'var(--color-line)',
            'code:not(pre code)': { backgroundColor: 'var(--color-code-bg)', borderRadius: '.25rem', padding: '.1em .3em' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
