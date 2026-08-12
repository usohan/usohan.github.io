import { Connect } from '@/components/Connect';
import { HorizontalProjects } from '@/components/lab/HorizontalProjects';
import { PinnedHero } from '@/components/lab/PinnedHero';
import { SkillsStagger } from '@/components/lab/SkillsStagger';
import { SectionTab } from '@/components/SectionTab';

export default function Home() {
  return (
    <>
      <SectionTab />
      <PinnedHero />
      <main className="relative z-10 mx-3 mb-3 rounded-[20px] bg-[var(--bg)]">
        <HorizontalProjects />
        <SkillsStagger />
        <Connect />
      </main>
    </>
  );
}
