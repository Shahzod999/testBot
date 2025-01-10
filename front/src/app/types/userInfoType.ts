export interface UserInfoType {
    _id: string
    telegram_id: number
    lang: string
    phone: any
    full_name: any
    step: any
    search_query: any
    telegram_name: string
    telegram_username: string
    telegram_profile_photo: any
    last_location: LastLocation
    created_at: string
    updated_at: string
    is_blocked: boolean
    is_admin: boolean
    can_order: boolean
    last_activity: string
    role: string
  }
  
  export interface LastLocation {
    type: string
    coordinates: number[]
  }
  