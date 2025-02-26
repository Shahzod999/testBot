export interface MenuTypeTotal {
  status: string;
  data: MenuType[];
}

export interface MenuType {
  _id: string;
  name: string;
  description: string;
  image: string;
  imageThumbnail: string;
  company_id: string;
  category_id: string;
  price: number;
  weight: string;
  currency: string;
  active: boolean;
  created_by: string;
  created_at: number;
  deleted: boolean;
  updated_at?: number;
  updated_by?: string;
  discount?: Discount;
  category: CategoryType;
}

export interface Discount {
  _id: string;
  product_id: string;
  company_id: string;
  percent: number;
  price: number;
  discounted_price: number;
  active: boolean;
  start_date: string;
  end_date: string;
  created_by: string;
  created_at: number;
  deleted: boolean;
}

export interface CategoryType {
  _id: string;
  name: string;
  image: string;
  imageThumbnail: string;
  company_id: string;
  created_by: string;
  created_at: number;
  deleted: boolean;
}




/// Single Prod


export interface SingleProdTypeTotal {
  status: string
  data: SingleProdType
}

export interface SingleProdType {
  _id: string
  name: string
  description: string
  image: string
  imageThumbnail: string
  company_id: string
  category_id: string
  price: number
  weight: string
  currency: string
  active: boolean
  created_by: string
  created_at: number
  deleted: boolean
  category: Category
  similar_products: SimilarProduct[]
}

export interface Category {
  _id: string
  name: string
  image: string
  imageThumbnail: string
  company_id: string
  created_by: string
  created_at: number
  deleted: boolean
}

export interface SimilarProduct {
  _id: string
  name: string
  description: string
  image: string
  imageThumbnail: string
  company_id: string
  category_id: string
  price: number
  weight: string
  currency: string
  active: boolean
  created_by: string
  created_at: number
  deleted: boolean
  updated_at: number
  updated_by: string
  discount: Discount
}

export interface Discount {
  _id: string
  product_id: string
  company_id: string
  percent: number
  price: number
  discounted_price: number
  active: boolean
  start_date: string
  end_date: string
  created_by: string
  created_at: number
  deleted: boolean
}



