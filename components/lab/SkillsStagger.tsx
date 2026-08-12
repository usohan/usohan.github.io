'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SKILLS = ['TypeScript', 'React', 'React Native', 'Next.js', 'Supabase', 'PostgreSQL', 'Tailwind', 'GSAP'];

export function SkillsStagger() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll('[data-skill]');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: prefersReduced ? 0 : 16 },
        {
          opacity: 1,
          y: 0,
          duration: prefersReduced ? 0.3 : 0.5,
          ease: 'power3.out',
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="mx-auto max-w-[760px] border-t border-[var(--border)] px-6 py-24">
      <h2 className="mb-6 text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--sub)]">Stack</h2>
      <div ref={ref} className="flex flex-wrap gap-3">
        {SKILLS.map((skill) => (
          <span
            key={skill}
            data-skill
            className="rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-sm font-semibold text-[var(--ink)]">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
