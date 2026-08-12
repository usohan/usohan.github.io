import { Reveal } from '@/components/Reveal';

const TAGS = ['React Native', 'Expo', 'Supabase', 'PostgreSQL'];
const SPLINE_CARD_URL = 'https://my.spline.design/connectingcard-5RSoQwfJqJlc3QOVybimhBmt/';

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[760px] border-t border-[var(--border)] px-6 py-24">
      <Reveal>
        <h2 className="mb-6 text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--sub)]">Projects</h2>
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <div className="relative h-64 w-full border-b border-[var(--border)]">
            <iframe
              src={SPLINE_CARD_URL}
              title="Studispot project visual"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
            />
          </div>
          <div className="p-7">
            <h3 className="mb-1.5 text-2xl tracking-[-0.01em] text-[var(--ink)]">Studispot</h3>
            <p className="mb-4 text-sm font-semibold text-[var(--accent2)]">Find your next favorite study spot</p>
            <p className="mb-5 text-[15px] text-[var(--sub)]">
              A Beli-style app for ranking study spots through head-to-head comparisons. Every duel
              refines an Elo-based score, so recommendations reflect real community consensus — down
              to the time of day you&rsquo;re studying.
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span key={tag} className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-semibold text-[var(--sub)]">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="https://demo.sohan.website"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-[#04141a] transition-transform duration-150 ease-out hover:opacity-90 active:scale-[0.97]">
              View Live Demo →
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
