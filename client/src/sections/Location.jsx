import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { MapPin, Clock, Phone, Chat, ExternalLink } from '../components/Icons.jsx';

// Section 11 — Clinic Location & Contact: address, map embed, timings, channels.
export default function Location({ clinic, profile }) {
  return (
    <section id="location" aria-labelledby="location-heading" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal id="location-heading">
          <SectionHeading eyebrow="Visit" title="Clinic location &" accent="contact" />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="space-y-5">
            <div className="card flex gap-4">
              <MapPin className="mt-1 h-6 w-6 shrink-0 text-deepsage" />
              <div>
                <h3 className="font-heading text-2xl font-semibold text-charcoal">{clinic.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-charcoal/75">
                  {clinic.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <a
                  href={clinic.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-deepsage underline underline-offset-2"
                >
                  Get directions <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <div className="card flex items-center gap-4">
              <Clock className="h-6 w-6 shrink-0 text-deepsage" />
              <p className="text-sm font-semibold text-charcoal">{clinic.timings}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <a href={profile.phone.href} className="card flex items-center gap-3 !p-4">
                <Phone className="h-5 w-5 shrink-0 text-deepsage" />
                <span className="text-sm font-semibold text-charcoal">{profile.phone.display}</span>
              </a>
              <a href={profile.whatsapp.href} target="_blank" rel="noopener noreferrer" className="card flex items-center gap-3 !p-4">
                <Chat className="h-5 w-5 shrink-0 text-deepsage" />
                <span className="text-sm font-semibold text-charcoal">{profile.whatsapp.display}</span>
              </a>
            </div>
          </Reveal>

          <Reveal>
            <iframe
              title={`Map — ${clinic.name}, HITEC City, Hyderabad`}
              src={clinic.mapEmbedSrc}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full rounded-[2rem] border border-sagemist shadow-soft lg:h-full lg:min-h-[22rem]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
