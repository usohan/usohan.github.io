import { Connect } from '@/components/Connect';
import { HorizontalProjects } from '@/components/lab/HorizontalProjects';
import { PinnedHero } from '@/components/lab/PinnedHero';
import { SkillsStagger } from '@/components/lab/SkillsStagger';

export const metadata = {
  title: 'Sohan Gottipati — Lab',
};

export default function LabPage() {
  return (
    <>
      <PinnedHero />
      <main className="relative z-10 mx-3 mb-3 rounded-[20px] bg-[var(--bg)]">
        <HorizontalProjects />
        <SkillsStagger />
        <Connect />
      </main>
    </>
  );
}
