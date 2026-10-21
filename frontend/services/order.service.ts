// frontend/services/order.service.ts
import { CartItem, Order, OrderStatus } from "@/types";

export interface CreateOrderPayload {
  userId: string;
  items: CartItem[];
  total: number;
}

export interface PaymentPayload {
  orderId: string;
  amount: number;
  method: "WALLET" | "BANK_CARD";
  idempotencyKey: string;
}

const ORDERS_KEY = "brewlite_orders_history";

export const createOrderApi = async (payload: CreateOrderPayload): Promise<Order> => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const randomOrderId = Math.floor(1000 + Math.random() * 9000).toString();

  const newOrder: Order = {
    id: randomOrderId,
    userId: payload.userId,
    status: "PAID", // Giả lập sau khi thanh toán thành công
    total: payload.total,
    createdAt: new Date().toISOString(),
    items: payload.items,
  };

  // Lưu tạm vào LocalStorage để trang Profile đọc được (mock GET /orders/me)
  if (typeof window !== "undefined") {
    const existing = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
    localStorage.setItem(ORDERS_KEY, JSON.stringify([newOrder, ...existing]));
  }

  return newOrder;
};

export const processPaymentApi = async (
  payload: PaymentPayload
): Promise<{ orderId: string; status: OrderStatus }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    orderId: payload.orderId,
    status: "PAID",
  };
};

// Mock API: GET /orders/me (Lấy lịch sử đơn theo Task 9)
export const getMyOrdersApi = async (): Promise<Order[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  }
  return [];
};