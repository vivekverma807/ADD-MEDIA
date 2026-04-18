import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Camera, Video, Send, Globe, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="bg-primary pt-32 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-8">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              className="flex flex-col leading-[0.85] text-left group cursor-pointer"
            >
              <span className="text-3xl font-black tracking-[-0.05em] text-white group-hover:text-accent-teal transition-colors">
                ADD<span className="text-accent-teal group-hover:text-white transition-colors">MEDIA</span>
              </span>
              <span className="text-[11px] uppercase tracking-[0.3em] text-accent-orange font-extrabold mt-2">
                Advertising & Marketing
              </span>
            </button>
            <p className="text-white/70 text-lg leading-relaxed max-w-sm">
              We specialize in high-end visual storytelling and premium logo animations that elevate your brand's digital presence.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Camera, url: 'https://instagram.com/addmedia' },
                { Icon: Video, url: 'https://youtube.com/@addmedia' },
                { Icon: Send, url: 'https://t.me/addmedia' },
                { Icon: Globe, url: 'https://addmedia.in' }
              ].map(({ Icon, url }, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-white/80 hover:text-accent-teal hover:border-accent-teal/50 transition-all group">
                  <Icon size={22} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-accent-teal mb-8">Navigation</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/" className="text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block font-medium">Home</Link>
                </li>
                <li>
                  <button onClick={() => scrollToSection('about')} className="text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block font-medium cursor-pointer">About Us</button>
                </li>
                <li>
                  <Link to="/showcase" className="text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block font-medium">Showcase</Link>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services')} className="text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block font-medium cursor-pointer">Services</button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('footer')} className="text-white/60 hover:text-white hover:translate-x-1 transition-all inline-block font-medium cursor-pointer">Contact Us</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-accent-teal mb-8">Capabilities</h4>
              <ul className="space-y-4">
                {['Logo Animation', 'Brand Identity', 'Digital Strategy', 'Visual FX'].map((item) => (
                  <li key={item} className="text-white/60 font-medium">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Hub */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-accent-orange mb-8">Get In Touch</h4>
            <div className="space-y-4">
              <div className="glass p-6 rounded-[2rem] border border-white/5 flex items-start gap-5 hover:border-accent-teal/30 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-accent-teal/10 flex items-center justify-center text-accent-teal shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Our Location</p>
                  <p className="text-white/90 font-medium">Digital Hub, Marketing Street, India</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass p-6 rounded-[2rem] border border-white/5 flex items-center gap-4 hover:border-accent-orange/30 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-accent-orange/10 flex items-center justify-center text-accent-orange shrink-0">
                    <Phone size={20} />
                  </div>
                  <p className="text-white/90 font-bold text-sm">+91 98765 43210</p>
                </div>
                <div className="glass p-6 rounded-[2rem] border border-white/5 flex items-center gap-4 hover:border-accent-teal/30 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-accent-teal/10 flex items-center justify-center text-accent-teal shrink-0">
                    <Mail size={20} />
                  </div>
                  <p className="text-white/90 font-bold text-sm">hello@addmedia.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Bottom */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-white/30">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
            <p>© 2026 ADD MEDIA. Premium Logo Animation Agency.</p>
          </div>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-accent-teal transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent-teal transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
