import { useEffect, useRef, useState } from 'react';
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

// Floating pill header — detached from the top edge with rounded corners.
// Glides up out of view on scroll-down and back down on scroll-up (always
// visible near the top of the page).
export default function Header({ profile }) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 80 || y < lastY.current) {
          setHidden(false); // near the top, or scrolling up
        } else if (y > lastY.current) {
          setHidden(true); // scrolling down
        }
        lastY.current = y;
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-3 top-3 z-40 transition-transform duration-300 ease-out sm:inset-x-6 sm:top-4 ${
        hidden ? '-translate-y-[150%]' : 'translate-y-0'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-2xl border border-softmint bg-mist/90 px-4 py-3 shadow-card backdrop-blur sm:px-6">
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
          {/* Hidden for now: Book Appointment pill
          <a href="#book" className="btn-pill !px-5 !py-2.5 sm:!px-6 sm:!py-3">
            <span className="hidden sm:inline">Book Appointment</span>
            <span className="sm:hidden">Book</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          */}
        </div>
      </div>
    </header>
  );
}
