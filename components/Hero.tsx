'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { ThemeToggle } from '@/components/ThemeToggle';
import { useThemeStore } from '@/store/theme';

const Sky = dynamic(() => import('@/components/scene/Sky').then((m) => m.Sky), { ssr: false });

export function Hero() {
  const theme = useThemeStore((s) => s.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div
      className="relative m-3 flex min-h-[calc(100svh-24px)] flex-col justify-end overflow-hidden rounded-[20px] border border-white/35"
      style={{
        background: 'linear-gradient(180deg, var(--sky-a) 0%, var(--sky-b) 100%)',
        color: 'var(--sky-ink)',
      }}>
      {mounted && <Sky dark={theme === 'dark'} />}

      <ThemeToggle />

      <div className="relative z-10 max-w-[720px] px-8 pb-14">
        <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.1em] opacity-75">
          Computer Science · UC Riverside
        </p>
        <h1 className="mb-5 font-serif text-[clamp(36px,7vw,64px)] font-semibold leading-[1.05] tracking-[-0.01em]">
          Hi, I&rsquo;m Sohan Gottipati.
        </h1>
        <p className="max-w-[56ch] text-[17px] leading-relaxed opacity-90">
          Hello! My name is Sohan Gottipati and I am a current student at the University of
          California, Riverside majoring in Computer Science with Business Applications. Below
          you can check out some of my projects!
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-2 pb-5 text-xs font-semibold uppercase tracking-[0.08em] opacity-75 motion-safe:animate-[floatCue_2.4s_ease-in-out_infinite]">
        <span>↕</span>
        <span>Scroll</span>
      </div>
    </div>
  );
}
