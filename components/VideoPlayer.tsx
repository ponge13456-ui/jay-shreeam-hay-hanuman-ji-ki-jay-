
import React from 'react';
import { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
  onClick: (video: Video) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
      onClick={() => onClick(video)}
    >
      <div className="relative aspect-video bg-black">
        <img 
          src={video.thumbnail || `https://picsum.photos/seed/${video.id}/640/360`} 
          alt={video.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
          <i className="fas fa-play text-white text-5xl"></i>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 line-clamp-1">{video.title}</h3>
        <p className="text-gray-500 text-sm mt-1">By {video.author}</p>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
