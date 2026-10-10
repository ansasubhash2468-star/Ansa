import { useEffect, useState } from 'react';
import { Calendar, MapPin, Sparkles, ChevronDown } from 'lucide-react';

interface HeroProps {
  onBrowse: () => void;
}

const FEST_DATE = new Date('2026-10-15T09:00:00').getTime();

function getTimeRemaining(target: number) {
  const now = Date.now();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds, done: diff === 0 };
}

export default function Hero({ onBrowse }: HeroProps) {
  const [time, setTime] = useState(getTimeRemaining(FEST_DATE));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeRemaining(FEST_DATE)), 1000);
    return () => clearInterval(interval);
  }, []);

  const countdownUnits = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay pt-16">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/13230484/pexels-photo-13230484.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Fest crowd"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-fest-dark-950/60 via-fest-dark-950/80 to-fest-dark-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-fest-dark-950/80 via-transparent to-fest-dark-950/80" />
      </div>

      {/* Floating shapes */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-fest-primary-500/10 blur-3xl animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-fest-accent-600/10 blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-light mb-6 animate-slide-up">
          <Sparkles className="w-4 h-4 text-fest-primary-400" />
          <span className="text-xs sm:text-sm font-medium tracking-wider text-fest-dark-100 uppercase">
            October 15–17, 2026 · Campus Main Ground
          </span>
        </div>

        {/* Title */}
        <h1
          className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] leading-none tracking-wider mb-4 animate-netflix-zoom"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          <span className="text-gradient-amber">VERVE</span>
          <span className="text-fest-accent-500"> 26</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-fest-dark-100 font-medium mb-2 animate-slide-up"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          Three Days. Eight Events. One Unforgettable Fest.
        </p>
        <p
          className="text-sm sm:text-base text-fest-dark-300 max-w-2xl mx-auto mb-10 animate-slide-up"
          style={{ animationDelay: '0.5s', opacity: 0 }}
        >
          The biggest campus celebration of the year. Browse events, claim your spot, and be part of the energy.
        </p>

        {/* Countdown */}
        {!time.done && (
          <div
            className="flex items-center justify-center gap-3 sm:gap-6 mb-10 animate-slide-up"
            style={{ animationDelay: '0.6s', opacity: 0 }}
          >
            {countdownUnits.map((unit) => (
              <div key={unit.label} className="flex flex-col items-center">
                <div className="glass-panel rounded-xl px-3 sm:px-6 py-3 sm:py-4 min-w-[60px] sm:min-w-[90px]">
                  <span className="font-display text-3xl sm:text-5xl text-gradient-amber tabular-nums">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-fest-dark-300 mt-2">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* CTA buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
          style={{ animationDelay: '0.7s', opacity: 0 }}
        >
          <button
            onClick={onBrowse}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-fest-primary-500 hover:bg-fest-primary-600 text-fest-dark-900 font-semibold text-base transition-all duration-300 hover:shadow-xl hover:shadow-fest-primary-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Browse Events
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel-light hover:bg-white/10 text-white font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <MapPin className="w-5 h-5" />
            About the Fest
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-fest-dark-300" />
      </div>
    </section>
  );
}
