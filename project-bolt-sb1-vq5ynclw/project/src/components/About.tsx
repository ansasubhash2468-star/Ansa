import { Calendar, Clock, Users, Sparkles } from 'lucide-react';

const STATS = [
  { icon: Calendar, label: 'Days', value: '3' },
  { icon: Sparkles, label: 'Events', value: '8+' },
  { icon: Users, label: 'Participants', value: '2000+' },
  { icon: Clock, label: 'Hours of Fun', value: '48' },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-fest-secondary-400 mb-2 block">
          About the Fest
        </span>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide text-white mb-6">
          What is <span className="text-gradient-amber">VERVE 26</span>?
        </h2>
        <p className="text-fest-dark-200 text-base sm:text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
          VERVE 26 is the annual campus fest — three days of music, dance, drama, tech, art, and sports.
          Students from colleges across the region come together to compete, perform, and celebrate.
          Whether you're a performer, a competitor, or just here for the vibes, there's something for everyone.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="glass-panel rounded-2xl p-5 sm:p-6 border border-white/5 hover:border-fest-primary-500/20 transition-all duration-300 group"
            >
              <div className="inline-flex w-12 h-12 rounded-xl bg-fest-primary-500/10 items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6 text-fest-primary-400" />
              </div>
              <div className="font-display text-3xl sm:text-4xl text-gradient-amber mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-fest-dark-300 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
