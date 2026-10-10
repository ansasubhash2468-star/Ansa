import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { EventItem } from '@/types';
import NetflixIntro from '@/components/NetflixIntro';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import EventList from '@/components/EventList';
import About from '@/components/About';
import MyEvents from '@/components/MyEvents';
import Footer from '@/components/Footer';
import RegistrationModal from '@/components/RegistrationModal';
import SuccessModal from '@/components/SuccessModal';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [successData, setSuccessData] = useState<{ name: string; event: string } | null>(null);
  const [myEventsRefresh, setMyEventsRefresh] = useState(0);

  // Load events from Supabase
  const loadEvents = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true });
    if (!error && data) {
      setEvents(data as EventItem[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!showIntro) loadEvents();
  }, [showIntro, loadEvents]);

  const handleRegister = (event: EventItem) => {
    setSelectedEvent(event);
  };

  const handleRegistrationSuccess = (studentName: string, eventName: string) => {
    setSelectedEvent(null);
    setSuccessData({ name: studentName, event: eventName });
    setMyEventsRefresh((prev) => prev + 1);
    loadEvents();
  };

  const handleNavigate = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleDark = () => setDarkMode((prev) => !prev);

  // Apply dark/light class to root
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.body.style.backgroundColor = darkMode ? '#0a0a0d' : '#f6f6f7';
    document.body.style.color = darkMode ? '#f6f6f7' : '#1c1c22';
  }, [darkMode]);

  if (showIntro) {
    return <NetflixIntro onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-fest-dark-950 text-fest-dark-50 noise-overlay">
        <Header darkMode={darkMode} onToggleDark={toggleDark} onNavigate={handleNavigate} />
        <Hero onBrowse={() => handleNavigate('events')} />
        <Marquee />
        <EventList events={events} loading={loading} onRegister={handleRegister} />
        <About />
        <MyEvents refreshKey={myEventsRefresh} onRegister={handleRegister} />
        <Footer />

        {/* Modals */}
        {selectedEvent && (
          <RegistrationModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onSuccess={handleRegistrationSuccess}
          />
        )}
        {successData && (
          <SuccessModal
            studentName={successData.name}
            eventName={successData.event}
            onClose={() => setSuccessData(null)}
            onViewMyEvents={() => {
              setSuccessData(null);
              handleNavigate('my-events');
            }}
          />
        )}
      </div>
    </div>
  );
}
