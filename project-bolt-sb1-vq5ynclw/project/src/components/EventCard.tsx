import { Calendar, Clock, MapPin, Users, Timer, Radio } from 'lucide-react';
import type { EventItem } from '@/types';
import { useEventCountdown } from '@/hooks/useEventCountdown';

interface EventCardProps {
  event: EventItem;
  onRegister: (event: EventItem) => void;
}

// Category color mapping
const CATEGORY_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  Music: { bg: 'bg-fest-primary-500/15', text: 'text-fest-primary-400', border: 'border-fest-primary-500/30' },
  Dance: { bg: 'bg-fest-accent-500/15', text: 'text-fest-accent-400', border: 'border-fest-accent-500/30' },
  Tech: { bg: 'bg-fest-secondary-500/15', text: 'text-fest-secondary-400', border: 'border-fest-secondary-500/30' },
  Drama: { bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/30' },
  Art: { bg: 'bg-fest-warning-500/15', text: 'text-fest-warning-400', border: 'border-fest-warning-500/30' },
  Sports: { bg: 'bg-fest-success-500/15', text: 'text-fest-success-400', border: 'border-fest-success-500/30' },
  Quiz: { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30' },
  Literature: { bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/30' },
};

export default function EventCard({ event, onRegister }: EventCardProps) {
  const seatsLeft = event.total_seats - event.registered_seats;
  const isFull = seatsLeft <= 0;
  const seatsPercent = Math.round((event.registered_seats / event.total_seats) * 100);
  const catStyle = CATEGORY_STYLES[event.category] ?? CATEGORY_STYLES['Music'];
  const countdown = useEventCountdown(event.date, event.time);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <article className="card-tilt group relative rounded-2xl overflow-hidden glass-panel border border-white/5 hover:border-fest-primary-500/30 transition-all duration-400">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {event.image_url ? (
          <img
            src={event.image_url}
            alt={event.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-fest-dark-700 to-fest-dark-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-fest-dark-900 via-fest-dark-900/40 to-transparent" />

        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${catStyle.bg} ${catStyle.text} ${catStyle.border}`}
        >
          {event.category}
        </span>

        {/* Full badge */}
        {isFull && (
          <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-fest-error-500 text-white shadow-lg animate-glow-pulse">
            FULL
          </span>
        )}

        {/* Seats left overlay */}
        {!isFull && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fest-dark-950/80 backdrop-blur-sm">
            <Users className="w-3.5 h-3.5 text-fest-primary-400" />
            <span className="text-xs font-semibold text-fest-primary-400">{seatsLeft} left</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl tracking-wide text-white mb-2 group-hover:text-fest-primary-400 transition-colors duration-300">
          {event.name}
        </h3>
        <p className="text-sm text-fest-dark-300 mb-4 line-clamp-2 leading-relaxed">
          {event.description}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-xs text-fest-dark-200">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-fest-dark-400" />
            {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-fest-dark-400" />
            {event.time}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-fest-dark-400" />
            {event.venue}
          </span>
        </div>

        {/* Per-event countdown timer */}
        {countdown.isPast ? (
          <div className="mb-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-fest-dark-700/50 text-fest-dark-400 text-xs font-medium">
            <Clock className="w-3.5 h-3.5" />
            Event has ended
          </div>
        ) : countdown.isLive ? (
          <div className="mb-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-fest-error-500/15 border border-fest-error-500/30 text-fest-error-400 text-xs font-bold uppercase tracking-wider animate-glow-pulse">
            <Radio className="w-3.5 h-3.5" />
            Live Now
          </div>
        ) : (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Timer className="w-3.5 h-3.5 text-fest-accent-400" />
              <span className="text-xs font-medium text-fest-dark-300">Starts in</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { label: 'D', value: countdown.days },
                { label: 'H', value: countdown.hours },
                { label: 'M', value: countdown.minutes },
                { label: 'S', value: countdown.seconds },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="rounded-lg bg-fest-dark-800 border border-white/5 py-1.5 text-center"
                >
                  <div className="font-display text-lg text-gradient-amber tabular-nums leading-none">
                    {String(unit.value).padStart(2, '0')}
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-fest-dark-400 mt-0.5">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seat progress bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-fest-dark-300">Seats filled</span>
            <span className={`font-semibold ${isFull ? 'text-fest-error-400' : 'text-fest-dark-100'}`}>
              {event.registered_seats}/{event.total_seats}
            </span>
          </div>
          <div className="h-2 rounded-full bg-fest-dark-700 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFull
                  ? 'bg-fest-error-500'
                  : seatsPercent > 80
                  ? 'bg-fest-warning-500'
                  : 'bg-gradient-to-r from-fest-primary-500 to-fest-accent-500'
              }`}
              style={{ width: `${seatsPercent}%` }}
            />
          </div>
        </div>

        {/* Register button */}
        <button
          onClick={() => onRegister(event)}
          disabled={isFull}
          className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
            isFull
              ? 'bg-fest-dark-700 text-fest-dark-400 cursor-not-allowed'
              : 'bg-fest-primary-500 hover:bg-fest-primary-600 text-fest-dark-900 hover:shadow-lg hover:shadow-fest-primary-500/30 hover:-translate-y-0.5'
          }`}
        >
          {isFull ? (
            'Sold Out'
          ) : (
            <>
              Register Now
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden glass-panel border border-white/5 animate-pulse">
      <div className="h-48 bg-fest-dark-700" />
      <div className="p-5 space-y-3">
        <div className="h-6 w-3/4 bg-fest-dark-700 rounded" />
        <div className="h-4 w-full bg-fest-dark-700 rounded" />
        <div className="h-2 w-full bg-fest-dark-700 rounded-full" />
        <div className="h-10 w-full bg-fest-dark-700 rounded-xl" />
      </div>
    </div>
  );
}

