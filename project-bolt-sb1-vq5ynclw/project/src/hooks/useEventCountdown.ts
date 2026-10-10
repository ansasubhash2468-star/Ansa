import { useEffect, useState } from 'react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
  isPast: boolean;
}

function calcRemaining(target: number): TimeRemaining {
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) {
    // Event has started — check if it's still "live" (within 3 hours of start)
    const elapsed = -diff;
    const isLive = elapsed < 3 * 60 * 60 * 1000;
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive, isPast: !isLive };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isLive: false,
    isPast: false,
  };
}

export function useEventCountdown(date: string, time: string): TimeRemaining {
  const target = new Date(`${date}T${time}:00`).getTime();
  const [remaining, setRemaining] = useState<TimeRemaining>(() => calcRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setRemaining(calcRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return remaining;
}
