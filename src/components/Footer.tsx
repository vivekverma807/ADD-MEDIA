import { Link } from 'react-router-dom';
import { Camera, Video, Send, Globe, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="footer" className="bg-surface pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Info */}
        <div className="space-y-6">
          <Link to="/" className="flex flex-col leading-tight">
            <span className="text-2xl font-black tracking-tighter text-white">
              ADD<span className="text-accent-teal">MEDIA</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent-orange font-bold">
              Advertising & Marketing
            </span>
          </Link>
          <p className="text-white/60 leading-relaxed">
            Transforming brands with stunning visual storytelling and premium logo animations. We bring your identity to life.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-accent-teal transition-all">
              <Camera size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-accent-teal transition-all">
              <Video size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-accent-teal transition-all">
              <Send size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-accent-teal transition-all">
              <Globe size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
          <ul className="space-y-4">
            <li><Link to="/" className="text-white/60 hover:text-accent-teal transition-colors">Home</Link></li>
            <li><Link to="/showcase" className="text-white/60 hover:text-accent-teal transition-colors">Showcase</Link></li>
            <li><Link to="/services" className="text-white/60 hover:text-accent-teal transition-colors">Services</Link></li>
            <li><Link to="/contact" className="text-white/60 hover:text-accent-teal transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Our Services</h4>
          <ul className="space-y-4">
            <li><span className="text-white/60">Logo Animation</span></li>
            <li><span className="text-white/60">Brand Identity</span></li>
            <li><span className="text-white/60">Digital Marketing</span></li>
            <li><span className="text-white/60">CGI & Visual Effects</span></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-white/60">
              <MapPin size={20} className="text-accent-teal shrink-0" />
              <span>Digital Hub, Marketing Street, India</span>
            </li>
            <li className="flex items-center gap-3 text-white/60">
              <Phone size={20} className="text-accent-teal shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3 text-white/60">
              <Mail size={20} className="text-accent-teal shrink-0" />
              <span>hello@addmedia.in</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
        <p>© 2026 ADD MEDIA. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
