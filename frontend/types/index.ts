// 1. Menu & Chi tiết
export interface ProductOption {
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
  sizes?: ProductOption[];
  toppings?: ProductOption[];
}

// 2. Khuôn mẫu cho món hàng trong giỏ  
export interface CartItem {
  productId: string;
  name: string;
  basePrice: number;
  size: ProductOption;
  toppings: ProductOption[];
  qty: number;
  lineTotal: number; // (basePrice + size.price + sum(toppings)) * qty
}

// 3. Máy trạng thái đơn hàng (Order State Machine - Task 10)
export type OrderStatus = 
  | 'PENDING' 
  | 'PAID' 
  | 'PAYMENT_FAILED' 
  | 'PREPARING' 
  | 'READY' 
  | 'COMPLETED' 
  | 'CANCELLED';

// 4. Khuôn mẫu cho Đơn hàng trả về từ Backend
export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
  items: CartItem[];
}