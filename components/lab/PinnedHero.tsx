'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

import { ThemeToggle } from '@/components/ThemeToggle';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SPLINE_SCENE_URL = 'https://my.spline.design/metagestalt-3gjmL4CbfxBHjZel9x4bC5K9/';

export function PinnedHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;
    if (!wrapper || !panel || !content) return;

    // Pin + scrub is real scroll-jacking motion -- skip it entirely for
    // reduced-motion users rather than offering a gentler version.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const trigger = { trigger: wrapper, start: 'top top', end: 'bottom top', scrub: true };
      ScrollTrigger.create({ ...trigger, pin: panel });
      gsap.to(content, { opacity: 0, scale: 0.92, ease: 'none', scrollTrigger: trigger });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[200vh]">
      <div
        ref={panelRef}
        className="relative mx-3 mt-3 flex h-[calc(100svh-24px)] items-center justify-center overflow-hidden rounded-[20px] border border-white/35"
        style={{
          background: 'linear-gradient(180deg, var(--sky-a) 0%, var(--sky-b) 100%)',
          color: 'var(--sky-ink)',
        }}>
        {/* Decorative only -- pointer-events-none so it can never capture the
            wheel/trackpad gesture that's driving page scroll above it. */}
        <iframe
          src={SPLINE_SCENE_URL}
          title="Hero scene"
          className="pointer-events-none absolute inset-0 h-full w-full border-0"
        />

        <ThemeToggle />

        <div ref={contentRef} className="relative z-10 max-w-[720px] px-8 text-center">
          <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.1em] opacity-75">
            Computer Science · UC Riverside
          </p>
          <h1 className="font-serif text-[clamp(36px,7vw,72px)] font-semibold leading-[1.05] tracking-[-0.01em]">
            Hi, I&rsquo;m Sohan Gottipati.
          </h1>
          <p className="mx-auto mt-5 max-w-[52ch] text-[17px] leading-relaxed opacity-90">
            I build full-stack products end to end, from database schema to the pixels people tap.
          </p>
        </div>
      </div>
    </div>
  );
}
