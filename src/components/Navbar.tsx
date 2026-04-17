import { Link } from 'react-router-dom';
import { Button } from './UI/Button';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4 glass shadow-lg' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-black tracking-tighter text-white">
              ADD<span className="text-accent-teal">MEDIA</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-accent-orange font-bold">
              Advertising & Marketing
            </span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white/80 hover:text-accent-teal transition-colors font-medium">Home</Link>
          <Link to="/showcase" className="text-white/80 hover:text-accent-teal transition-colors font-medium">Showcase</Link>
          <Link to="/services" className="text-white/80 hover:text-accent-teal transition-colors font-medium">Services</Link>
          <Link to="/contact" className="text-white/80 hover:text-accent-teal transition-colors font-medium">Contact</Link>
          <Link to="/order">
            <Button size="sm">Order Now</Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 right-0 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <Link to="/" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/showcase" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Showcase</Link>
          <Link to="/services" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link to="/contact" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <Link to="/order" onClick={() => setIsMenuOpen(false)}>
            <Button className="w-full">Order Now</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
