
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { User } from '../types';

interface SignupProps {
  onLogin: (user: User) => void;
}

const Signup: React.FC<SignupProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const exists = await apiService.checkUsername(formData.username);
    if (exists) {
      alert("Username already taken. Please choose another one.");
      setLoading(false);
      return;
    }

    const newUser = await apiService.signup({
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
    });
    
    setLoading(false);
    onLogin(newUser);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-3xl shadow-xl border border-gray-100">
      <h2 className="text-3xl font-black mb-2 text-center">Create Account</h2>
      <p className="text-center text-gray-500 mb-8">Join the largest video commerce platform.</p>
      
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
          <input
            type="text"
            required
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            required
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            required
            className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-md mt-4"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
