// Hand-drawn flowing divider line with a heart-pulse motif (moodboard divider
// style, adapted from pediatric doodles to a pulse line).
export default function Divider({ className = '' }) {
  return (
    <div className={`flex justify-center py-2 ${className}`} aria-hidden="true">
      <svg viewBox="0 0 320 24" className="h-6 w-72 text-sagemist" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14c30-10 52 8 82 0 18-5 26-5 40-1l10 3 8-8 7 14 6-18 5 12 4-4 9 2c16 4 26 3 44-2 30-8 52 10 97 2" />
      </svg>
    </div>
  );
}
