import { useState } from 'react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { submitAppointment } from '../api.js';
import { Phone, Chat, ArrowRight, Check } from '../components/Icons.jsx';

const inputCls =
  'w-full rounded-2xl border border-sagemist bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-deepsage focus:outline-none focus:ring-2 focus:ring-deepsage/30';

// Section 10 — Appointment / Booking: three channels side by side (WhatsApp,
// phone, inline form → POST /api/appointments), plus the "what happens after
// you book" note no peer offers.
export default function Booking({ booking, profile }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    consultationType: 'in-clinic',
    reason: ''
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    try {
      await submitAppointment(form);
      setStatus('success');
    } catch (err) {
      setErrorMsg(err.details?.[0]?.message || err.message);
      setStatus('error');
    }
  }

  return (
    <section id="book" aria-labelledby="book-heading" className="bg-softmint/40 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal id="book-heading">
          <SectionHeading eyebrow="Booking" title="Book an" accent="appointment" intro={booking.intro} />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
          {/* Channels: call + WhatsApp */}
          <Reveal className="space-y-4">
            <a href={profile.phone.href} className="card flex items-center gap-4 transition-shadow hover:shadow-card">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-softmint">
                <Phone className="h-6 w-6 text-deepsage" />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-wider text-deepsage">Call the clinic</span>
                <span className="block font-heading text-2xl font-semibold text-charcoal">{profile.phone.display}</span>
              </span>
            </a>
            <a
              href={profile.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="card flex items-center gap-4 transition-shadow hover:shadow-card"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-softmint">
                <Chat className="h-6 w-6 text-deepsage" />
              </span>
              <span>
                <span className="block text-xs font-bold uppercase tracking-wider text-deepsage">WhatsApp</span>
                <span className="block font-heading text-2xl font-semibold text-charcoal">{profile.whatsapp.display}</span>
              </span>
            </a>
            <div className="rounded-3xl border border-sagemist bg-white/70 p-6">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-deepsage">
                What happens after you book
              </h3>
              <ol className="space-y-2.5">
                {booking.afterBooking.map((step, i) => (
                  <li key={step} className="flex gap-3 text-sm leading-relaxed text-charcoal/80">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-deepsage text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          {/* Inline form */}
          <Reveal className="card !p-8">
            {status === 'success' ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center" role="status">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-softmint">
                  <Check className="h-8 w-8 text-deepsage" />
                </span>
                <h3 className="font-heading text-3xl font-semibold text-charcoal">Request received</h3>
                <p className="max-w-sm text-sm leading-relaxed text-charcoal/75">
                  Thank you, {form.name.split(' ')[0]}. {booking.afterBooking[0]}{' '}
                  {booking.afterBooking[1]}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="bk-name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-charcoal/70">
                      Full name *
                    </label>
                    <input id="bk-name" required value={form.name} onChange={update('name')} className={inputCls} autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="bk-phone" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-charcoal/70">
                      Phone *
                    </label>
                    <input id="bk-phone" required type="tel" value={form.phone} onChange={update('phone')} className={inputCls} autoComplete="tel" />
                  </div>
                  <div>
                    <label htmlFor="bk-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-charcoal/70">
                      Email
                    </label>
                    <input id="bk-email" type="email" value={form.email} onChange={update('email')} className={inputCls} autoComplete="email" />
                  </div>
                  <div>
                    <label htmlFor="bk-date" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-charcoal/70">
                      Preferred date
                    </label>
                    <input id="bk-date" type="date" value={form.preferredDate} onChange={update('preferredDate')} className={inputCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="bk-type" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-charcoal/70">
                      Consultation type
                    </label>
                    <select id="bk-type" value={form.consultationType} onChange={update('consultationType')} className={inputCls}>
                      <option value="in-clinic">In-clinic visit</option>
                      <option value="teleconsult">Teleconsultation</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="bk-reason" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-charcoal/70">
                      Reason for visit
                    </label>
                    <textarea id="bk-reason" rows="3" maxLength="500" value={form.reason} onChange={update('reason')} className={inputCls} />
                  </div>
                </div>

                {status === 'error' && (
                  <div role="alert" className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    <p className="font-semibold">{errorMsg}</p>
                    <p className="mt-1">
                      {booking.formErrorFallback}{' '}
                      <a href={profile.phone.href} className="font-bold underline">
                        {profile.phone.display}
                      </a>
                    </p>
                  </div>
                )}

                <button type="submit" disabled={status === 'submitting'} className="btn-pill mt-6 w-full disabled:cursor-wait disabled:opacity-70">
                  {status === 'submitting' ? 'Sending…' : 'Request appointment'} <ArrowRight className="h-4 w-4" />
                </button>
                <p className="mt-3 text-center text-xs text-charcoal/60">
                  Consultation fee {profile.consultationFee} · {profile.timings}
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
