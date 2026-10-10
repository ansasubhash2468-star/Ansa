import { useEffect, useState } from 'react';

interface NetflixIntroProps {
  onComplete: () => void;
}

const LETTERS = ['V', 'E', 'R', 'V', 'E', '2', '6'];

export default function NetflixIntro({ onComplete }: NetflixIntroProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 3000);
    const doneTimer = setTimeout(onComplete, 3700);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="netflix-intro"
      style={{ animation: exiting ? 'netflixFade 0.7s ease-in forwards' : undefined }}
    >
      <div className="netflix-intro-rays" />
      <div className="flex items-center justify-center flex-wrap" style={{ perspective: '800px' }}>
        {LETTERS.map((letter, i) => (
          <span
            key={`${letter}-${i}`}
            className="netflix-intro-letter"
            style={{
              animationDelay: `${i * 0.12}s`,
              color: i === 5 || i === 6 ? '#ec4899' : '#ff7a0f',
              textShadow: `0 0 40px ${i === 5 || i === 6 ? 'rgba(236,72,153,0.5)' : 'rgba(255,122,15,0.5)'}`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
      <p className="netflix-intro-tagline">The Fest Begins</p>
      <div className="netflix-intro-progress" />
    </div>
  );
}
