export interface ProductOption {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  basePrice: number;
  imageUrl: string;
  stock: number;
  sizes?: ProductOption[];
  toppings?: ProductOption[];
  isActive?: boolean;
  description?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  basePrice: number;
  size: ProductOption;
  toppings: ProductOption[];
  qty: number;
  lineTotal: number;
}

export type OrderStatus = 
  | 'PENDING' 
  | 'PAID' 
  | 'PAYMENT_FAILED' 
  | 'PREPARING' 
  | 'READY' 
  | 'COMPLETED' 
  | 'CANCELLED';

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
  items: CartItem[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  loyaltyPoints?: number;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}