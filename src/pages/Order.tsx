import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import { Button } from '../components/UI/Button';
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function Order() {
  const [searchParams] = useSearchParams();
  const selectedStyle = searchParams.get('style') || '';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    style: selectedStyle,
    instructions: '',
    delivery: 'basic'
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  useEffect(() => {
    if (selectedStyle) {
      setFormData(prev => ({ ...prev, style: selectedStyle }));
    }
  }, [selectedStyle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      let logoUrl = null;

      // 1. Upload logo if provided
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('logos')
          .upload(filePath, selectedFile);

        if (uploadError) {
          console.error('Error uploading file:', uploadError);
          alert('Failed to upload logo. Please try again.');
          setIsSubmitting(false);
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from('logos')
          .getPublicUrl(filePath);
          
        logoUrl = publicUrlData.publicUrl;
      }

      // 1.5 Generate Tracking ID
      const generatedTrackingId = Math.random().toString(36).substring(2, 8).toUpperCase();
      setTrackingId(generatedTrackingId);

      // 2. Insert order into database
      const { error: insertError } = await supabase
        .from('orders')
        .insert([
          {
            tracking_id: generatedTrackingId,
            customer_name: formData.name,
            email: formData.email,
            style: formData.style,
            delivery_time: formData.delivery,
            instructions: formData.instructions,
            logo_url: logoUrl,
            status: 'Pending'
          }
        ]);

      if (insertError) {
        console.error('Error inserting order:', insertError);
        alert('Failed to submit order. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-primary min-h-screen">
        <Navbar />
        <main className="pt-32 md:pt-40 pb-16 md:pb-24 flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full glass p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem] text-center"
          >
            <div className="w-20 h-20 bg-accent-teal/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={40} className="text-accent-teal" />
            </div>
            <h1 className="text-3xl font-black mb-4">Order Received!</h1>
            <p className="text-white/60 mb-6 leading-relaxed">
              Thank you for choosing ADD MEDIA. Our team will review your logo and start the animation process.
            </p>
            
            <div className="bg-primary/50 border border-accent-teal/30 rounded-2xl p-6 mb-8 inline-block">
              <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-2">Your Tracking ID</p>
              <p className="text-4xl font-mono font-black text-accent-teal tracking-[0.2em]">{trackingId}</p>
            </div>
            
            <p className="text-sm text-accent-orange font-bold mb-8">
              Please save this Tracking ID. You can use it to check your order status at any time.
            </p>
            
            <Button className="w-full" onClick={() => setIsSubmitted(false)}>Back to Home</Button>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      
      <main className="pt-28 md:pt-32 pb-16 md:pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-10 md:mb-16">
            <h1 className="text-4xl md:text-5xl font-black mb-4 md:mb-6">Book Your Animation</h1>
            <p className="text-xl text-white/60">
              Fill in the details below to start your professional logo animation project.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="md:col-span-2 glass p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] space-y-6 md:space-y-8">
              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/70 uppercase tracking-widest ml-4">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-accent-teal transition-colors"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/70 uppercase tracking-widest ml-4">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-accent-teal transition-colors"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/70 uppercase tracking-widest ml-4">Selected Style</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Minimal Clean"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-accent-teal transition-colors"
                    value={formData.style}
                    onChange={e => setFormData({...formData, style: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/70 uppercase tracking-widest ml-4">Delivery Time</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-accent-teal transition-colors appearance-none"
                    value={formData.delivery}
                    onChange={e => setFormData({...formData, delivery: e.target.value})}
                  >
                    <option value="basic" className="bg-surface">Basic (3-5 Days)</option>
                    <option value="express" className="bg-surface">Express (24-48 Hours)</option>
                  </select>
                </div>
              </div>

              {/* File Upload Section */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/70 uppercase tracking-widest ml-4">Upload Your Logo (PNG, SVG, AI)</label>
                <input 
                  type="file" 
                  id="logo-upload"
                  className="hidden" 
                  accept=".png,.svg,.ai,.pdf,.eps"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
                <div 
                  onClick={() => document.getElementById('logo-upload')?.click()}
                  className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer group ${selectedFile ? 'border-accent-teal bg-accent-teal/5' : 'border-white/10 hover:border-accent-teal/50'}`}
                >
                  {selectedFile ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle2 className="mb-4 text-accent-teal" size={48} />
                      <p className="text-white font-bold">{selectedFile.name}</p>
                      <p className="text-white/40 text-sm mt-2">Click to change file</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="mx-auto mb-4 text-white/20 group-hover:text-accent-teal transition-colors" size={48} />
                      <p className="text-white/40">Drag and drop your logo file here, or click to browse</p>
                    </>
                  )}
                </div>
              </div>

              {/* Custom Instructions */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/70 uppercase tracking-widest ml-4">Custom Instructions</label>
                <textarea 
                  rows={4}
                  placeholder="Any specific colors, speed, or elements you want us to include?"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-accent-teal transition-colors"
                  value={formData.instructions}
                  onChange={e => setFormData({...formData, instructions: e.target.value})}
                ></textarea>
              </div>

              <div className="flex items-start gap-4 p-6 bg-accent-teal/5 rounded-2xl border border-accent-teal/20">
                <AlertCircle size={20} className="text-accent-teal shrink-0 mt-1" />
                <p className="text-sm text-white/60">
                  Please ensure your logo is of high resolution (min 2000px) or in vector format for the best animation results.
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full h-16 text-xl" disabled={isSubmitting}>
                {isSubmitting ? 'Processing Order...' : 'Confirm Order & Proceed'}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
