import { Phone, Chat, Calendar } from './Icons.jsx';

// Fixed bottom action bar on mobile — Call / WhatsApp / Book, matching Indian
// peer behaviour for phone-first traffic.
export default function MobileActionBar({ profile }) {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-softmint bg-white/95 shadow-[0_-6px_20px_-12px_rgba(47,53,49,0.25)] backdrop-blur md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a href={profile.phone.href} className="flex flex-col items-center gap-1 py-2.5 text-deepsage">
        <Phone className="h-5 w-5" />
        <span className="text-[11px] font-bold uppercase tracking-wider">Call</span>
      </a>
      <a
        href={profile.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 border-l border-softmint py-2.5 text-deepsage"
      >
        <Chat className="h-5 w-5" />
        <span className="text-[11px] font-bold uppercase tracking-wider">WhatsApp</span>
      </a>
      {/* Hidden for now: Book button (restore grid-cols-3 and border-x on WhatsApp when re-enabling)
      <a href="#book" className="flex flex-col items-center gap-1 bg-deepsage py-2.5 text-white">
        <Calendar className="h-5 w-5" />
        <span className="text-[11px] font-bold uppercase tracking-wider">Book</span>
      </a>
      */}
    </nav>
  );
}
