// frontend/services/auth.service.ts
import { AuthResponse } from "@/types";

export const loginApi = async (email: string, password: string): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 600)); // Giả lập độ trễ mạng

  if (!email || !password) {
    throw new Error("Vui lòng nhập đầy đủ email và mật khẩu");
  }

  // Giả lập token JWT chuẩn
  return {
    accessToken: `mock-jwt-token-${Date.now()}`,
    user: {
      id: "usr-101",
      email: email,
      name: email.split("@")[0] || "Khách hàng",
      loyaltyPoints: 50,
    },
  };
};

// Thêm vào frontend/services/auth.service.ts

export const registerApi = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Giả lập độ trễ mạng

  if (!name || !email || !password) {
    throw new Error("Vui lòng điền đầy đủ tất cả các trường");
  }

  if (password.length < 6) {
    throw new Error("Mật khẩu phải có ít nhất 6 ký tự");
  }

  // Giả lập backend tạo user mới và cấp ngay JWT token
  return {
    accessToken: `mock-jwt-token-register-${Date.now()}`,
    user: {
      id: `usr-${Date.now().toString().slice(-4)}`,
      email,
      name,
      loyaltyPoints: 0, 
    },
  };
};