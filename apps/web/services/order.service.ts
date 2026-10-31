import { CartItem, Order, OrderStatus } from "@/types";

export interface CreateOrderPayload {
  userId: string;
  items: CartItem[];
  couponCode?: string;
}

export interface PaymentPayload {
  orderId: string;
  method: "WALLET" | "BANK_CARD";
  idempotencyKey: string;
}

export const DEMO_BACKEND_USER_ID = "user-demo-01";

interface ApiOrderItem {
  productId: string;
  name: string;
  sizeName: string | null;
  sizePrice: number;
  toppingsPrice: number;
  toppings: CartItem["toppings"];
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

interface ApiOrder {
  id: string;
  userId: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
  items: ApiOrderItem[];
}

interface ApiPayment {
  orderId: string;
  order: {
    id: string;
    status: OrderStatus;
  };
}

const API_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001").replace(
  /\/$/,
  "",
);

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as
      | { message?: string | string[] }
      | null;
    const message = Array.isArray(body?.message)
      ? body.message.join(", ")
      : body?.message;
    throw new Error(message || `Request failed (${response.status})`);
  }

  return response.json() as Promise<T>;
}

function mapOrder(order: ApiOrder): Order {
  return {
    id: order.id,
    userId: order.userId,
    status: order.status,
    total: order.total,
    createdAt: order.createdAt,
    items: order.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      basePrice: item.unitPrice - item.sizePrice - item.toppingsPrice,
      size: {
        name: item.sizeName ?? "S",
        price: item.sizePrice,
      },
      toppings: item.toppings,
      qty: item.quantity,
      lineTotal: item.lineTotal,
    })),
  };
}

export const createOrderApi = async (
  payload: CreateOrderPayload,
): Promise<Order> => {
  const order = await request<ApiOrder>("/orders", {
    method: "POST",
    body: JSON.stringify({
      userId: payload.userId,
      items: payload.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        qty: item.qty,
        basePrice: item.basePrice,
        lineTotal: item.lineTotal,
        size: item.size,
        toppings: item.toppings,
      })),
      couponCode: payload.couponCode,
    }),
  });
  return mapOrder(order);
};

export const processPaymentApi = async (
  payload: PaymentPayload,
): Promise<{ orderId: string; status: OrderStatus }> => {
  const payment = await request<ApiPayment>("/payments", {
    method: "POST",
    headers: { "Idempotency-Key": payload.idempotencyKey },
    body: JSON.stringify({
      orderId: payload.orderId,
      method: payload.method,
    }),
  });
  return {
    orderId: payment.order.id,
    status: payment.order.status,
  };
};

export const getMyOrdersApi = async (userId: string): Promise<Order[]> => {
  const orders = await request<ApiOrder[]>(
    `/orders/user/${encodeURIComponent(userId)}`,
  );
  return orders.map(mapOrder);
};

export const getLoyaltyPointsApi = async (
  userId: string,
): Promise<number> => {
  const loyalty = await request<{ id: string; loyaltyPoints: number }>(
    `/users/${encodeURIComponent(userId)}/loyalty`,
  );
  return loyalty.loyaltyPoints;
};
