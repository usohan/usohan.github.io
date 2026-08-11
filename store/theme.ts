'use client';

import { create } from 'zustand';

export type Theme = 'light' | 'dark';

type ThemeState = {
  theme: Theme | null;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
  hydrate: () => void;
};

function applyThemeToDocument(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  window.localStorage.setItem('theme', theme);
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: null,
  setTheme: (theme) => {
    applyThemeToDocument(theme);
    set({ theme });
  },
  toggle: () => {
    const current = get().theme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next: Theme = current === 'dark' ? 'light' : 'dark';
    applyThemeToDocument(next);
    set({ theme: next });
  },
  hydrate: () => {
    const stored = window.localStorage.getItem('theme') as Theme | null;
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
      set({ theme: stored });
    } else {
      set({ theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' });
    }
  },
}));
