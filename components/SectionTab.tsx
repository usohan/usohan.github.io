'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'intro', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'connect', label: 'Connect' },
];

export function SectionTab() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const current = SECTIONS.find((s) => s.id === active) ?? SECTIONS[0];

  return (
    <a
      href={`#${current.id}`}
      aria-label={`Jump to ${current.label} section`}
      className="fixed right-0 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center overflow-hidden rounded-l-2xl border border-r-0 border-[var(--border)] bg-[var(--bg)] shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-transform duration-200 ease-out hover:-translate-x-0.5">
      <span className="flex h-11 w-11 items-center justify-center border-b border-[var(--border)] font-serif text-lg font-bold text-[var(--accent)]">
        S.
      </span>
      <span className="px-2.5 py-4 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--sub)]" style={{ writingMode: 'vertical-rl' }}>
        {current.label}
      </span>
    </a>
  );
}
