import Reveal from '../components/Reveal.jsx';
import { ExternalLink } from '../components/Icons.jsx';

// Section 9 — Testimonials / Patient Voices: NMC-compliant pattern — no
// self-published testimonials; link out to the third-party Medicover profile.
export default function Reviews({ reviews }) {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-sage-gradient p-10 text-center text-white sm:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <h2 id="reviews-heading" className="font-heading text-4xl font-medium sm:text-5xl">
            Rated <span className="font-semibold">{reviews.percent}%</span> by {reviews.count} patients
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90">{reviews.body}</p>
          <a
            href={reviews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-deepsage shadow-pill transition-colors hover:bg-mist"
          >
            {reviews.ctaLabel} <ExternalLink className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
