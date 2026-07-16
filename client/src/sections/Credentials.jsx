import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { Check, BadgeCheck } from '../components/Icons.jsx';

// Section 3 — Qualifications & Credentials: one consolidated, scannable block
// (degrees + memberships + fellowships), per the blueprint's note not to
// fragment it.
export default function Credentials({ qualifications, memberships, fellowships }) {
  return (
    <section id="credentials" aria-labelledby="credentials-heading" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal id="credentials-heading">
          <SectionHeading
            eyebrow="Credentials"
            title="Qualifications &"
            accent="professional standing"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          <Reveal className="card">
            <h3 className="mb-4 font-heading text-2xl font-semibold text-charcoal">Degrees</h3>
            <ul className="space-y-4">
              {qualifications.degrees.map((deg) => (
                <li key={deg.title}>
                  <p className="font-bold text-deepsage">{deg.title}</p>
                  <p className="text-sm text-charcoal/70">{deg.detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="card">
            <h3 className="mb-4 font-heading text-2xl font-semibold text-charcoal">Memberships</h3>
            <ul className="space-y-3">
              {memberships.map((m) => (
                <li key={m.name} className="flex gap-2.5 text-sm leading-snug text-charcoal/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-deepsage" />
                  <span>
                    {m.name}
                    {m.role === 'Life Member' && (
                      <span className="ml-1.5 inline-block whitespace-nowrap rounded-full bg-softmint px-2 py-0.5 text-[11px] font-bold text-deepsage">
                        Life Member
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="card">
            <h3 className="mb-4 font-heading text-2xl font-semibold text-charcoal">Fellowships</h3>
            <ul className="space-y-4">
              {fellowships.map((f) => (
                <li key={f.name} className="flex gap-2.5">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-deepsage" />
                  <div>
                    <p className="text-sm font-bold text-charcoal">{f.name}</p>
                    <p className="text-sm text-charcoal/70">{f.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
