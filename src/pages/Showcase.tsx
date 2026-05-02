import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/UI/Button';
import { Search, Play, X, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const samples = [
  ...[1, 2, 3, 4].map(num => ({
    id: `cloth-${num}`,
    name: `Cloth Style ${num}`,
    category: 'Cloth',
    path: `/sample videos/cloth logo animation/${num}.mp4`,
    description: 'Elegant cloth-based transitions for fashion and textile brands.'
  })),
  ...[1, 2, 3, 4].map(num => ({
    id: `hospital-${num}`,
    name: `Hospital Style ${num}`,
    category: 'Hospital',
    path: `/sample videos/hospital logo aniamtion/${num}.mp4`,
    description: 'Professional and clean animations for healthcare and clinics.'
  })),
  ...[1, 2, 3, 4].map(num => ({
    id: `nature-${num}`,
    name: `Nature Style ${num}`,
    category: 'Nature',
    path: `/sample videos/nature logo animation/${num}.mp4`,
    description: 'Organic and earth-inspired motion for eco-friendly brands.'
  })),
  ...[1, 2, 3, 4].map(num => ({
    id: `school-${num}`,
    name: `School Style ${num}`,
    category: 'School',
    path: `/sample videos/school logo animation/${num}.mp4`,
    description: 'Dynamic and educational animations for schools and colleges.'
  }))
];

export default function Showcase() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const filteredSamples = samples.filter(sample => {
    const matchesCategory = activeCategory === 'All' || sample.category === activeCategory;
    const matchesSearch = sample.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sample.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedVideo(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      
      <main className="pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 md:gap-8 mb-10 md:mb-16">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-black mb-4 md:mb-6 tracking-tight">Animation Showcase</h1>
              <p className="text-lg md:text-xl text-white/60">
                Immerse yourself in our signature styles. Click any card to preview the animation in high definition.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                <input 
                  type="text" 
                  placeholder="Search styles..." 
                  className="w-full bg-surface border border-white/10 rounded-full py-3 pl-12 pr-6 text-white focus:outline-none focus:border-accent-teal transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex overflow-x-auto hide-scrollbar gap-3 mb-10 md:mb-12 pb-2 -mx-6 px-6 md:mx-0 md:px-0">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${activeCategory === 'All' ? 'orange-gradient text-white' : 'glass text-white/60 hover:text-white'}`}
            >
              All Styles
            </button>
            {['Cloth', 'Hospital', 'Nature', 'School'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'orange-gradient text-white' : 'glass text-white/60 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSamples.map((sample, index) => (
              <SampleCard 
                key={sample.id} 
                sample={sample} 
                index={index} 
                onSelect={() => navigate(`/order?style=${sample.id}`)}
                onPreview={() => setSelectedVideo(sample.path)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Cinematic Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-primary/95 backdrop-blur-2xl"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl aspect-video rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(45,212,191,0.2)] border border-white/10"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent-orange transition-colors"
              >
                <X size={24} />
              </button>
              
              <video 
                src={selectedVideo} 
                autoPlay 
                controls 
                className="w-full h-full object-contain bg-black"
                onEnded={() => setSelectedVideo(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

function SampleCard({ sample, index, onSelect, onPreview }: { sample: any, index: number, onSelect: () => void, onPreview: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-[2.5rem] glass border border-white/5 hover:border-accent-teal/30 transition-all flex flex-col h-full bg-surface/30"
    >
      <div 
        className="aspect-video relative overflow-hidden bg-black/40 cursor-pointer"
        onClick={onPreview}
        onMouseEnter={() => videoRef.current?.play()}
        onMouseLeave={() => {
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
          }
        }}
      >
        <video 
          ref={videoRef}
          src={sample.path}
          muted
          playsInline
          loop
          className="w-full h-full object-cover brightness-75 group-hover:brightness-100 transition-all duration-700 ease-out"
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40">
          <div className="flex flex-col items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="w-16 h-16 rounded-full bg-accent-teal text-primary flex items-center justify-center shadow-[0_0_30px_rgba(45,212,191,0.5)]">
              <Maximize2 size={24} />
            </div>
            <span className="text-white font-bold text-sm tracking-widest uppercase">Expand Preview</span>
          </div>
        </div>

        <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-accent-teal border border-accent-teal/20">
          {sample.category}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-2xl font-black mb-3 group-hover:text-accent-teal transition-colors tracking-tight">{sample.name}</h3>
        <p className="text-white/40 text-sm mb-8 leading-relaxed flex-1">
          {sample.description}
        </p>
        <div className="flex gap-3">
          <Button 
            variant="ghost" 
            className="flex-1 text-sm rounded-2xl h-12 border border-white/10"
            onClick={onPreview}
          >
            <Play size={16} className="mr-2" />
            Watch
          </Button>
          <Button 
            className="flex-[2] text-sm rounded-2xl h-12"
            onClick={onSelect}
          >
            Order Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
