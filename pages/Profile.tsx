
import React from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  if (!user) return <div className="text-center p-20">Please log in to view your profile.</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center gap-8 mb-10">
        <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center text-white text-5xl font-black">
          {user.username[0].toUpperCase()}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black text-gray-900">{user.username}</h1>
          <p className="text-gray-500 mt-1">{user.email} • {user.phone}</p>
          <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
             <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">Member Since 2024</span>
             <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-wider">Verified Account</span>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <i className="fas fa-id-card mr-3 text-indigo-600"></i>
        My Cards Collection
      </h2>

      {user.cards && user.cards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {user.cards.map((card, i) => (
            <div key={i} className="relative group overflow-hidden">
               <div className={`p-8 rounded-2xl text-white shadow-xl h-48 flex flex-col justify-between ${
                 card.includes('Premium') ? 'bg-gradient-to-br from-indigo-500 to-indigo-800' :
                 card.includes('Platinum') ? 'bg-gradient-to-br from-gray-700 to-black' :
                 'bg-gradient-to-br from-yellow-500 to-orange-700'
               }`}>
                  <div>
                    <i className="fas fa-crown text-2xl opacity-50"></i>
                  </div>
                  <div className="text-xl font-black tracking-widest">{card.toUpperCase()}</div>
                  <div className="flex justify-between items-end">
                    <span className="text-xs opacity-75">#{Math.floor(Math.random() * 9000) + 1000}</span>
                    <i className="fas fa-wifi rotate-90 opacity-50"></i>
                  </div>
               </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-20 text-center text-gray-400">
           <i className="fas fa-gift text-5xl mb-4 opacity-20"></i>
           <p className="text-lg">No cards yet! Spin the wheel to win one.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
