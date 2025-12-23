
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center">
              <i className="fas fa-play-circle mr-2"></i>
              SocialConnect
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/customer" className="text-gray-600 hover:text-indigo-600 font-medium">Customers</Link>
            <Link to="/influencer" className="text-gray-600 hover:text-indigo-600 font-medium">Influencers</Link>
            <Link to="/seller" className="text-gray-600 hover:text-indigo-600 font-medium">Sellers</Link>
            <Link to="/spin" className="text-gray-600 hover:text-indigo-600 font-medium">Spin & Win</Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-700 font-semibold flex items-center">
                  <i className="fas fa-user-circle mr-2 text-xl"></i>
                  {user.username}
                </Link>
                <button onClick={handleLogout} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium">Login</Link>
                <Link to="/signup" className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 space-y-2">
          <Link to="/customer" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Customers</Link>
          <Link to="/influencer" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Influencers</Link>
          <Link to="/seller" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Sellers</Link>
          <Link to="/spin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Spin & Win</Link>
          <hr />
          {user ? (
            <>
              <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600">Profile ({user.username})</Link>
              <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700">Login</Link>
              <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
