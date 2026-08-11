import { Reveal } from '@/components/Reveal';

export function About() {
  return (
    <section id="about" className="mx-auto max-w-[760px] border-t border-[var(--border)] px-6 py-24">
      <Reveal>
        <h2 className="mb-6 text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--sub)]">About</h2>
        <p className="max-w-[62ch] text-[19px] leading-relaxed text-[var(--ink)]">
          I build full-stack products end to end — from database schema to the pixels people tap.
          Right now that means combining a CS degree with a business-applications focus at UCR,
          and shipping things like the project below.
        </p>
      </Reveal>
    </section>
  );
}
