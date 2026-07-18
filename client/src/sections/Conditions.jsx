import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { MotifIcon, ChevronDown } from '../components/Icons.jsx';

// Indices of the 5 highest-priority "broader internal medicine" conditions
// to surface on mobile before the user taps "View all".
const MOBILE_PRIORITY_INDICES = [0, 1, 2, 3, 9];

// Section 4 — Conditions Treated: "Areas of Care" icon-row pattern from the
// moodboard. Diabetes sub-areas lead; the broader internal-medicine list
// follows (the breadth is the differentiator).
export default function Conditions({ conditions }) {
  const [expanded, setExpanded] = useState(false);

  const allItems = conditions.broader.items;
  const priorityItems = MOBILE_PRIORITY_INDICES.map((i) => allItems[i]).filter(Boolean);
  const remainingItems = allItems.filter((_, i) => !MOBILE_PRIORITY_INDICES.includes(i));

  return (
    <section id="conditions" aria-labelledby="conditions-heading" className="bg-softmint/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal id="conditions-heading">
          <SectionHeading
            eyebrow="Areas of care"
            title="Conditions"
            accent="treated"
            intro={conditions.intro}
          />
        </Reveal>

        <Reveal>
          <h3 className="mb-5 text-center text-xs font-bold uppercase tracking-[0.22em] text-deepsage">
            {conditions.primary.title}
          </h3>
          <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {conditions.primary.items.map((item) => (
              <li key={item.name} className="card flex flex-col items-center gap-3 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-softmint">
                  <MotifIcon name={item.icon} className="h-6 w-6 text-deepsage" />
                </span>
                <span className="text-sm font-semibold leading-snug text-charcoal">{item.name}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-12">
          <h3 className="mb-5 text-center text-xs font-bold uppercase tracking-[0.22em] text-deepsage">
            {conditions.broader.title}
          </h3>

          {/* ── Desktop: show all items (unchanged) ── */}
          <ul className="hidden md:flex flex-wrap justify-center gap-3">
            {allItems.map((item) => (
              <li key={item.name} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-8px)]">
                <MotifIcon name={item.icon} className="h-5 w-5 shrink-0 text-deepsage" />
                <span className="text-sm font-medium leading-snug text-charcoal/85">{item.name}</span>
              </li>
            ))}
          </ul>

          {/* ── Mobile: 5 priority items + expandable remainder ── */}
          <div className="md:hidden">
            <ul className="flex flex-wrap justify-center gap-3">
              {priorityItems.map((item) => (
                <li key={item.name} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft w-full">
                  <MotifIcon name={item.icon} className="h-5 w-5 shrink-0 text-deepsage" />
                  <span className="text-sm font-medium leading-snug text-charcoal/85">{item.name}</span>
                </li>
              ))}
            </ul>

            {/* Expandable remaining items */}
            <div className={`conditions-expand ${expanded ? 'is-expanded' : ''}`}>
              <ul className="flex flex-wrap justify-center gap-3 mt-3">
                {remainingItems.map((item) => (
                  <li key={item.name} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft w-full">
                    <MotifIcon name={item.icon} className="h-5 w-5 shrink-0 text-deepsage" />
                    <span className="text-sm font-medium leading-snug text-charcoal/85">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Toggle link */}
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mx-auto mt-5 flex items-center gap-1.5 text-sm font-semibold text-deepsage transition-colors duration-200 hover:text-charcoal"
            >
              {expanded ? 'Show fewer' : 'View all conditions'}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
