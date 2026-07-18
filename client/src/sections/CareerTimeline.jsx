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
          {steps.map((step, i) => {
            const hasCurrentBranch = step.branches?.some((b) => b.current);
            const isCurrent = step.current || hasCurrentBranch;
            const stageText = step.branches ? step.stage : (step.current ? 'Present' : step.stage);

            return (
              <Reveal as="li" key={`${step.title}-${i}`} className="relative pb-10 pl-8 last:pb-0 sm:pl-10">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[11px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    isCurrent ? 'border-deepsage bg-deepsage' : 'border-eucalyptus bg-white'
                  }`}
                >
                  {isCurrent && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-deepsage">
                  {stageText}
                  {!isCurrent && i === 0 && ' · where it began'}
                </p>
                <h3 className="mt-1 font-heading text-2xl font-semibold text-charcoal">{step.title}</h3>
                
                {step.branches ? (
                  <div className="relative mt-6 border-l-2 border-sagemist/60 pl-6 ml-[3px] space-y-6">
                    {step.branches.map((branch, j) => (
                      <div key={`${branch.org}-${j}`} className="relative">
                        {/* Sub-branch dot connector */}
                        <span
                          aria-hidden="true"
                          className={`absolute left-[-30px] top-[7px] flex h-3 w-3 items-center justify-center rounded-full border-2 ${
                            branch.current ? 'border-deepsage bg-deepsage' : 'border-eucalyptus bg-white'
                          }`}
                        >
                          {branch.current && <span className="h-1 w-1 rounded-full bg-white" />}
                        </span>
                        
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                          <h4 className={`text-base font-semibold ${branch.current ? 'text-deepsage font-bold' : 'text-charcoal font-medium'}`}>
                            {branch.org}
                          </h4>
                          {branch.role && (
                            <span className="text-xs italic text-charcoal/60">
                              {branch.role}
                            </span>
                          )}
                        </div>

                        {branch.current && (
                          <span className="mt-1.5 inline-block rounded-full bg-softmint px-2.5 py-0.5 text-[10px] font-bold text-deepsage">
                            Current practice
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {step.org && <p className="text-sm text-charcoal/70">{step.org}</p>}
                    {step.current && (
                      <p className="mt-2 inline-block rounded-full bg-softmint px-3 py-1 text-xs font-bold text-deepsage">
                        Current practice
                      </p>
                    )}
                  </>
                )}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
