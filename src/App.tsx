import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Showcase from './pages/Showcase';
import Order from './pages/Order';
import Track from './pages/Track';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import Privacy from './pages/Legal/Privacy';
import Terms from './pages/Legal/Terms';
import { MobileNav } from './components/MobileNav';
import { InstallPrompt } from './components/InstallPrompt';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen pb-24 lg:pb-0">
        <InstallPrompt />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/order" element={<Order />} />
          <Route path="/track" element={<Track />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          
          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
        <MobileNav />
      </div>
    </Router>
  );
}

export default App;
