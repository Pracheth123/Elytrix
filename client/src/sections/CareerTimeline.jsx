import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';

// Section 6 — Experience & Career Roadmap: vertical visual timeline
// (education → residency → hospital roles → present). No peer does this —
// blueprint differentiator.
export default function CareerTimeline({ careerTimeline, profile }) {
  const steps = careerTimeline.steps;
  return (
    <section id="experience" aria-labelledby="experience-heading" className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal id="experience-heading">
          <SectionHeading
            eyebrow={`${profile.experienceYears} years in practice`}
            title="Experience &"
            accent="career roadmap"
            intro={careerTimeline.intro}
          />
        </Reveal>

        <ol className="relative ml-4 border-l-2 border-sagemist sm:ml-8">
          {steps.map((step, i) => (
            <Reveal as="li" key={`${step.title}-${step.org}`} className="relative pb-10 pl-8 last:pb-0 sm:pl-10">
              <span
                aria-hidden="true"
                className={`absolute -left-[11px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  step.current ? 'border-deepsage bg-deepsage' : 'border-eucalyptus bg-white'
                }`}
              >
                {step.current && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-deepsage">
                {step.current ? 'Present' : step.stage}
                {!step.current && i === 0 && ' · where it began'}
              </p>
              <h3 className="mt-1 font-heading text-2xl font-semibold text-charcoal">{step.title}</h3>
              {step.org && <p className="text-sm text-charcoal/70">{step.org}</p>}
              {step.current && (
                <p className="mt-2 inline-block rounded-full bg-softmint px-3 py-1 text-xs font-bold text-deepsage">
                  Current practice
                </p>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
