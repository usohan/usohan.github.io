import { Reveal } from '@/components/Reveal';

export function Connect() {
  return (
    <section id="connect" className="mx-auto max-w-[760px] border-t border-[var(--border)] px-6 py-24">
      <Reveal>
        <h2 className="mb-6 text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--sub)]">Connect</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:sohangot@gmail.com"
            className="flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-[15px] font-semibold text-[var(--ink)] transition-[transform,border-color] duration-150 ease-out hover:border-[var(--accent)] active:scale-[0.97]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] shrink-0">
              <path d="M4 4h16v16H4z" />
              <path d="m4 6 8 7 8-7" />
            </svg>
            Email
          </a>
          <a
            href="https://github.com/sohangottipati"
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--card)] px-5 py-3 text-[15px] font-semibold text-[var(--ink)] transition-[transform,border-color] duration-150 ease-out hover:border-[var(--accent)] active:scale-[0.97]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px] shrink-0">
              <path d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.53.1.72-.23.72-.51v-1.99c-2.92.64-3.54-1.24-3.54-1.24-.48-1.22-1.17-1.55-1.17-1.55-.96-.65.07-.64.07-.64 1.06.07 1.61 1.09 1.61 1.09.94 1.61 2.47 1.15 3.07.88.1-.68.37-1.15.67-1.42-2.33-.27-4.79-1.17-4.79-5.2 0-1.15.41-2.09 1.08-2.82-.11-.27-.47-1.35.1-2.81 0 0 .88-.28 2.88 1.08a10 10 0 0 1 5.24 0c2-1.36 2.88-1.08 2.88-1.08.57 1.46.21 2.54.1 2.81.67.73 1.08 1.67 1.08 2.82 0 4.04-2.46 4.93-4.8 5.19.38.33.72.97.72 1.96v2.9c0 .28.19.62.73.51A10.5 10.5 0 0 0 12 1.5z" />
            </svg>
            GitHub
          </a>
        </div>
      </Reveal>

      <footer className="pt-24 text-center text-[13px] text-[var(--sub)]">Sohan Gottipati</footer>
    </section>
  );
}
