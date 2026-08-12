'use client';

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const PANELS = [
  {
    kicker: 'Overview',
    title: 'Studispot',
    body: "A Beli-style app for ranking study spots through head-to-head comparisons. Every duel refines an Elo-based score, so recommendations reflect real community consensus — down to the time of day you're studying.",
  },
  {
    kicker: 'Stack',
    title: 'React Native + Supabase',
    body: 'Expo Router on the client, Postgres with row-level security on the backend, and a shared catalog cached client-side so the ranking flow stays fast even on a slow connection.',
  },
  {
    kicker: 'Try it',
    title: 'Live demo',
    body: 'The whole app runs in the browser, framed as an iPhone so you can see exactly how the ranking flow feels on a phone.',
    cta: true,
  },
];

export function HorizontalProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true);
      return;
    }

    const panelEls = Array.from(track.children) as HTMLElement[];
    const textEls = panelEls.map((panel) => panel.querySelector<HTMLElement>('[data-panel-text]'));

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - section.clientWidth;

      stRef.current = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${distance}`,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const trackX = -distance * self.progress;
          gsap.set(track, { x: trackX });

          const viewportCenter = -trackX + section.clientWidth / 2;
          let closest = 0;
          let closestDelta = Infinity;
          panelEls.forEach((panel, i) => {
            const textEl = textEls[i];
            const panelCenter = panel.offsetLeft + panel.offsetWidth / 2;
            const delta = panelCenter - viewportCenter;
            if (Math.abs(delta) < closestDelta) {
              closestDelta = Math.abs(delta);
              closest = i;
            }
            if (!textEl) return;
            const proximity = gsap.utils.clamp(0, 1, 1 - Math.abs(delta) / panel.offsetWidth);
            const direction = i % 2 === 0 ? 1 : -1; // alternate left-to-right / right-to-left
            gsap.set(textEl, {
              x: (1 - proximity) * direction * 70,
              opacity: 0.15 + 0.85 * proximity,
            });
          });
          setActive(closest);
        },
      });
    }, section);

    return () => {
      ctx.revert();
      stRef.current = null;
    };
  }, []);

  function goTo(index: number) {
    const section = sectionRef.current;
    const track = trackRef.current;
    const st = stRef.current;
    if (!section || !track || !st) return;

    const panel = track.children[index] as HTMLElement;
    const panelCenter = panel.offsetLeft + panel.offsetWidth / 2;
    const distance = track.scrollWidth - section.clientWidth;
    const progress = gsap.utils.clamp(0, 1, (panelCenter - section.clientWidth / 2) / distance);
    const targetY = st.start + progress * (st.end - st.start);

    gsap.to(window, { duration: 0.8, scrollTo: { y: targetY }, ease: 'power2.inOut' });
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden motion-reduce:overflow-visible border-t border-[var(--border)]">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-16">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--sub)]">Projects</h2>

        {!reduced && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous project"
              onClick={() => goTo(Math.max(0, active - 1))}
              disabled={active === 0}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--ink)] transition-[transform,opacity] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-30 active:scale-90">
              ←
            </button>
            <div className="flex items-center">
              {PANELS.map((panel, i) => (
                <button
                  key={panel.kicker}
                  type="button"
                  aria-label={`Go to ${panel.kicker}`}
                  onClick={() => goTo(i)}
                  className="flex h-11 w-8 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
                  <span
                    className="h-2 rounded-full transition-[width,background-color] duration-200 ease-out"
                    style={{
                      width: i === active ? 20 : 8,
                      backgroundColor: i === active ? 'var(--accent)' : 'var(--border)',
                    }}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              aria-label="Next project"
              onClick={() => goTo(Math.min(PANELS.length - 1, active + 1))}
              disabled={active === PANELS.length - 1}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--ink)] transition-[transform,opacity] duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:opacity-30 active:scale-90">
              →
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        className="flex w-max motion-reduce:w-full motion-reduce:flex-col gap-6 px-6 py-10">
        {PANELS.map((panel) => (
          <div
            key={panel.kicker}
            className="flex w-[min(82vw,560px)] shrink-0 flex-col justify-center overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
            <div data-panel-text>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.1em] text-[var(--accent2)]">{panel.kicker}</p>
              <h3 className="mb-3 text-2xl tracking-[-0.01em] text-[var(--ink)]">{panel.title}</h3>
              <p className="text-[15px] leading-relaxed text-[var(--sub)]">{panel.body}</p>
              {panel.cta && (
                <a
                  href="https://demo.sohan.website"
                  target="_blank"
                  rel="noopener"
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-[#04141a] transition-transform duration-150 ease-out hover:opacity-90 active:scale-[0.97]">
                  View Live Demo →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
