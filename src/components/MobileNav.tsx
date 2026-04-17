import { NavLink } from 'react-router-dom';
import { Home, Play, ShoppingBag, Mail } from 'lucide-react';

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden bg-primary/80 backdrop-blur-xl border-t border-white/5 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        <NavLink 
          to="/" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-accent-teal' : 'text-white/40'}`}
        >
          <Home size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
        </NavLink>
        
        <NavLink 
          to="/showcase" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-accent-teal' : 'text-white/40'}`}
        >
          <Play size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Showcase</span>
        </NavLink>

        <NavLink 
          to="/order" 
          className={({ isActive }) => `flex flex-col items-center gap-1 transition-all ${isActive ? 'text-accent-teal' : 'text-white/40'}`}
        >
          <div className="relative -top-3 w-12 h-12 rounded-full orange-gradient shadow-lg flex items-center justify-center text-white border-4 border-primary">
            <ShoppingBag size={20} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-tighter relative -top-2">Order</span>
        </NavLink>

        <button 
          onClick={() => document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1 text-white/40"
        >
          <Mail size={20} />
          <span className="text-[10px] font-bold uppercase tracking-tighter">Contact</span>
        </button>
      </div>
    </nav>
  );
}
