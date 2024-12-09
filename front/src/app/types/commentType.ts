export interface CommentType {
  status: string;
  data: SingleComment[];
  pagination: Pagination;
}

export interface SingleComment {
  _id: string;
  user_id: string;
  rating: number;
  message: string;
  images: string[];
  thumbnails: string[];
  company_id: string;
  status: string;
  created_at: number;
  deleted: boolean;
  user: User;
  replies: Reply[];
}

export interface Reply {
  reply_id: string;
  message: string;
  reply_by: string;
  reply_from: string;
  reply_date: number;
}

export interface User {
  _id: string;
  telegram_id: number;
  lang: string;
  phone: any;
  full_name: any;
  step: any;
  search_query: any;
  telegram_name: string;
  telegram_username: string;
  telegram_profile_photo: TelegramProfilePhoto;
  last_location: LastLocation;
  created_at: string;
  updated_at: string;
  is_blocked: boolean;
  is_admin: boolean;
  can_order: boolean;
}

export interface TelegramProfilePhoto {
  file_id: string;
  image: string;
  thumbnail: string;
}

export interface LastLocation {
  latitude: number;
  longitude: number;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}
