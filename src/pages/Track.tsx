import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import { Search, Package, Clock, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { supabase } from '../lib/supabase';

interface TrackedOrder {
  tracking_id: string;
  customer_name: string;
  style: string;
  status: string;
  created_at: string;
}

export default function Track() {
  const [trackingId, setTrackingId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return;

    setIsSearching(true);
    setError('');
    setOrder(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('orders')
        .select('tracking_id, customer_name, style, status, created_at')
        .eq('tracking_id', trackingId.toUpperCase())
        .single();

      if (fetchError || !data) {
        setError("We couldn't find an order with that Tracking ID. Please check and try again.");
      } else {
        setOrder(data);
      }
    } catch (err) {
      console.error('Error fetching order:', err);
      setError("An error occurred while searching. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const steps = ['Pending', 'In Progress', 'Completed'];
  const currentStepIndex = order ? steps.indexOf(order.status) : -1;

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      <Navbar />
      
      <main className="pt-32 md:pt-40 pb-16 md:pb-24 flex-grow flex items-center justify-center px-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] relative overflow-hidden w-full"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent-teal/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            
            <div className="relative z-10 text-center mb-10">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <Search size={28} className="text-accent-teal" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black mb-4">Track Your Order</h1>
              <p className="text-sm md:text-base text-white/60">Enter your 6-digit Tracking ID to see the real-time status of your animation project.</p>
            </div>

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-10 relative z-10">
              <input 
                type="text" 
                placeholder="E.G. A7K9X2"
                maxLength={6}
                className="w-full sm:flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-center text-xl font-mono tracking-[0.2em] uppercase focus:outline-none focus:border-accent-teal transition-colors"
                value={trackingId}
                onChange={e => setTrackingId(e.target.value.toUpperCase())}
              />
              <Button type="submit" className="w-full sm:w-auto px-8" disabled={isSearching || trackingId.length < 6}>
                {isSearching ? <RefreshCw className="animate-spin" /> : 'Track'}
              </Button>
            </form>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4 p-6 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-400 mb-8 relative z-10">
                <AlertCircle size={20} className="shrink-0 mt-0.5" />
                <p className="text-sm font-medium">{error}</p>
              </motion.div>
            )}

            {order && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 relative z-10"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 pb-8 border-b border-white/5">
                  <div>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Order Details</p>
                    <h3 className="text-xl font-black text-white">{order.customer_name}</h3>
                    <p className="text-accent-teal text-sm mt-1">{order.style}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Date</p>
                    <p className="text-white/80 text-sm font-medium">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute top-5 left-0 w-full h-1 bg-white/5 rounded-full" />
                  <div 
                    className="absolute top-5 left-0 h-1 bg-gradient-to-r from-accent-teal to-accent-orange rounded-full transition-all duration-1000"
                    style={{ width: `${currentStepIndex === 0 ? '15%' : currentStepIndex === 1 ? '50%' : '100%'}` }}
                  />

                  {/* Timeline Steps */}
                  <div className="flex justify-between relative z-10">
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-primary transition-colors ${currentStepIndex >= 0 ? 'bg-accent-teal text-primary' : 'bg-white/10 text-white/40'}`}>
                        <Package size={18} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${currentStepIndex >= 0 ? 'text-white' : 'text-white/40'}`}>Received</span>
                    </div>
                    
                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-primary transition-colors ${currentStepIndex >= 1 ? 'bg-accent-orange text-primary' : 'bg-white/10 text-white/40'}`}>
                        <Clock size={18} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${currentStepIndex >= 1 ? 'text-white' : 'text-white/40'}`}>In Progress</span>
                    </div>

                    <div className="flex flex-col items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-primary transition-colors ${currentStepIndex >= 2 ? 'bg-green-400 text-primary' : 'bg-white/10 text-white/40'}`}>
                        <CheckCircle2 size={18} />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${currentStepIndex >= 2 ? 'text-green-400' : 'text-white/40'}`}>Completed</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
