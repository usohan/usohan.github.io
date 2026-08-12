'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
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

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // A horizontal scroll-jack is heavy, sustained motion -- reduced-motion
    // users get the CSS fallback (stacked vertically) instead of a gentler version.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - section.clientWidth;
      gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance}`,
          scrub: true,
          pin: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden motion-reduce:overflow-visible border-t border-[var(--border)]">
      <h2 className="px-6 pt-16 text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--sub)]">Projects</h2>
      <div
        ref={trackRef}
        className="flex w-max motion-reduce:w-full motion-reduce:flex-col gap-6 px-6 py-10">
        {PANELS.map((panel) => (
          <div
            key={panel.kicker}
            className="flex w-[min(82vw,560px)] shrink-0 flex-col justify-center rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
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
        ))}
      </div>
    </section>
  );
}
