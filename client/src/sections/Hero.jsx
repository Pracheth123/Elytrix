import Reveal from '../components/Reveal.jsx';
import { ArrowRight, Stethoscope, Droplet, Leaf, ExternalLink } from '../components/Icons.jsx';

// Section 1 — Hero: name, credentials, positioning, CTA, headshot.
export default function Hero({ hero, profile }) {
  // Hidden for now: consultation-fee stat filtered out of the data-driven stat
  // cards (applies to both fallback and API content). Remove the filter to restore.
  const stats = hero.stats.filter((stat) => !/fee/i.test(stat.label));

  return (
    <section id="top" aria-label="Introduction" className="relative overflow-hidden">
      {/* Organic blob gradients (moodboard texture language) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-softmint blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-sagemist/60 blur-3xl" />
        {/* Sparse low-opacity line-art motifs (adult-medicine replacements for pediatric doodles) */}
        <Stethoscope className="absolute left-[6%] top-24 hidden h-16 w-16 text-sagemist lg:block" />
        <Droplet className="absolute right-[8%] top-16 hidden h-10 w-10 text-eucalyptus/60 lg:block" />
        <Leaf className="absolute bottom-16 left-[12%] hidden h-12 w-12 text-sagemist md:block" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-[1.15fr,0.85fr] lg:pb-24 lg:pt-20">
        <Reveal>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-deepsage">{hero.eyebrow}</p>
          <h1 className="font-heading text-5xl font-medium leading-[1.08] text-charcoal sm:text-6xl lg:text-7xl">
            {hero.headlinePlain} <span className="italic text-deepsage">{hero.headlineAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/75">{hero.subline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {/* Hidden for now: Book Appointment CTA
            <a href="#book" className="btn-pill">
              {hero.primaryCta} <ArrowRight className="h-4 w-4" />
            </a>
            */}
            <a href="#conditions" className="btn-pill-outline">
              {hero.secondaryCta}
            </a>
          </div>

          <dl className={`mt-10 grid max-w-xl gap-4 ${stats.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/70 p-4 shadow-soft">
                <dt className="order-2 mt-1 block text-xs leading-snug text-charcoal/65">
                  {stat.href ? (
                    <a
                      href={stat.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-sagemist underline-offset-2 hover:text-deepsage"
                    >
                      {stat.label} <ExternalLink className="inline h-3 w-3" />
                    </a>
                  ) : (
                    stat.label
                  )}
                </dt>
                <dd className="font-heading text-3xl font-semibold text-deepsage">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div aria-hidden="true" className="absolute -inset-6 rounded-[3rem] bg-sage-gradient opacity-20 blur-2xl" />
          <img
            src={profile.headshot.src}
            alt={profile.headshot.alt}
            width="480"
            height="560"
            loading="eager"
            className="relative w-full rounded-[2.5rem] shadow-card"
          />
          <div className="relative -mt-10 ml-6 mr-2 rounded-3xl bg-white p-5 shadow-card sm:ml-10">
            <p className="font-heading text-2xl font-semibold text-charcoal">{profile.name}</p>
            <p className="text-sm font-medium text-deepsage">{profile.qualificationString}</p>
            <p className="mt-1 text-sm text-charcoal/70">
              {profile.designation} · {profile.organisation}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
