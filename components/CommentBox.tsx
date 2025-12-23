
import React, { useState, useEffect } from 'react';
import { Comment, User } from '../types';
import { apiService } from '../services/apiService';

interface CommentBoxProps {
  videoId: string;
  currentUser: User | null;
}

const CommentBox: React.FC<CommentBoxProps> = ({ videoId, currentUser }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComments();
  }, [videoId]);

  const loadComments = async () => {
    setLoading(true);
    const data = await apiService.getComments(videoId);
    setComments(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please login to comment");
      return;
    }
    if (!newCommentText.trim()) return;

    try {
      const posted = await apiService.postComment({
        videoId,
        userId: currentUser.id,
        username: currentUser.username,
        text: newCommentText,
      });
      setComments([posted, ...comments]);
      setNewCommentText('');
    } catch (err) {
      alert("Error posting comment");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Comments ({comments.length})</h3>
      
      {currentUser && (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
            rows={3}
            placeholder="Add a public comment..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button 
              type="submit" 
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              Post Comment
            </button>
          </div>
        </form>
      )}

      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold mr-2">
                  {comment.username[0].toUpperCase()}
                </div>
                <div>
                  <span className="font-bold text-sm">{comment.username}</span>
                  <span className="text-gray-400 text-xs ml-2">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="text-gray-700">{comment.text}</p>
              
              {comment.adminReply && (
                <div className="mt-3 ml-6 p-3 bg-gray-50 border-l-4 border-indigo-400 rounded-r-lg">
                  <div className="flex items-center mb-1">
                    <i className="fas fa-shield-alt text-indigo-600 mr-2 text-xs"></i>
                    <span className="font-bold text-xs uppercase text-indigo-600 tracking-wider">Admin Reply</span>
                  </div>
                  <p className="text-sm text-gray-600 italic">{comment.adminReply}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentBox;
