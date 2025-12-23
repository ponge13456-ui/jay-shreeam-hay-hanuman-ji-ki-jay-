
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
          Connect, Create, <span className="text-indigo-600">Conquer.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
          The ultimate platform for video creators and merchants. 
          Discover opportunities, earn rewards, and grow your brand.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg">
            Join the Community
          </Link>
          <Link to="/customer" className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition shadow-sm">
            Explore Content
          </Link>
        </div>
      </div>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {[
          { icon: 'fa-users', title: 'For Customers', desc: 'Watch amazing content and interact with your favorite creators.' },
          { icon: 'fa-video', title: 'For Influencers', desc: 'Find high-paying jobs and showcase your talent to top brands.' },
          { icon: 'fa-shop', title: 'For Sellers', desc: 'Scale your business with professional influencers and partnerships.' },
        ].map((feat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4 text-xl">
              <i className={`fas ${feat.icon}`}></i>
            </div>
            <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
            <p className="text-gray-600">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
