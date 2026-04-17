import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { LayoutDashboard, Users, ShoppingBag, Settings, LogOut, ExternalLink, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockOrders = [
  { id: 'ORD-001', customer: 'John Doe', email: 'john@example.com', style: 'Minimal Clean', status: 'In Progress', date: '2026-04-15' },
  { id: 'ORD-002', customer: 'Sarah Smith', email: 'sarah@design.co', style: '3D Extrusion', status: 'Pending', date: '2026-04-16' },
  { id: 'ORD-003', customer: 'Mike Johnson', email: 'mike@tech.io', style: 'Cyber Glitch', status: 'Completed', date: '2026-04-14' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 space-y-2">
              <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl bg-accent-teal/10 text-accent-teal font-bold">
                <LayoutDashboard size={20} />
                Dashboard
              </button>
              <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-white/60 hover:bg-white/5 transition-colors">
                <ShoppingBag size={20} />
                Orders
              </button>
              <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-white/60 hover:bg-white/5 transition-colors">
                <Users size={20} />
                Customers
              </button>
              <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-white/60 hover:bg-white/5 transition-colors">
                <Settings size={20} />
                Settings
              </button>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-colors mt-8"
              >
                <LogOut size={20} />
                Logout
              </button>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-8">
              <div className="flex justify-between items-center">
                <h1 className="text-4xl font-black">Orders Overview</h1>
                <div className="flex gap-4">
                  <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-accent-teal" />
                    Last update: Just now
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-3xl">
                  <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-1">Total Orders</p>
                  <p className="text-4xl font-black">128</p>
                </div>
                <div className="glass p-6 rounded-3xl">
                  <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-1">In Progress</p>
                  <p className="text-4xl font-black text-accent-teal">12</p>
                </div>
                <div className="glass p-6 rounded-3xl">
                  <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-1">Revenue</p>
                  <p className="text-4xl font-black text-accent-orange">₹45k</p>
                </div>
              </div>

              {/* Orders Table */}
              <div className="glass rounded-[2rem] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="px-8 py-6 text-sm font-bold text-white/40 uppercase tracking-widest">Order ID</th>
                        <th className="px-8 py-6 text-sm font-bold text-white/40 uppercase tracking-widest">Customer</th>
                        <th className="px-8 py-6 text-sm font-bold text-white/40 uppercase tracking-widest">Style</th>
                        <th className="px-8 py-6 text-sm font-bold text-white/40 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-6 text-sm font-bold text-white/40 uppercase tracking-widest">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6 font-mono text-accent-teal">{order.id}</td>
                          <td className="px-8 py-6">
                            <div className="font-bold">{order.customer}</div>
                            <div className="text-xs text-white/40">{order.email}</div>
                          </td>
                          <td className="px-8 py-6 text-sm">{order.style}</td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                              order.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                              order.status === 'In Progress' ? 'bg-accent-teal/20 text-accent-teal' :
                              'bg-accent-orange/20 text-accent-orange'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-8 py-6">
                            <button className="text-white/40 hover:text-white transition-colors">
                              <ExternalLink size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
