import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { Leaf } from '../components/Icons.jsx';

// Section 7 — Patient Education / Resources: curated topic cards. Articles are
// client-supplied TODOs, so cards show a "coming soon" state rather than
// fabricated content.
export default function Resources({ resources }) {
  return (
    <section id="resources" aria-labelledby="resources-heading" className="bg-softmint/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal id="resources-heading">
          <SectionHeading eyebrow="Patient education" title="Understand your" accent="health, simply." intro={resources.intro} />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.items.map((item) => (
            <Reveal key={item.title} as="article" className="card flex flex-col">
              <Leaf className="mb-3 h-6 w-6 text-eucalyptus" />
              <h3 className="mb-2 font-heading text-2xl font-semibold text-charcoal">{item.title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-charcoal/75">{item.blurb}</p>
              <p className="mt-4 inline-block self-start rounded-full bg-surface2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-deepsage">
                Guide coming soon
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
