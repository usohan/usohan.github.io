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
  const sceneRef = useRef<HTMLIFrameElement>(null);
  const voidRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll-driven pin + fade -- separate from the load-in below, gated on its own.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;
    if (!wrapper || !panel || !content) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const trigger = { trigger: wrapper, start: 'top top', end: 'bottom top', scrub: true };
      ScrollTrigger.create({ ...trigger, pin: panel });
      gsap.to(content, { opacity: 0, scale: 0.92, ease: 'none', scrollTrigger: trigger });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  // First-load entrance: a "coming out of a void" reveal. Rare/first-time event
  // (once per visit), so this is where the delight budget is spent.
  useEffect(() => {
    const voidLayer = voidRef.current;
    const scene = sceneRef.current;
    const content = contentRef.current;
    if (!voidLayer || !scene || !content) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(voidLayer, { autoAlpha: 0 });
        gsap.set(content, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(content, { opacity: 0, y: 18 });
      gsap.set(scene, { scale: 1.4, filter: 'blur(6px)' });

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      // The void starts fully opaque (clipped to nothing hidden) and shrinks
      // away to a point, so the scene emerges through it rather than into it.
      tl.fromTo(
        voidLayer,
        { clipPath: 'circle(150% at 50% 50%)' },
        { clipPath: 'circle(0% at 50% 50%)', duration: 1.7, ease: 'power2.inOut' }
      )
        .to(scene, { scale: 1, filter: 'blur(0px)', duration: 1.9, ease: 'power2.out' }, 0)
        .to(content, { opacity: 1, y: 0, duration: 0.9 }, 0.55);
    });

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
          ref={sceneRef}
          src={SPLINE_SCENE_URL}
          title="Hero scene"
          className="pointer-events-none absolute inset-0 h-full w-full border-0"
        />

        {/* The void: a black disc that starts as a pinpoint and expands to
            reveal the scene, like emerging from darkness. */}
        <div ref={voidRef} className="pointer-events-none absolute inset-0 bg-black" />

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
