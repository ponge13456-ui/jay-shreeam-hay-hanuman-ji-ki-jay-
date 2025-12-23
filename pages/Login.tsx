
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const user = await apiService.login(identifier);
    setLoading(false);
    
    if (user) {
      // In mock, any password works
      onLogin(user);
      navigate('/');
    } else {
      alert("Invalid credentials. Try your username, email, or phone.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-black mb-6 text-center">Welcome Back</h2>
      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Username, Email, or Phone</label>
          <input
            type="text"
            required
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
          <input
            type="password"
            required
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-md"
        >
          {loading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>
      <p className="mt-8 text-center text-gray-600">
        Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold">Sign up now</Link>
      </p>
    </div>
  );
};

export default Login;
