import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-instrument)', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: 'var(--ink)',
        sub: 'var(--sub)',
        surface: 'var(--bg)',
        frame: 'var(--frame)',
        card: 'var(--card)',
        edge: 'var(--border)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
