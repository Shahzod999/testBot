export interface CompanyState {
  _id: string
  business_id: string
  google_id: string
  place_id: string
  google_mid: string
  phone_number: string
  name: string
  description: string
  latitude: number
  longitude: number
  full_address: string
  review_count: number
  rating: number
  timezone: string
  working_hours: WorkingHours
  website: string
  verified: boolean
  place_link: string
  cid: string
  reviews_link: string
  owner_id: string
  owner_link: string
  owner_name: string
  booking_link: any
  reservations_link: any
  business_status: string
  type: string
  subtypes: string[]
  photos_sample: PhotosSample[]
  reviews_per_rating: ReviewsPerRating
  photo_count: number
  about: About
  address: string
  order_link: any
  price_level: any
  district: string
  street_address: string
  city: string
  zipcode: any
  state: string
  country: string
  owner_telegram_id: any
  location: Location
  logo: string
  logoThumbnail: any
  order_type: any
  is_accept_orders: boolean
  is_partner: boolean
  social_media: SocialMedia
  mobile_apps: MobileApps
  createdBy: string
  dateCreated: number
  deleted: boolean
  created_at: number
  created_by: any
  updated_at: number
  logo_icon_light: string
  logo_icon_dark: string
  payment: any
  is_favorite: boolean
  comments: Comment[]
  truegis_rating: number
  truegis_rating_count: number
}

export interface WorkingHours {
  Monday: string[]
  Tuesday: string[]
  Wednesday: string[]
  Thursday: string[]
  Friday: string[]
  Saturday: string[]
  Sunday: string[]
}

export interface PhotosSample {
  photo_id: string
  photo_url: string
  photo_url_large: string
  type: string
}

export interface ReviewsPerRating {
  "1": number
  "2": number
  "3": number
  "4": number
  "5": number
}

export interface About {
  summary: any
  details: Details
}

export interface Details {
  "Service options": ServiceOptions
  Amenities: Amenities
  Payments: Payments
}

export interface ServiceOptions {
  Delivery: boolean
  "Same-day delivery": boolean
}

export interface Amenities {
  "Wi-Fi": boolean
}

export interface Payments {
  "Credit cards": boolean
  "Debit cards": boolean
  "NFC mobile payments": boolean
}

export interface Location {
  type: string
  coordinates: number[]
}

export interface SocialMedia {
  telegram: string
  instagram: string
  facebook: string
  twitter: any
  youtube: any
  whatsApp?: string
}

export interface MobileApps {
  ios: any
  android: any
}

export interface Comment {
  _id: string
  user_id: string
  rating: number
  message: string
  images: string[]
  thumbnails: string[]
  company_id: string
  status: string
  created_at: number
  deleted: boolean
  replies?: Reply[]
  user: User
}

export interface Reply {
  reply_id: string
  message: string
  reply_by: string
  reply_from: string
  reply_date: number
}

export interface User {
  _id: string
  telegram_id: number
  lang: string
  phone: any
  full_name: any
  step: any
  search_query: any
  telegram_name: string
  telegram_username: string
  telegram_profile_photo: TelegramProfilePhoto
  last_location: LastLocation
  created_at: string
  updated_at: string
  is_blocked: boolean
  is_admin: boolean
  can_order: boolean
}

export interface TelegramProfilePhoto {
  file_id: string
  image: string
  thumbnail: string
}

export interface LastLocation {
  type: string
  coordinates: number[]
}
