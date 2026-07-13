import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { HandHeart, Chat } from '../components/Icons.jsx';

// Section 2 — About / Bio: warm-clinical tone, philosophy of care, languages.
export default function About({ bio, profile }) {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <img
            src="/images/consultation-placeholder.svg"
            alt="Dr. Sravanthi J in consultation with a patient"
            width="640"
            height="420"
            loading="lazy"
            className="w-full rounded-[2.5rem] shadow-card"
          />
        </Reveal>
        <Reveal>
          <div id="about-heading">
            <SectionHeading
              align="left"
              eyebrow="About"
              title="A physician's breadth,"
              accent="a diabetologist's depth."
            />
          </div>
          <div className="space-y-4 text-base leading-relaxed text-charcoal/80">
            {bio.paragraphs.map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
          <blockquote className="mt-6 rounded-3xl bg-softmint/60 p-6">
            <Chat className="mb-3 h-6 w-6 text-deepsage" />
            <p className="font-heading text-xl italic leading-relaxed text-charcoal">{bio.philosophy}</p>
          </blockquote>
          <p className="mt-5 flex items-center gap-2 text-sm font-medium text-deepsage">
            <HandHeart className="h-5 w-5" /> {bio.languagesNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
