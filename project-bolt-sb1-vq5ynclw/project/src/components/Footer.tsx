import { Ticket, Mail, Phone, MapPin, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/5 bg-fest-dark-950 noise-overlay">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-fest-primary-500 to-fest-accent-600 flex items-center justify-center">
                <Ticket className="w-5 h-5 text-fest-dark-900" strokeWidth={2.5} />
              </div>
              <span className="font-display text-2xl tracking-wider text-white">
                VERVE<span className="text-fest-primary-500">26</span>
              </span>
            </div>
            <p className="text-sm text-fest-dark-300 max-w-xs leading-relaxed">
              The biggest campus fest of 2026. Three days of music, art, tech, and celebration.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-lg tracking-wide text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Events', 'My Events', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const id = link.toLowerCase().replace(' ', '-');
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-fest-dark-300 hover:text-fest-primary-400 transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg tracking-wide text-white mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-fest-dark-300">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-fest-primary-400 flex-shrink-0" />
                <a href="mailto:verve26@campus.edu" className="hover:text-fest-primary-400 transition-colors">
                  verve26@campus.edu
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-fest-primary-400 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-fest-primary-400 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-fest-primary-400 flex-shrink-0" />
                <span>Campus Main Ground, College Road</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-lg tracking-wide text-white mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Linkedin, label: 'LinkedIn' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg glass-panel-light flex items-center justify-center text-fest-dark-200 hover:text-fest-primary-400 hover:bg-fest-primary-500/10 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-xs text-fest-dark-400 mt-4">
              Stay updated with announcements and event schedules.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-fest-dark-400">
            © 2026 VERVE 26 · Campus Event Hub. All rights reserved.
          </p>
          <p className="text-xs text-fest-dark-400 font-mono">
            Made with passion for the fest
          </p>
        </div>
      </div>
    </footer>
  );
}
