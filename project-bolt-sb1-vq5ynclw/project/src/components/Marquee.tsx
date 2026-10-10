const MARQUEE_ITEMS = [
  'Music', 'Dance', 'Tech', 'Drama', 'Art', 'Sports', 'Quiz', 'Literature',
  'Battle of the Bands', 'Hip-Hop Showdown', 'Hack the Verve', 'Live Canvas',
  'Stage Play', 'Football Finals', 'Quiz Bowl', 'Solo Singing',
];

export default function Marquee() {
  // Duplicate items for seamless scroll
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative overflow-hidden py-4 border-y border-white/5 bg-fest-dark-900/50">
      <div className="flex whitespace-nowrap animate-scroll-x">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-2xl sm:text-3xl tracking-wider px-6 text-fest-dark-300"
          >
            {item}
            <span className="text-fest-primary-500 ml-6">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
