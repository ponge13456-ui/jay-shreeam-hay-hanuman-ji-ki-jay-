
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { User } from './types';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FeedPage from './pages/FeedPage';
import Profile from './pages/Profile';
import SpinWheel from './components/SpinWheel';
import { PrivacyPolicy, ContactPage } from './pages/StaticPages';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('social_connect_user');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogin = (u: User) => {
    setUser(u);
    localStorage.setItem('social_connect_user', JSON.stringify(u));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('social_connect_user');
  };

  const handleUpdateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('social_connect_user', JSON.stringify(updated));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
            <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup onLogin={handleLogin} />} />
            
            <Route path="/customer" element={<FeedPage role="customer" user={user} />} />
            <Route path="/influencer" element={<FeedPage role="influencer" user={user} />} />
            <Route path="/seller" element={<FeedPage role="seller" user={user} />} />
            
            <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
            <Route path="/spin" element={user ? (
                <div className="max-w-4xl mx-auto py-12 px-4 text-center">
                  <h1 className="text-4xl font-black mb-2">Spin & Win</h1>
                  <p className="text-gray-500 mb-10">Try your luck to win exclusive member cards and discounts!</p>
                  <SpinWheel user={user} onUpdateUser={handleUpdateUser} />
                </div>
              ) : <Navigate to="/login" />
            } />

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <footer className="bg-white border-t border-gray-100 py-10 mt-20">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-indigo-600 font-black text-xl">SocialConnect</div>
            <div className="flex space-x-8 text-gray-500 text-sm font-medium">
              <Link to="/privacy" className="hover:text-indigo-600">Privacy Policy</Link>
              <Link to="/contact" className="hover:text-indigo-600">Contact Us</Link>
              <a href="#" className="hover:text-indigo-600">Terms of Service</a>
            </div>
            <div className="flex space-x-4">
              <i className="fab fa-facebook text-gray-400 hover:text-indigo-600 cursor-pointer"></i>
              <i className="fab fa-instagram text-gray-400 hover:text-indigo-600 cursor-pointer"></i>
              <i className="fab fa-twitter text-gray-400 hover:text-indigo-600 cursor-pointer"></i>
            </div>
          </div>
          <p className="text-center text-gray-400 text-xs mt-8">&copy; 2024 SocialConnect Platforms Inc. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
