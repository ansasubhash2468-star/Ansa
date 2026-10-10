import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import type { EventItem } from '@/types';
import EventCard, { EventCardSkeleton } from './EventCard';

interface EventListProps {
  events: EventItem[];
  loading: boolean;
  onRegister: (event: EventItem) => void;
}

export default function EventList({ events, loading, onRegister }: EventListProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const set = new Set(events.map((e) => e.category));
    return ['All', ...Array.from(set).sort()];
  }, [events]);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchesCategory = activeCategory === 'All' || e.category === activeCategory;
      const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [events, search, activeCategory]);

  return (
    <section id="events" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-fest-primary-400 mb-2 block">
            Lineup
          </span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-wide text-white mb-3">
            Browse <span className="text-gradient-amber">Events</span>
          </h2>
          <p className="text-fest-dark-300 max-w-xl">
            Filter by category or search for an event by name. Register before seats run out.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col gap-4">
          {/* Search */}
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-fest-dark-400 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events by name..."
              className="w-full pl-12 pr-4 py-3 rounded-xl glass-panel border border-white/10 text-white placeholder:text-fest-dark-400 text-sm focus:outline-none focus:border-fest-primary-500/50 focus:ring-2 focus:ring-fest-primary-500/20 transition-all"
            />
          </div>

          {/* Category filter */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
            <SlidersHorizontal className="w-4 h-4 text-fest-dark-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-fest-primary-500 text-fest-dark-900 shadow-lg shadow-fest-primary-500/30'
                    : 'glass-panel-light text-fest-dark-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 text-sm text-fest-dark-300">
          {loading ? 'Loading events...' : `${filtered.length} event${filtered.length !== 1 ? 's' : ''} found`}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full glass-panel-light flex items-center justify-center">
                <Search className="w-7 h-7 text-fest-dark-400" />
              </div>
              <p className="text-fest-dark-300 text-lg">No events match your search</p>
              <button
                onClick={() => {
                  setSearch('');
                  setActiveCategory('All');
                }}
                className="text-fest-primary-400 hover:text-fest-primary-300 text-sm font-medium transition-colors"
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} onRegister={onRegister} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
