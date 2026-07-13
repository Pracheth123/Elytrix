import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { MotifIcon, Clock } from '../components/Icons.jsx';

// Section 5 — Services & Consultation: fee and timings transparent up front
// (directory-trained patient expectation).
export default function Services({ services, profile }) {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal id="services-heading">
          <SectionHeading eyebrow="Services" title="Services &" accent="consultation" intro={services.intro} />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service) => (
            <Reveal key={service.title} className="card">
              <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-softmint">
                <MotifIcon name={service.icon} className="h-6 w-6 text-deepsage" />
              </span>
              <h3 className="mb-2 font-heading text-2xl font-semibold text-charcoal">{service.title}</h3>
              <p className="text-sm leading-relaxed text-charcoal/75">{service.description}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col items-center justify-center gap-2 rounded-3xl bg-softmint/60 p-5 text-center sm:flex-row sm:gap-6">
          <p className="flex items-center gap-2 text-sm font-semibold text-charcoal">
            <Clock className="h-5 w-5 text-deepsage" /> {profile.timings}
          </p>
          <p className="text-sm font-semibold text-charcoal">
            Consultation fee <span className="font-heading text-xl text-deepsage">{profile.consultationFee}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
