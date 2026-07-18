import { useRef, useState, useEffect, useCallback } from 'react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { Leaf } from '../components/Icons.jsx';

export default function Resources({ resources }) {
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

  // Track scroll position to update active card index
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.firstElementChild?.offsetWidth || 1;
    const gap = 16; // gap-4 = 1rem = 16px
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, resources.items.length - 1));
  }, [resources.items.length]);

  // Smooth scroll to card index
  const scrollToIndex = useCallback((index) => {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild?.offsetWidth || 1;
    const gap = 16;
    container.scrollTo({ left: index * (cardWidth + gap), behavior: 'smooth' });
  }, []);

  return (
    <section id="resources" aria-labelledby="resources-heading" className="bg-softmint/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal id="resources-heading">
          <SectionHeading eyebrow="Patient education" title="Understand your" accent="health, simply." intro={resources.intro} />
        </Reveal>

        {/* ── Desktop: original 3-column grid layout ── */}
        {!isMobile && (
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
        )}

        {/* ── Mobile: horizontal swipeable carousel ── */}
        {isMobile && (
          <div>
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory -mx-4 px-4"
            >
              {resources.items.map((item) => (
                <div
                  key={item.title}
                  className="card flex-shrink-0 snap-center flex flex-col !p-6"
                  style={{ width: '85vw' }}
                >
                  <Leaf className="mb-3 h-6 w-6 text-eucalyptus shrink-0" />
                  <h3 className="mb-2 font-heading text-2xl font-semibold leading-tight text-charcoal">{item.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-charcoal/75">{item.blurb}</p>
                  <p className="mt-4 inline-block self-start rounded-full bg-surface2 px-3 py-1 text-xs font-bold uppercase tracking-wider text-deepsage">
                    Guide coming soon
                  </p>
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label="Education guides">
              {resources.items.map((item, idx) => (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`Go to guide ${idx + 1}`}
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
      </div>
    </section>
  );
}
