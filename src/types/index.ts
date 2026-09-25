export type ProductCategory = 
  | 'All' 
  | 'Master eBooks'
  | 'Notion OS'
  | 'SaaS Boilerplates' 
  | 'UI Kits & Design' 
  | '3D & Graphics' 
  | 'Dashboards';

export type LicenseType = 'standard' | 'team';

export interface ProductLicensePrice {
  standard: number;
  team: number;
}

export interface ProductDeliverable {
  name: string;
  format: string;
  size: string;
}

export interface ProductReview {
  id: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  featured: boolean;
  isNew?: boolean;
  price: ProductLicensePrice;
  originalPrice: ProductLicensePrice;
  rating: number;
  reviewCount: number;
  salesCount: number;
  tags: string[];
  bannerImage: string;
  galleryImages: string[];
  demoUrl?: string;
  whopUrl?: string;
  deliverables: ProductDeliverable[];
  features: string[];
  techStack: string[];
  compatibility: string[];
  version: string;
  lastUpdated: string;
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  license: LicenseType;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  razorpayPaymentId?: string;
}
