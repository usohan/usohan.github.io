const SPLINE_SCENE_URL = 'https://my.spline.design/metagestalt-3gjmL4CbfxBHjZel9x4bC5K9/';

export function Introduction() {
  return (
    <div
      id="about"
      className="relative m-3 flex min-h-[calc(100svh-24px)] flex-col justify-end overflow-hidden rounded-[20px] border border-white/35"
      style={{
        background: 'linear-gradient(180deg, var(--sky-a) 0%, var(--sky-b) 100%)',
        color: 'var(--sky-ink)',
      }}>
      <iframe src={SPLINE_SCENE_URL} title="About scene" className="absolute inset-0 h-full w-full border-0" loading="lazy" />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[55%]"
        style={{ background: 'linear-gradient(180deg, transparent 0%, var(--sky-b) 85%)', opacity: 0.55 }}
      />

      <div className="relative z-10 max-w-[720px] px-8 pb-14">
        <p className="mb-3.5 text-[13px] font-bold uppercase tracking-[0.1em] opacity-75">
          Computer Science · UC Riverside
        </p>
        <h1 className="mb-5 font-serif text-[clamp(36px,7vw,64px)] font-semibold leading-[1.05] tracking-[-0.01em]">
          Hi, I&rsquo;m Sohan Gottipati.
        </h1>
        <p className="max-w-[56ch] text-[17px] leading-relaxed opacity-90">
          Hello! My name is Sohan Gottipati and I am a current student at the University of
          California, Riverside majoring in Computer Science with Business Applications. Below
          you can check out some of my projects!
        </p>
      </div>
    </div>
  );
}
