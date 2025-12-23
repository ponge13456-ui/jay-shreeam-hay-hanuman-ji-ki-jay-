
export interface User {
  id: string;
  username: string;
  email: string;
  phone: string;
  cards: string[];
  role?: 'customer' | 'influencer' | 'seller';
}

export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  description: string;
  category: 'customer' | 'influencer' | 'seller';
  author: string;
}

export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  username: string;
  text: string;
  createdAt: string;
  adminReply?: string;
}

export interface SpinResult {
  label: string;
  type: 'card' | 'discount' | 'extra' | 'bad_luck';
}
