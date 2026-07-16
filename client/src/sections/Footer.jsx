import { HeartPulse } from '../components/Icons.jsx';

// Section 13 — Footer: quick links, medical disclaimer, copyright. The
// registration line repeats here once the council number is supplied
// (Section 3a remains its primary home).
export default function Footer({ footer, profile }) {
  const showRegRepeat = !String(footer.registrationNote).startsWith('TODO');
  // Hidden for now: the #book quick link is filtered out while the booking
  // section is disabled. Remove the filter to restore it.
  const links = footer.links.filter((link) => link.href !== '#book');
  return (
    <footer className="bg-charcoal pb-24 pt-14 text-white md:pb-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <p className="font-heading text-3xl font-semibold">{profile.name}</p>
            <p className="mt-1 text-sm text-white/70">
              {profile.designation} — {profile.specialization}
            </p>
            <p className="mt-1 text-sm text-white/70">{profile.organisation}</p>
            {showRegRepeat && <p className="mt-2 text-xs text-white/60">{footer.registrationNote}</p>}
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/75 transition-colors hover:text-sagemist">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div aria-hidden="true" className="my-8 flex items-center gap-3 text-white/25">
          <span className="h-px flex-1 bg-white/15" />
          <HeartPulse className="h-5 w-5" />
          <span className="h-px flex-1 bg-white/15" />
        </div>

        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-white/60">{footer.disclaimer}</p>
        <p className="mt-4 text-center text-xs text-white/45">
          © {new Date().getFullYear()} {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
