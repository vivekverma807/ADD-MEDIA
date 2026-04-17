import { motion } from 'framer-motion';
import { Button } from './UI/Button';
import { PlayCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-teal/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-orange/10 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full glass text-accent-teal text-sm font-bold tracking-wider uppercase mb-6">
              Leading Creative Agency
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-8">
              Transform Your Brand with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-teal to-accent-orange">
                Stunning Logo Animations
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 leading-relaxed mb-10 max-w-2xl">
              Elevate your digital presence with high-end motion graphics and premium branding solutions that leave a lasting impression.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/showcase">
                <Button size="lg" className="group">
                  Explore Showcase
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <Link to="/order">
                <Button variant="outline" size="lg">
                  <PlayCircle className="mr-2" size={20} />
                  Start a Project
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hero Visual Placeholder */}
      <motion.div 
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-[600px] glass rounded-l-3xl border-r-0 overflow-hidden"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center">
          <div className="text-white/20 text-9xl font-black rotate-90 select-none">
            ANIMATION
          </div>
        </div>
      </motion.div>
    </section>
  );
}
