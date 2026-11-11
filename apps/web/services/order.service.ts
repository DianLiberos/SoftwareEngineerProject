import { useAuthStore } from "@/store/useAuthStore";
import { Order, OrderStatus } from "@/types";

const getApiUrl = () => {
  if (typeof window !== "undefined") {
    return `http://${window.location.hostname}:3001`;
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
};

// Khai báo rõ ràng các Type/Interface
export interface CreateOrderItemPayload {
  productId: string;
  sizeName?: string;
  toppings?: string[];
  quantity: number;
}

export interface CreateOrderPayload {
  userId?: string;
  items: Array<CreateOrderItemPayload | any>;
  couponCode?: string;
}

export interface PaymentPayload {
  orderId: string;
  method: "WALLET" | "BANK_CARD";
  idempotencyKey?: string;
  amount?: number;
}

// Hàm tạo đơn hàng
export const createOrderApi = async (payload: CreateOrderPayload): Promise<Order> => {
  const API_URL = getApiUrl();
  const currentUser = useAuthStore.getState().user;
  const targetUserId = payload.userId || currentUser?.id;

  if (!targetUserId) {
    throw new Error("Vui lòng đăng nhập tài khoản để tiến hành đặt hàng");
  }

  const normalizedItems = payload.items.map((item: any) => {
    const sizeName =
      item.size?.name ||
      (typeof item.size === "string" ? item.size : item.sizeName);

    const toppingsList = Array.isArray(item.toppings)
      ? item.toppings.map((t: any) => ({
          name: typeof t === "string" ? t : t.name,
          price:
            typeof t === "object" && typeof t.price === "number" ? t.price : 0,
        }))
      : [];

    return {
      productId: String(item.product?.id || item.productId || item.id),
      quantity: Number(item.qty || item.quantity || 1),
      size: sizeName ? { name: sizeName } : undefined,
      sizeName: sizeName || undefined,
      toppings: toppingsList,
    };
  });

  const requestBody: Record<string, any> = {
    userId: targetUserId,
    items: normalizedItems,
  };

  if (payload.couponCode && payload.couponCode.trim() !== "") {
    requestBody.couponCode = payload.couponCode.trim().toUpperCase();
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
    throw new Error(errorData.message || "Không thể khởi tạo đơn hàng trên máy chủ");
  }

  return res.json();
};

export const createOrder = createOrderApi;

// Hàm xử lý thanh toán (Bảo vệ bằng Idempotency-Key chống trừ tiền kép)
export const processPaymentApi = async (
  payload: PaymentPayload
): Promise<{ orderId: string; status: OrderStatus }> => {
  const API_URL = getApiUrl();
  const idempotencyKey = payload.idempotencyKey || `pay-${payload.orderId}-${Date.now()}`;

  const res = await fetch(`${API_URL}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      orderId: payload.orderId,
      method: payload.method,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Giao dịch thanh toán thất bại");
  }

  return res.json();
};

export const payOrder = processPaymentApi;

// Lấy lịch sử đơn hàng của tài khoản đang đăng nhập
export const getMyOrdersApi = async (userId?: string): Promise<Order[]> => {
  try {
    const API_URL = getApiUrl();
    const currentUserId = userId || useAuthStore.getState().user?.id;

    if (!currentUserId) return [];

    const res = await fetch(`${API_URL}/orders/user/${currentUserId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Lỗi khi tải lịch sử đơn hàng:", error);
    return [];
  }
};

// Hủy đơn hàng và hoàn lại tồn kho: PATCH /orders/:id/cancel
export const cancelOrderApi = async (
  orderId: string,
  reason?: string
): Promise<Order> => {
  const API_URL = getApiUrl();
  const res = await fetch(`${API_URL}/orders/${orderId}/cancel`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reason }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Không thể hủy đơn hàng này");
  }

  return res.json();
};