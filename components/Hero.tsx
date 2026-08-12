'use client';

import { ThemeToggle } from '@/components/ThemeToggle';

const SPLINE_SCENE_URL = 'https://my.spline.design/connectingcard-5RSoQwfJqJlc3QOVybimhBmt/';

export function Hero() {
  return (
    <div
      id="intro"
      className="relative m-3 flex min-h-[calc(100svh-24px)] flex-col justify-end overflow-hidden rounded-[20px] border border-white/35"
      style={{
        background: 'linear-gradient(180deg, var(--sky-a) 0%, var(--sky-b) 100%)',
        color: 'var(--sky-ink)',
      }}>
      <iframe src={SPLINE_SCENE_URL} title="Intro scene" className="absolute inset-0 h-full w-full border-0" />

      <ThemeToggle />

      <div className="relative z-10 flex items-center justify-center gap-2 pb-5 text-xs font-semibold uppercase tracking-[0.08em] opacity-75 motion-safe:animate-[floatCue_2.4s_ease-in-out_infinite]">
        <span>↕</span>
        <span>Scroll</span>
      </div>
    </div>
  );
}
