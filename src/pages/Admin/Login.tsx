import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/UI/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Mock credentials
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Invalid password');
    }
  };

  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      <main className="pt-40 pb-24 flex items-center justify-center px-6">
        <div className="max-w-md w-full glass p-10 rounded-[2.5rem]">
          <div className="w-16 h-16 bg-accent-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Lock size={32} className="text-accent-orange" />
          </div>
          <h1 className="text-3xl font-black text-center mb-2">Admin Access</h1>
          <p className="text-white/40 text-center mb-8">Secure login for ADD MEDIA administrators.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/70 uppercase tracking-widest ml-4">Access Password</label>
              <input 
                type="password" 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-accent-orange transition-colors"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button className="w-full h-14 orange-gradient">Login to Dashboard</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
