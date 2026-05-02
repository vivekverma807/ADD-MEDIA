import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from './UI/Button';
import { Menu, X, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation and mount
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 pt-safe px-4 md:px-8 pointer-events-none">
      <div className={`mt-4 md:mt-8 mx-auto max-w-7xl transition-all duration-500 pointer-events-auto ${isScrolled ? 'scale-95 opacity-90' : 'scale-100 opacity-100'}`}>
        <div className={`glass rounded-[2rem] md:rounded-full px-6 py-4 md:py-5 flex justify-between items-center border border-white/10 shadow-2xl transition-all ${isScrolled ? 'bg-primary/80' : 'bg-surface/40'}`}>
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <div className="flex flex-col leading-[0.85]">
              <span className="text-xl md:text-2xl font-black tracking-[-0.05em] text-white">
                ADD<span className="text-accent-teal">MEDIA</span>
              </span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-accent-orange font-extrabold mt-1">
                Advertising & Marketing
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-10">
            <Link to="/" className="text-white/60 hover:text-white transition-colors font-bold text-[10px] uppercase tracking-[0.2em]">Home</Link>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white/60 hover:text-white transition-colors font-bold text-[10px] uppercase tracking-[0.2em] cursor-pointer"
            >
              About
            </button>
            <Link to="/showcase" className="text-white/60 hover:text-white transition-colors font-bold text-[10px] uppercase tracking-[0.2em]">Showcase</Link>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-white/60 hover:text-white transition-colors font-bold text-[10px] uppercase tracking-[0.2em] cursor-pointer"
            >
              Services
            </button>

            <button 
              onClick={() => scrollToSection('footer')}
              className="text-white/60 hover:text-white transition-colors font-bold text-[10px] uppercase tracking-[0.2em] cursor-pointer"
            >
              Contact
            </button>
            <div className="flex items-center gap-6 pl-6 border-l border-white/10">
              <Link to="/track" className="text-white/60 hover:text-white transition-colors font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse"></span>
                Track
              </Link>
              <Link to="/order">
                <Button size="sm" className="rounded-full px-8 h-10 text-[10px] uppercase tracking-widest">Order Now</Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-white w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="lg:hidden fixed inset-0 z-[60] bg-primary/98 backdrop-blur-3xl p-10 flex flex-col items-center justify-center gap-12 pointer-events-auto"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40"><X size={28}/></button>
            
            <div className="flex flex-col gap-8 text-center">
              <Link to="/" className="text-4xl font-black text-white hover:text-accent-teal transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-4xl font-black text-white hover:text-accent-teal transition-colors"
              >
                About
              </button>
              <Link to="/showcase" className="text-4xl font-black text-white hover:text-accent-teal transition-colors" onClick={() => setIsMenuOpen(false)}>Showcase</Link>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-4xl font-black text-white hover:text-accent-teal transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('footer')}
                className="text-4xl font-black text-white hover:text-accent-teal transition-colors"
              >
                Contact
              </button>
              <Link to="/track" className="text-4xl font-black text-accent-teal hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                Track Order
              </Link>
              <Link to="/order" className="text-4xl font-black text-accent-orange hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Order Now</Link>
            </div>

            <div className="flex gap-6 mt-12">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-accent-teal">
                <Play size={24} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Creative Partner</p>
                <p className="text-lg font-black text-white">ADD MEDIA Agency</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
