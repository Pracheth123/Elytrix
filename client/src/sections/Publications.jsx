import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { BadgeCheck } from '../components/Icons.jsx';

// Section 8 — Publications, Research & Conferences: factual and dated only.
// Publication list is a client TODO; the current international fellowships
// carry the section until it arrives.
export default function Publications({ publications, fellowships }) {
  return (
    <section id="publications" aria-labelledby="publications-heading" className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal id="publications-heading">
          <SectionHeading eyebrow="Beyond the clinic" title="Publications, research &" accent="conferences" intro={publications.intro} />
        </Reveal>

        {publications.items.length > 0 ? (
          <ul className="space-y-4">
            {publications.items.map((pub) => (
              <Reveal as="li" key={pub.title} className="card">
                <p className="font-semibold text-charcoal">{pub.title}</p>
                <p className="text-sm text-charcoal/70">{pub.detail}</p>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal className="card text-center">
            <div className="mx-auto mb-4 flex max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
              {fellowships.map((f) => (
                <p key={f.name} className="flex items-center gap-2 rounded-2xl bg-softmint/60 px-4 py-3 text-left text-sm">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-deepsage" />
                  <span>
                    <span className="font-bold text-charcoal">{f.detail}</span>
                    <br />
                    <span className="text-charcoal/70">{f.name}</span>
                  </span>
                </p>
              ))}
            </div>
            <p className="text-sm text-charcoal/70">
              Details of publications and conference contributions will be listed here as they are compiled.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
