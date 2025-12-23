
import axios from 'axios';
import { User, Video, Comment } from '../types';

// Fallback to localhost if ENV is not defined for local dev
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-firebase-rest-api.firebaseio.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  // Auth
  async checkUsername(username: string): Promise<boolean> {
    try {
      const response = await api.get(`/users.json?orderBy="username"&equalTo="${username}"`);
      return Object.keys(response.data || {}).length > 0;
    } catch (e) { return false; }
  },

  async signup(userData: Omit<User, 'id' | 'cards'>): Promise<User> {
    const response = await api.post('/users.json', { ...userData, cards: [] });
    return { ...userData, id: response.data.name, cards: [] };
  },

  async login(identifier: string): Promise<User | null> {
    // In a real Firebase REST API, you'd fetch all or query by username/email/phone
    // For this example, we'll simulate fetching users and finding a match
    const response = await api.get('/users.json');
    const users = response.data;
    if (!users) return null;

    const userKey = Object.keys(users).find(key => 
      users[key].username === identifier || 
      users[key].email === identifier || 
      users[key].phone === identifier
    );

    return userKey ? { ...users[userKey], id: userKey } : null;
  },

  // Videos
  async getVideos(category?: string): Promise<Video[]> {
    const response = await api.get('/videos.json');
    const data = response.data || {};
    const videos: Video[] = Object.keys(data).map(key => ({ ...data[key], id: key }));
    return category ? videos.filter(v => v.category === category) : videos;
  },

  // Comments
  async getComments(videoId: string): Promise<Comment[]> {
    const response = await api.get('/comments.json');
    const data = response.data || {};
    return Object.keys(data)
      .map(key => ({ ...data[key], id: key }))
      .filter(c => c.videoId === videoId);
  },

  async postComment(comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> {
    const newComment = { ...comment, createdAt: new Date().toISOString() };
    const response = await api.post('/comments.json', newComment);
    return { ...newComment, id: response.data.name };
  },

  // Profile Updates (Spin Wheel Results)
  async updateUserProfile(userId: string, updates: Partial<User>): Promise<void> {
    await api.patch(`/users/${userId}.json`, updates);
  },

  // Contact
  async sendContact(data: any): Promise<void> {
    await api.post('/contact_submissions.json', data);
  }
};
