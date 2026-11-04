import { CartItem, Order, OrderStatus } from "@/types";

export const DEMO_BACKEND_USER_ID = "user-demo-01";

export interface CreateOrderPayload {
  userId?: string;
  items: CartItem[];
  total?: number;
  couponCode?: string;
}

export interface PaymentPayload {
  orderId: string;
  method: "WALLET" | "BANK_CARD";
  idempotencyKey?: string;
  amount?: number;
}

const getApiUrl = () => {
  if (typeof window !== "undefined") {
    return `http://${window.location.hostname}:3001`;
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
};

// Tạo đơn hàng mới trong PostgreSQL
export const createOrderApi = async (payload: CreateOrderPayload): Promise<Order> => {
  const API_URL = getApiUrl();
  const requestBody: Record<string, any> = {
    userId: payload.userId || DEMO_BACKEND_USER_ID,
    items: payload.items.map((item: any) => ({
      productId: String(item.product?.id || item.productId || item.id || "1"),
      quantity: Number(item.qty || item.quantity || 1),
    })),
  };

  if (payload.couponCode) {
    requestBody.couponCode = payload.couponCode;
  }

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Không thể tạo đơn hàng trên server");
  }

  return res.json();
};

// Thanh toán đơn hàng: POST /payments
export const processPaymentApi = async (
  payload: PaymentPayload
): Promise<{ orderId: string; status: OrderStatus }> => {
  const API_URL = getApiUrl();
  const res = await fetch(`${API_URL}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": payload.idempotencyKey || `pay-${payload.orderId}-${Date.now()}`,
    },
    body: JSON.stringify({
      orderId: payload.orderId,
      method: payload.method,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Thanh toán thất bại");
  }

  return res.json();
};

// Lấy lịch sử đơn từ PostgreSQL: GET /orders/user/:userId
export const getMyOrdersApi = async (userId: string = DEMO_BACKEND_USER_ID): Promise<Order[]> => {
  try {
    const API_URL = getApiUrl();
    const res = await fetch(`${API_URL}/orders/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Lỗi kết nối Backend:", error);
    return [];
  }
};