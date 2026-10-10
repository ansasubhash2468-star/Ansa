import { useEffect } from 'react';
import { CheckCircle2, PartyPopper, X } from 'lucide-react';

interface SuccessModalProps {
  studentName: string;
  eventName: string;
  onClose: () => void;
  onViewMyEvents: () => void;
}

export default function SuccessModal({ studentName, eventName, onClose, onViewMyEvents }: SuccessModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-fest-dark-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl glass-panel border border-fest-primary-500/20 p-8 text-center animate-bounce-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center text-fest-dark-300 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="inline-flex w-20 h-20 rounded-full bg-fest-success-500/15 items-center justify-center mb-5">
          <CheckCircle2 className="w-10 h-10 text-fest-success-400" strokeWidth={2} />
        </div>

        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <PartyPopper className="w-6 h-6 text-fest-primary-400" />
          <h3 className="font-display text-2xl tracking-wide text-white">You're In!</h3>
        </div>

        {/* Message */}
        <p className="text-fest-dark-200 text-sm sm:text-base mb-1">
          <span className="font-semibold text-fest-primary-400">{studentName}</span>, your registration for
        </p>
        <p className="font-display text-xl tracking-wide text-gradient-amber mb-6">
          {eventName}
        </p>
        <p className="text-fest-dark-300 text-sm mb-7">
          has been confirmed. Check your email for details. See you at the fest!
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onViewMyEvents}
            className="flex-1 py-3 rounded-xl bg-fest-primary-500 hover:bg-fest-primary-600 text-fest-dark-900 font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-fest-primary-500/30"
          >
            View My Events
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl glass-panel-light hover:bg-white/10 text-white font-semibold text-sm transition-all duration-300"
          >
            Browse More
          </button>
        </div>
      </div>
    </div>
  );
}
