
import { LayoutDashboard, Users, ShoppingBag, Settings, LogOut, ExternalLink, RefreshCw, Image as ImageIcon, MessageSquare, X, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/UI/Button';

interface Order {
  id: string;
  tracking_id: string;
  customer_name: string;
  email: string;
  style: string;
  logo_url: string | null;
  instructions: string | null;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string | null>(null);

  // Settings State
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setIsUpdating(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      
      // Update local state
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status.');
    } finally {
      setIsUpdating(null);
    }
  };

  const deleteOrder = async (order: Order) => {
    if (!window.confirm(`Are you sure you want to delete order ${order.tracking_id || order.id}? This action cannot be undone.`)) return;
    
    setIsUpdating(order.id);
    try {
      // 1. Delete logo from storage if it exists
      if (order.logo_url) {
        const urlObj = new URL(order.logo_url);
        const pathSegments = urlObj.pathname.split('/');
        const bucketIndex = pathSegments.findIndex(segment => segment === 'logos');
        if (bucketIndex !== -1 && bucketIndex < pathSegments.length - 1) {
          const filePath = pathSegments.slice(bucketIndex + 1).join('/');
          const { error: storageError } = await supabase.storage.from('logos').remove([filePath]);
          if (storageError) {
            console.warn('Could not delete storage file:', storageError);
          }
        }
      }

      // 2. Delete from database
      const { error: dbError } = await supabase
        .from('orders')
        .delete()
        .eq('id', order.id);

      if (dbError) throw dbError;

      // 3. Update local state
      setOrders(orders.filter(o => o.id !== order.id));
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order.');
    } finally {
      setIsUpdating(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPasswordMessage('Password must be at least 6 characters.');
      return;
    }
    localStorage.setItem('adminPassword', newPassword);
    setPasswordMessage('Password updated successfully!');
    setNewPassword('');
    setTimeout(() => setPasswordMessage(''), 3000);
  };

  // Derived Data
  const recentOrders = orders.slice(0, 5);
  
  // Calculate unique customers
  const customersMap = new Map();
  orders.forEach(order => {
    if (!customersMap.has(order.email)) {
      customersMap.set(order.email, {
        name: order.customer_name,
        email: order.email,
        totalOrders: 0,
        lastOrderDate: order.created_at
      });
    }
    const customer = customersMap.get(order.email);
    customer.totalOrders += 1;
    if (new Date(order.created_at) > new Date(customer.lastOrderDate)) {
      customer.lastOrderDate = order.created_at;
    }
  });
  const uniqueCustomers = Array.from(customersMap.values());

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-primary min-h-screen flex flex-col">
      {/* Admin Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/50 backdrop-blur-md border-b border-white/5 h-20 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex flex-col leading-[0.85]">
            <span className="text-xl md:text-2xl font-black tracking-[-0.05em] text-white">
              ADD<span className="text-accent-teal">MEDIA</span>
            </span>
            <span className="text-[8px] uppercase tracking-[0.3em] text-accent-orange font-extrabold mt-1">
              Admin Portal
            </span>
          </div>
        </div>
        <button onClick={handleLogout} className="lg:hidden p-2 rounded-xl bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors">
          <LogOut size={20} />
        </button>
      </header>
      
      <main className="pt-32 pb-24 flex-grow">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Responsive Sidebar (Desktop) / Bottom Nav (Mobile) */}
            <aside className="lg:w-64 flex-shrink-0 fixed bottom-0 left-0 right-0 z-[60] bg-primary/95 backdrop-blur-xl border-t border-white/5 lg:relative lg:bg-transparent lg:border-none lg:backdrop-blur-none pb-safe lg:pb-0">
              <div className="flex lg:flex-col justify-around lg:justify-start overflow-x-auto hide-scrollbar lg:sticky lg:top-32 px-2 py-3 lg:p-0">
                {tabs.map((tab) => (
                  <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 px-2 py-2 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl transition-all flex-1 lg:flex-none ${
                      activeTab === tab.id 
                        ? 'text-accent-teal lg:bg-accent-teal/10 font-bold' 
                        : 'text-white/40 lg:text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon size={20} className="mb-1 lg:mb-0" />
                    <span className="text-[10px] lg:text-base font-bold uppercase tracking-tighter lg:tracking-normal lg:normal-case">{tab.label}</span>
                  </button>
                ))}
                
                <button 
                  onClick={handleLogout}
                  className="hidden lg:flex items-center gap-3 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-colors lg:mt-8 whitespace-nowrap"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl md:text-4xl font-black capitalize">{activeTab}</h1>
                <button onClick={fetchOrders} className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm hover:border-accent-teal/50 transition-colors cursor-pointer">
                  <RefreshCw size={16} className={`text-accent-teal ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  {/* --- DASHBOARD TAB --- */}
                  {activeTab === 'dashboard' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass p-6 rounded-3xl">
                          <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-1">Total Orders</p>
                          <p className="text-4xl font-black">{orders.length}</p>
                        </div>
                        <div className="glass p-6 rounded-3xl">
                          <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-1">In Progress / Pending</p>
                          <p className="text-4xl font-black text-accent-teal">
                            {orders.filter(o => o.status === 'In Progress' || o.status === 'Pending').length}
                          </p>
                        </div>
                        <div className="glass p-6 rounded-3xl">
                          <p className="text-white/40 text-sm font-bold uppercase tracking-widest mb-1">Estimated Revenue</p>
                          <p className="text-4xl font-black text-accent-orange">
                            ₹{orders.length * 300}
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-2xl font-bold">Recent Orders</h2>
                          <button onClick={() => setActiveTab('orders')} className="text-accent-teal text-sm font-bold hover:underline">View All</button>
                        </div>
                        <div className="glass rounded-[2rem] overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left">
                              <thead>
                                <tr className="border-b border-white/10">
                                  <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Tracking ID</th>
                                  <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Customer</th>
                                  <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                {isLoading ? (
                                  <tr><td colSpan={3} className="px-6 py-4 text-center text-white/40">Loading...</td></tr>
                                ) : recentOrders.length === 0 ? (
                                  <tr><td colSpan={3} className="px-6 py-4 text-center text-white/40">No orders found.</td></tr>
                                ) : (
                                  recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                      <td className="px-6 py-4 font-mono font-bold tracking-widest text-accent-teal text-xs">{order.tracking_id || `...${order.id.slice(-6)}`}</td>
                                      <td className="px-6 py-4">
                                        <div className="font-bold">{order.customer_name}</div>
                                      </td>
                                      <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                          order.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                                          order.status === 'In Progress' ? 'bg-accent-teal/20 text-accent-teal' :
                                          'bg-accent-orange/20 text-accent-orange'
                                        }`}>
                                          {order.status}
                                        </span>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* --- ORDERS TAB --- */}
                  {activeTab === 'orders' && (
                    <div className="glass rounded-[2rem] overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Tracking ID</th>
                              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Customer</th>
                              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Style</th>
                              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Assets & Notes</th>
                              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Status</th>
                              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Date</th>
                              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                              <tr><td colSpan={5} className="px-6 py-8 text-center text-white/40">Loading orders...</td></tr>
                            ) : orders.length === 0 ? (
                              <tr><td colSpan={5} className="px-6 py-8 text-center text-white/40">No orders found.</td></tr>
                            ) : (
                              orders.map((order) => (
                                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                  <td className="px-6 py-4 font-mono font-bold tracking-widest text-accent-teal text-xs">{order.tracking_id || `...${order.id.slice(-6)}`}</td>
                                  <td className="px-6 py-4">
                                    <div className="font-bold">{order.customer_name}</div>
                                    <div className="text-xs text-white/40">{order.email}</div>
                                  </td>
                                  <td className="px-6 py-4 text-sm">{order.style}</td>
                                  <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                      {order.logo_url ? (
                                        <button onClick={() => setPreviewLogo(order.logo_url)} className="p-2 rounded-xl bg-accent-teal/10 text-accent-teal hover:bg-accent-teal/20 transition-colors cursor-pointer" title="View Uploaded Logo">
                                          <ImageIcon size={16} />
                                        </button>
                                      ) : (
                                        <div className="p-2 rounded-xl bg-white/5 text-white/20" title="No logo uploaded">
                                          <ImageIcon size={16} />
                                        </div>
                                      )}
                                      
                                      {order.instructions ? (
                                        <div className="p-2 rounded-xl bg-accent-orange/10 text-accent-orange hover:bg-accent-orange/20 transition-colors cursor-help" title={order.instructions}>
                                          <MessageSquare size={16} />
                                        </div>
                                      ) : (
                                        <div className="p-2 rounded-xl bg-white/5 text-white/20" title="No instructions provided">
                                          <MessageSquare size={16} />
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <select 
                                      value={order.status}
                                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                      disabled={isUpdating === order.id}
                                      className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter outline-none cursor-pointer appearance-none ${
                                        order.status === 'Completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                        order.status === 'In Progress' ? 'bg-accent-teal/20 text-accent-teal border border-accent-teal/30' :
                                        'bg-accent-orange/20 text-accent-orange border border-accent-orange/30'
                                      } ${isUpdating === order.id ? 'opacity-50' : ''}`}
                                    >
                                      <option value="Pending" className="bg-primary text-accent-orange">Pending</option>
                                      <option value="In Progress" className="bg-primary text-accent-teal">In Progress</option>
                                      <option value="Completed" className="bg-primary text-green-400">Completed</option>
                                    </select>
                                  </td>
                                  <td className="px-6 py-4 text-xs text-white/60">
                                    {new Date(order.created_at).toLocaleDateString()}
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <button 
                                      onClick={() => deleteOrder(order)}
                                      disabled={isUpdating === order.id}
                                      className={`p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer ${isUpdating === order.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                      title="Delete Order"
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* --- CUSTOMERS TAB --- */}
                  {activeTab === 'customers' && (
                    <div className="glass rounded-[2rem] overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                          <thead>
                            <tr className="border-b border-white/10">
                              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Name</th>
                              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest">Email</th>
                              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest text-center">Total Orders</th>
                              <th className="px-6 py-4 text-xs font-bold text-white/40 uppercase tracking-widest text-right">Last Active</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                              <tr><td colSpan={4} className="px-6 py-8 text-center text-white/40">Loading...</td></tr>
                            ) : uniqueCustomers.length === 0 ? (
                              <tr><td colSpan={4} className="px-6 py-8 text-center text-white/40">No customers found.</td></tr>
                            ) : (
                              uniqueCustomers.map((customer, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors">
                                  <td className="px-6 py-4 font-bold">{customer.name}</td>
                                  <td className="px-6 py-4 text-white/60 text-sm">{customer.email}</td>
                                  <td className="px-6 py-4 text-center font-black text-accent-teal">{customer.totalOrders}</td>
                                  <td className="px-6 py-4 text-right text-xs text-white/40">
                                    {new Date(customer.lastOrderDate).toLocaleDateString()}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* --- SETTINGS TAB --- */}
                  {activeTab === 'settings' && (
                    <div className="max-w-xl">
                      <div className="glass p-8 rounded-[2rem]">
                        <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                        <form onSubmit={handlePasswordUpdate} className="space-y-6">
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-white/70 uppercase tracking-widest ml-4">New Admin Password</label>
                            <input 
                              type="password" 
                              required
                              placeholder="Enter new password"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-accent-teal transition-colors"
                              value={newPassword}
                              onChange={e => setNewPassword(e.target.value)}
                            />
                            <p className="text-xs text-white/40 ml-4">This password is stored locally for this browser session scope.</p>
                          </div>
                          
                          {passwordMessage && (
                            <p className={`text-sm ml-4 font-bold ${passwordMessage.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                              {passwordMessage}
                            </p>
                          )}

                          <Button type="submit" className="w-full">
                            Update Password
                          </Button>
                        </form>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </main>

      {/* Logo Preview Modal */}
      <AnimatePresence>
        {previewLogo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/95 backdrop-blur-sm"
            onClick={() => setPreviewLogo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] glass rounded-[2rem] overflow-hidden flex flex-col border border-white/10 shadow-2xl"
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10 bg-surface/50">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">Asset Preview</h3>
                <div className="flex gap-4">
                  <a href={previewLogo} target="_blank" rel="noopener noreferrer" className="text-accent-teal hover:text-white transition-colors text-sm font-bold flex items-center gap-2">
                    <ExternalLink size={16} /> Open Original
                  </a>
                  <button onClick={() => setPreviewLogo(null)} className="text-white/40 hover:text-white transition-colors cursor-pointer">
                    <X size={24} />
                  </button>
                </div>
              </div>
              <div className="flex-1 bg-black/20 p-8 overflow-auto flex items-center justify-center min-h-[50vh]">
                {previewLogo.toLowerCase().includes('.pdf') ? (
                  <iframe src={previewLogo} className="w-full h-[70vh] rounded-xl bg-white" title="PDF Preview" />
                ) : previewLogo.toLowerCase().includes('.ai') || previewLogo.toLowerCase().includes('.eps') ? (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ImageIcon size={32} className="text-white/40" />
                    </div>
                    <p className="text-white/60 font-medium">Vector files (.ai, .eps) cannot be previewed in the browser.</p>
                    <a href={previewLogo} target="_blank" rel="noopener noreferrer" className="text-accent-teal hover:underline mt-2 inline-block">Download File</a>
                  </div>
                ) : (
                  <img src={previewLogo} alt="Order Logo" className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl" />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
