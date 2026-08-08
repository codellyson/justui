const { join } = require('node:path');

// Derived from __dirname because a hand-written node_modules glob matches nothing
// under pnpm (symlink into the store). Forward slashes: fast-glob treats \ as an escape.
const root = join(__dirname, '..').replace(/\\/g, '/');

const content = [`${root}/dist/**/*.js`, `${root}/src/astro/**/*.astro`];

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  // Ignored once the consumer sets its own `content` — v3 replaces, never merges.
  // Real configs use withJustUI() or spread preset.content.
  content,
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        'bg-secondary': 'rgb(var(--bg-secondary) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        primary: 'rgb(var(--text-primary) / <alpha-value>)',
        secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
        muted: 'rgb(var(--text-muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-hover': 'rgb(var(--accent-hover) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
      },
      fontFamily: {
        sans: [
          "'Geist Variable'",
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: [
          "'Geist Mono Variable'",
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'monospace',
        ],
      },
      borderRadius: {
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      },
      // Tailwind v3 has no `xs` step; khaime-ui's Card exposes one.
      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },
      keyframes: {
        'justui-stripe': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0.6rem 0' },
        },
        // Radix measures the height into a CSS var; `auto` can't be keyframed.
        'justui-expand': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'justui-collapse': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'justui-expand-collapsible': {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        'justui-collapse-collapsible': {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
        'justui-slide-in-right': { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
        'justui-slide-out-right': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(100%)' } },
        'justui-slide-in-left': { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
        'justui-slide-out-left': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-100%)' } },
        'justui-slide-in-top': { from: { transform: 'translateY(-100%)' }, to: { transform: 'translateY(0)' } },
        'justui-slide-out-top': { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(-100%)' } },
        'justui-slide-in-bottom': { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
        'justui-slide-out-bottom': { from: { transform: 'translateY(0)' }, to: { transform: 'translateY(100%)' } },
        'justui-zoom-in': {
          from: { opacity: '0', transform: 'translate(-50%, -50%) scale(0.95)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
        'justui-zoom-out': {
          from: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
          to: { opacity: '0', transform: 'translate(-50%, -50%) scale(0.95)' },
        },
        'justui-fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'justui-fade-out': { from: { opacity: '1' }, to: { opacity: '0' } },
      },
      animation: {
        'justui-stripe': 'justui-stripe 1s linear infinite',
        'justui-expand': 'justui-expand 200ms ease-out',
        'justui-collapse': 'justui-collapse 200ms ease-out',
        'justui-expand-collapsible': 'justui-expand-collapsible 200ms ease-out',
        'justui-collapse-collapsible': 'justui-collapse-collapsible 200ms ease-out',
        'justui-slide-in-right': 'justui-slide-in-right 220ms ease-out',
        'justui-slide-out-right': 'justui-slide-out-right 180ms ease-in',
        'justui-slide-in-left': 'justui-slide-in-left 220ms ease-out',
        'justui-slide-out-left': 'justui-slide-out-left 180ms ease-in',
        'justui-slide-in-top': 'justui-slide-in-top 220ms ease-out',
        'justui-slide-out-top': 'justui-slide-out-top 180ms ease-in',
        'justui-slide-in-bottom': 'justui-slide-in-bottom 220ms ease-out',
        'justui-slide-out-bottom': 'justui-slide-out-bottom 180ms ease-in',
        'justui-zoom-in': 'justui-zoom-in 180ms ease-out',
        'justui-zoom-out': 'justui-zoom-out 150ms ease-in',
        'justui-fade-in': 'justui-fade-in 180ms ease-out',
        'justui-fade-out': 'justui-fade-out 150ms ease-in',
      },
    },
    // px, not rem: a host's `html { font-size }` must not rescale the controls.
    fontSize: {
      xs: ['12px', { lineHeight: '16px' }],
      sm: ['14px', { lineHeight: '20px' }],
      base: ['16px', { lineHeight: '24px' }],
      lg: ['18px', { lineHeight: '28px' }],
      xl: ['20px', { lineHeight: '28px' }],
      '2xl': ['24px', { lineHeight: '32px' }],
      '3xl': ['30px', { lineHeight: '36px' }],
      '4xl': ['36px', { lineHeight: '40px' }],
      '5xl': ['48px', { lineHeight: '1' }],
      '6xl': ['60px', { lineHeight: '1' }],
      '7xl': ['72px', { lineHeight: '1' }],
      '8xl': ['96px', { lineHeight: '1' }],
      '9xl': ['128px', { lineHeight: '1' }],
    },
  },
};

/**
 * Wraps a Tailwind config so JustUI's own files are scanned alongside yours.
 *
 * module.exports = withJustUI({ content: ['./src/**\/*.{ts,tsx}'] });
 */
module.exports.withJustUI = (config = {}) => ({
  ...config,
  presets: [module.exports, ...(config.presets ?? [])],
  content: Array.isArray(config.content)
    ? [...content, ...config.content]
    : { ...config.content, files: [...content, ...(config.content?.files ?? [])] },
});
