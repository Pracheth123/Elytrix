import Reveal from '../components/Reveal.jsx';
import { BadgeCheck } from '../components/Icons.jsx';

// Section 3a — Medical License / Board Registration: standalone trust badge.
// Registration number is a client-supplied TODO (not on the Medicover profile);
// the badge renders the council name with a clear "being updated" note until
// the real number is seeded.
export default function Registration({ registration }) {
  const pending = String(registration.number).startsWith('TODO');
  return (
    <section id="registration" aria-labelledby="registration-heading" className="pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="flex flex-col items-center gap-4 rounded-[2rem] border border-sagemist bg-softmint/50 p-7 text-center sm:flex-row sm:text-left">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-soft">
            <BadgeCheck className="h-8 w-8 text-deepsage" />
          </span>
          <div>
            <h2 id="registration-heading" className="font-heading text-2xl font-semibold text-charcoal">
              Registered medical practitioner
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-charcoal/75">
              {registration.council}
              {pending ? (
                <> — Reg. No. and year: <em>{registration.note}</em></>
              ) : (
                <> · Reg. No. {registration.number} ({registration.year})</>
              )}
            </p>
            {registration.verifyUrl && (
              <a
                href={registration.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm font-semibold text-deepsage underline underline-offset-2"
              >
                Verify on the council register
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
