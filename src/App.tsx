import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Showcase from './pages/Showcase';
import Order from './pages/Order';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import { MobileNav } from './components/MobileNav';
import { InstallPrompt } from './components/InstallPrompt';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen pb-16 lg:pb-0">
        <InstallPrompt />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/order" element={<Order />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
        <MobileNav />
      </div>
    </Router>
  );
}

export default App;
