import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { ChevronDown } from '../components/Icons.jsx';

// Section 12 — FAQ: keyboard-navigable disclosure accordion (native buttons,
// aria-expanded + region), mixing logistics with claim-safe condition answers.
export default function Faq({ faqs }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-softmint/40 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal id="faq-heading">
          <SectionHeading eyebrow="FAQ" title="Common" accent="questions" />
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} className="overflow-hidden rounded-2xl bg-white shadow-soft">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-charcoal transition-colors hover:text-deepsage focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-deepsage"
                  >
                    {faq.q}
                    <ChevronDown className={`h-5 w-5 shrink-0 text-deepsage transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  hidden={!isOpen}
                  className="px-6 pb-5 text-sm leading-relaxed text-charcoal/75"
                >
                  {faq.a}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
