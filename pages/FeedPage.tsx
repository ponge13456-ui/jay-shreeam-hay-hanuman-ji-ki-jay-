
import React, { useState, useEffect } from 'react';
import { Video, User } from '../types';
import { apiService } from '../services/apiService';
import VideoPlayer from '../components/VideoPlayer';
import CommentBox from '../components/CommentBox';

interface FeedPageProps {
  role: 'customer' | 'influencer' | 'seller';
  user: User | null;
}

const FeedPage: React.FC<FeedPageProps> = ({ role, user }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      const data = await apiService.getVideos(role);
      setVideos(data);
      if (data.length > 0) setSelectedVideo(data[0]);
      setLoading(false);
    };
    fetchVideos();
  }, [role]);

  const handleApplication = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application submitted successfully! Our team will contact you soon.");
    setShowModal(false);
  };

  if (loading) return <div className="p-20 text-center text-indigo-600 font-bold">Loading {role} feed...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Player Area */}
        <div className="lg:w-2/3">
          {selectedVideo ? (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="aspect-video bg-black relative">
                 <iframe 
                  className="w-full h-full"
                  src={selectedVideo.url.replace('watch?v=', 'embed/')} 
                  title={selectedVideo.title}
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold mb-1">{selectedVideo.title}</h1>
                    <p className="text-indigo-600 font-medium">By {selectedVideo.author}</p>
                  </div>
                  {(role === 'influencer' || role === 'seller') && (
                    <button 
                      onClick={() => setShowModal(true)}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition"
                    >
                      {role === 'influencer' ? 'Apply for Job' : 'Request Partnership'}
                    </button>
                  )}
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-gray-600">
                  {selectedVideo.description}
                </div>
                
                <CommentBox videoId={selectedVideo.id} currentUser={user} />
              </div>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center text-gray-500 italic">
              No videos available in this category.
            </div>
          )}
        </div>

        {/* Sidebar Feed */}
        <div className="lg:w-1/3">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <i className="fas fa-list-ul mr-2 text-indigo-600"></i>
            Up Next
          </h2>
          <div className="space-y-4 max-h-[1000px] overflow-y-auto pr-2">
            {videos.map((v) => (
              <div 
                key={v.id} 
                className={`flex gap-3 p-2 rounded-xl cursor-pointer transition border ${selectedVideo?.id === v.id ? 'bg-indigo-50 border-indigo-200' : 'hover:bg-gray-50 border-transparent'}`}
                onClick={() => setSelectedVideo(v)}
              >
                <img src={v.thumbnail || `https://picsum.photos/seed/${v.id}/160/90`} className="w-32 aspect-video object-cover rounded-lg shadow-sm" alt="" />
                <div className="flex-1">
                  <h3 className="font-bold text-sm line-clamp-2">{v.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{v.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 relative">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h2 className="text-2xl font-bold mb-2">
              {role === 'influencer' ? 'Job Application' : 'Partnership Request'}
            </h2>
            <p className="text-gray-500 mb-6">Tell us about your interest in this project.</p>
            <form onSubmit={handleApplication} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <input required className="w-full p-2 border rounded-lg" defaultValue={user?.username} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Portfolio/Link</label>
                <input required className="w-full p-2 border rounded-lg" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Motivation</label>
                <textarea required className="w-full p-2 border rounded-lg" rows={4} placeholder="Why you?" />
              </div>
              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedPage;
