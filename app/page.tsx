import { About } from '@/components/About';
import { Connect } from '@/components/Connect';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { SectionTab } from '@/components/SectionTab';

export default function Home() {
  return (
    <>
      <SectionTab />
      <Hero />
      <main className="mx-3 mb-3 rounded-[20px] bg-[var(--bg)]">
        <About />
        <Projects />
        <Connect />
      </main>
    </>
  );
}
