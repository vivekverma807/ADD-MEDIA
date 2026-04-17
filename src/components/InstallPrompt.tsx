import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './UI/Button';

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Only show if not already installed and not dismissed this session
      if (!sessionStorage.getItem('pwa_dismissed')) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('pwa_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[70] lg:hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-[2rem] border border-accent-teal/30 shadow-2xl flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl orange-gradient flex items-center justify-center text-white shrink-0">
            <Download size={24} />
          </div>
          <div>
            <h4 className="font-black text-white text-sm">ADD MEDIA App</h4>
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Install for better experience</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button size="sm" onClick={handleInstall} className="text-[10px] px-4 py-2 h-auto rounded-xl">
            Install
          </Button>
          <button onClick={handleDismiss} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white">
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
