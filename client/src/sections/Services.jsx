import { useRef, useState, useEffect, useCallback } from 'react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { MotifIcon, Clock } from '../components/Icons.jsx';

// Section 5 — Services & Consultation: fee and timings transparent up front
// (directory-trained patient expectation).
// Hidden for now: strip consultation-fee mentions from the data-driven copy
// (covers both the fallback JSON and the API payload). Delete stripFee and its
// call sites to restore the original text.
const stripFee = (text = '') =>
  text
    .replace(/Consultation fee\s*₹?[\d,]+,?\s*/gi, '')
    .replace(/the fee,\s*/i, '');

export default function Services({ services, profile }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Track viewport width to toggle between carousel (mobile) and grid (desktop)
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    handler(mql); // set initial value
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Track scroll position to update the active dot indicator
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.firstElementChild?.offsetWidth || 1;
    const gap = 16; // gap-4 = 1rem = 16px
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, services.items.length - 1));
  }, [services.items.length]);

  // Scroll to a specific card when a dot is tapped
  const scrollToIndex = useCallback((index) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild?.offsetWidth || 1;
    const gap = 16;
    container.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
  }, []);

  return (
    <section id="services" aria-labelledby="services-heading" className="py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal id="services-heading">
          <SectionHeading eyebrow="Services" title="Services &" accent="consultation" intro={stripFee(services.intro)} />
        </Reveal>

        {/* ── Desktop: original grid layout (unchanged) ── */}
        {!isMobile && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.items.map((service) => (
              <Reveal key={service.title} className="card">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-softmint">
                  <MotifIcon name={service.icon} className="h-6 w-6 text-deepsage" />
                </span>
                <h3 className="mb-2 font-heading text-2xl font-semibold text-charcoal">{service.title}</h3>
                <p className="text-sm leading-relaxed text-charcoal/75">{stripFee(service.description)}</p>
              </Reveal>
            ))}
          </div>
        )}

        {/* ── Mobile: horizontal swipeable carousel ── */}
        {isMobile && (
          <div>
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory -mx-4 px-4"
            >
              {services.items.map((service) => (
                <div
                  key={service.title}
                  className="card flex-shrink-0 snap-center"
                  style={{ width: '85vw' }}
                >
                  <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-softmint">
                    <MotifIcon name={service.icon} className="h-6 w-6 text-deepsage" />
                  </span>
                  <h3 className="mb-2 font-heading text-2xl font-semibold text-charcoal">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-charcoal/75">{stripFee(service.description)}</p>
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label="Service cards">
              {services.items.map((service, idx) => (
                <button
                  key={service.title}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`Go to ${service.title}`}
                  onClick={() => scrollToIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? 'w-6 bg-deepsage'
                      : 'w-2 bg-sagemist hover:bg-eucalyptus'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <Reveal className="mt-8 flex flex-col items-center justify-center gap-2 rounded-3xl bg-softmint/60 p-5 text-center sm:flex-row sm:gap-6">
          <p className="flex items-center gap-2 text-sm font-semibold text-charcoal">
            <Clock className="h-5 w-5 text-deepsage" /> {profile.timings}
          </p>
          {/* Hidden for now: consultation fee
          <p className="text-sm font-semibold text-charcoal">
            Consultation fee <span className="font-heading text-xl text-deepsage">{profile.consultationFee}</span>
          </p>
          */}
        </Reveal>
      </div>
    </section>
  );
}
