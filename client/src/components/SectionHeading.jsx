// Moodboard heading treatment: large Cormorant Garamond, charcoal with a key
// phrase in Deep Sage.
export default function SectionHeading({ eyebrow, title, accent, intro, align = 'center' }) {
  const alignCls = align === 'left' ? 'text-left' : 'text-center mx-auto';
  return (
    <div className={`max-w-2xl ${alignCls} mb-12`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-deepsage">{eyebrow}</p>
      )}
      <h2 className="font-heading text-4xl font-medium leading-tight text-charcoal sm:text-5xl">
        {title} {accent && <span className="text-deepsage italic">{accent}</span>}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-charcoal/75">{intro}</p>}
    </div>
  );
}
