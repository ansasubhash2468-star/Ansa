import { Calendar, Menu, Moon, Sun, X, Ticket } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDark: () => void;
  onNavigate: (id: string) => void;
}

export default function Header({ darkMode, onToggleDark, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Events', id: 'events' },
    { label: 'My Events', id: 'my-events' },
    { label: 'About', id: 'about' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleClick = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleClick('hero')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-fest-primary-500 to-fest-accent-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Ticket className="w-5 h-5 text-fest-dark-900" strokeWidth={2.5} />
            </div>
            <span className="font-display text-2xl tracking-wider text-white group-hover:text-fest-primary-400 transition-colors">
              VERVE<span className="text-fest-primary-500">26</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                className="text-sm font-medium text-fest-dark-200 hover:text-fest-primary-400 transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-fest-primary-500 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDark}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-fest-dark-200 hover:text-fest-primary-400 hover:bg-white/5 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => handleClick('events')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-fest-primary-500 hover:bg-fest-primary-600 text-fest-dark-900 text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-fest-primary-500/30"
            >
              <Calendar className="w-4 h-4" />
              Browse Events
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-fest-dark-200 hover:bg-white/5 transition-all"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden py-4 border-t border-white/5 animate-fade-in">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleClick(link.id)}
                  className="text-left px-3 py-2 rounded-lg text-fest-dark-200 hover:text-fest-primary-400 hover:bg-white/5 transition-all duration-200 font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
