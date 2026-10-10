import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Ticket, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { EventItem, Registration } from '@/types';

interface MyEventsProps {
  refreshKey: number;
  onRegister: (event: EventItem) => void;
}

interface MyRegistration extends Registration {
  events: EventItem;
}

export default function MyEvents({ refreshKey, onRegister }: MyEventsProps) {
  const [registrations, setRegistrations] = useState<MyRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from('registrations')
        .select('*, events(*)')
        .order('created_at', { ascending: false });
      if (!cancelled && !error && data) {
        setRegistrations(data as MyRegistration[]);
      }
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [refreshKey]);

  const handleRemove = async (regId: string, eventId: string) => {
    setRemoving(regId);
    const { data: eventData } = await supabase
      .from('events')
      .select('registered_seats')
      .eq('id', eventId)
      .maybeSingle();
    if (eventData) {
      await supabase
        .from('events')
        .update({ registered_seats: Math.max(0, eventData.registered_seats - 1) })
        .eq('id', eventId);
    }
    await supabase.from('registrations').delete().eq('id', regId);
    setRegistrations((prev) => prev.filter((r) => r.id !== regId));
    setRemoving(null);
  };

  return (
    <section id="my-events" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-fest-dark-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-fest-accent-400 mb-2 block">
            Your Schedule
          </span>
          <h2 className="font-display text-4xl sm:text-5xl tracking-wide text-white mb-3">
            My <span className="text-gradient-amber">Events</span>
          </h2>
          <p className="text-fest-dark-300">
            Events you've registered for. Registrations persist across page refreshes.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-fest-primary-400 animate-spin" />
          </div>
        ) : registrations.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-2xl border border-white/5">
            <div className="inline-flex w-16 h-16 rounded-full glass-panel-light items-center justify-center mb-4">
              <Ticket className="w-8 h-8 text-fest-dark-400" />
            </div>
            <p className="text-fest-dark-200 text-lg mb-2">No registrations yet</p>
            <p className="text-fest-dark-400 text-sm mb-6">Browse events and sign up to see them here.</p>
            <button
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 rounded-xl bg-fest-primary-500 hover:bg-fest-primary-600 text-fest-dark-900 font-semibold text-sm transition-all hover:shadow-lg hover:shadow-fest-primary-500/30"
            >
              Browse Events
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {registrations.map((reg) => {
              const event = reg.events;
              if (!event) return null;
              return (
                <div
                  key={reg.id}
                  className="flex flex-col sm:flex-row gap-4 p-5 rounded-2xl glass-panel border border-white/5 hover:border-fest-primary-500/20 transition-all duration-300 group"
                >
                  {/* Image thumbnail */}
                  <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                    {event.image_url ? (
                      <img src={event.image_url} alt={event.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-fest-dark-700 to-fest-dark-800" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold text-fest-primary-400 uppercase tracking-wider">
                          {event.category}
                        </span>
                        <h3 className="font-display text-xl tracking-wide text-white mt-0.5">{event.name}</h3>
                      </div>
                      <button
                        onClick={() => handleRemove(reg.id, event.id)}
                        disabled={removing === reg.id}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-fest-dark-400 hover:text-fest-error-400 hover:bg-fest-error-500/10 transition-all flex-shrink-0"
                        aria-label="Cancel registration"
                      >
                        {removing === reg.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2 text-xs text-fest-dark-300">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {event.venue}
                      </span>
                    </div>

                    <p className="text-sm text-fest-dark-200 mt-2">
                      Registered as <span className="font-semibold text-white">{reg.student_name}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
