import { Phone, Chat, ArrowRight } from './Icons.jsx';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Conditions', href: '#conditions' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Resources', href: '#resources' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#location' }
];

// Sticky header — phone + WhatsApp always visible, green Book pill on the
// right (moodboard header pattern).
export default function Header({ profile }) {
  return (
    <header className="sticky top-0 z-40 border-b border-softmint bg-mist/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#top" className="min-w-0">
          <span className="block truncate font-heading text-xl font-semibold text-charcoal sm:text-2xl">
            {profile.name}
          </span>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-deepsage sm:block">
            {profile.specialization}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm font-medium text-charcoal/75 transition-colors hover:text-deepsage">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={profile.phone.href}
            className="flex items-center gap-2 rounded-full p-2 text-deepsage transition-colors hover:bg-softmint sm:px-3"
            aria-label={`Call ${profile.phone.display}`}
          >
            <Phone className="h-5 w-5" />
            <span className="hidden text-sm font-semibold xl:inline">{profile.phone.display}</span>
          </a>
          <a
            href={profile.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-deepsage transition-colors hover:bg-softmint"
            aria-label={`WhatsApp ${profile.whatsapp.display}`}
          >
            <Chat className="h-5 w-5" />
          </a>
          <a href="#book" className="btn-pill !px-5 !py-2.5 sm:!px-6 sm:!py-3">
            <span className="hidden sm:inline">Book Appointment</span>
            <span className="sm:hidden">Book</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
