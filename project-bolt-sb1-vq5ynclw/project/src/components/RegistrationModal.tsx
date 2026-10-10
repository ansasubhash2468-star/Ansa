import { useEffect, useState } from 'react';
import { X, User, Mail, Phone, Calendar, MapPin, Loader2, AlertCircle } from 'lucide-react';
import type { EventItem, FormErrors } from '@/types';
import { supabase } from '@/lib/supabase';

interface RegistrationModalProps {
  event: EventItem;
  onClose: () => void;
  onSuccess: (studentName: string, eventName: string) => void;
}

export default function RegistrationModal({ event, onClose, onSuccess }: RegistrationModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    // Name: at least 2 characters, letters and spaces only
    const nameTrim = name.trim();
    if (!nameTrim) {
      newErrors.name = 'Name is required';
    } else if (nameTrim.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s']+$/.test(nameTrim)) {
      newErrors.name = 'Name can only contain letters, spaces, and apostrophes';
    }

    // Email: standard email format
    const emailTrim = email.trim();
    if (!emailTrim) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrim)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone: 10 digits (Indian format), allow +91 prefix
    const phoneClean = phone.replace(/[\s-]/g, '');
    if (!phoneClean) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?91?\d{10}$/.test(phoneClean.replace(/^0/, ''))) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const { error: regError } = await supabase.from('registrations').insert({
        event_id: event.id,
        student_name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      if (regError) throw regError;

      const { data: eventData, error: fetchErr } = await supabase
        .from('events')
        .select('registered_seats')
        .eq('id', event.id)
        .maybeSingle();
      if (fetchErr || !eventData) throw new Error('Failed to update seat count');

      const { error: updateErr } = await supabase
        .from('events')
        .update({ registered_seats: eventData.registered_seats + 1 })
        .eq('id', event.id);
      if (updateErr) throw updateErr;

      onSuccess(name.trim(), event.name);
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      setSubmitError(
        msg.includes('duplicate')
          ? 'You have already registered for this event with this email.'
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const seatsLeft = event.total_seats - event.registered_seats;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-fest-dark-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl glass-panel border border-white/10 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-fest-dark-300 hover:text-white hover:bg-white/10 transition-all z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Event info header */}
        <div className="p-6 border-b border-white/5">
          <span className="text-xs font-mono uppercase tracking-widest text-fest-primary-400 mb-2 block">
            Registering for
          </span>
          <h3 className="font-display text-2xl tracking-wide text-white mb-3">{event.name}</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-fest-dark-300">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {event.venue}
            </span>
            <span className="text-fest-primary-400 font-semibold">
              {seatsLeft} seats left
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
          {/* Name */}
          <div>
            <label htmlFor="reg-name" className="block text-sm font-medium text-fest-dark-100 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-fest-dark-400 pointer-events-none" />
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="e.g. Aarav Sharma"
                className={`w-full pl-11 pr-4 py-3 rounded-xl bg-fest-dark-800 border text-white placeholder:text-fest-dark-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? 'border-fest-error-500 focus:ring-fest-error-500/20'
                    : 'border-white/10 focus:border-fest-primary-500/50 focus:ring-fest-primary-500/20'
                }`}
                autoComplete="name"
              />
            </div>
            {errors.name && (
              <p className="mt-1.5 text-xs text-fest-error-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="reg-email" className="block text-sm font-medium text-fest-dark-100 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-fest-dark-400 pointer-events-none" />
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                placeholder="e.g. aarav.sharma@college.edu"
                className={`w-full pl-11 pr-4 py-3 rounded-xl bg-fest-dark-800 border text-white placeholder:text-fest-dark-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.email
                    ? 'border-fest-error-500 focus:ring-fest-error-500/20'
                    : 'border-white/10 focus:border-fest-primary-500/50 focus:ring-fest-primary-500/20'
                }`}
                autoComplete="email"
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-fest-error-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="reg-phone" className="block text-sm font-medium text-fest-dark-100 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-fest-dark-400 pointer-events-none" />
              <input
                id="reg-phone"
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
                placeholder="e.g. 98765 43210"
                className={`w-full pl-11 pr-4 py-3 rounded-xl bg-fest-dark-800 border text-white placeholder:text-fest-dark-400 text-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.phone
                    ? 'border-fest-error-500 focus:ring-fest-error-500/20'
                    : 'border-white/10 focus:border-fest-primary-500/50 focus:ring-fest-primary-500/20'
                }`}
                autoComplete="tel"
              />
            </div>
            {errors.phone && (
              <p className="mt-1.5 text-xs text-fest-error-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Submit error */}
          {submitError && (
            <div className="px-4 py-3 rounded-xl bg-fest-error-500/10 border border-fest-error-500/30 text-fest-error-400 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {submitError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-fest-primary-500 hover:bg-fest-primary-600 text-fest-dark-900 font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-fest-primary-500/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
                Registering...
              </>
            ) : (
              'Confirm Registration'
            )}
          </button>

          <p className="text-center text-xs text-fest-dark-400">
            By registering, you agree to follow fest guidelines and attend on time.
          </p>
        </form>
      </div>
    </div>
  );
}
