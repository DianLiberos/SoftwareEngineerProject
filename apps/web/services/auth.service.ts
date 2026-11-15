const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Hàm đăng nhập nhận email, password
export const loginApi = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Đăng nhập không thành công");
  }

  return res.json();
};

// Hàm đăng ký nhận name, email, password
export const registerApi = async (data: { name: string; email: string; password: string }) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Đăng ký không thành công");
  }

  return res.json();
};

export const authApi = {
  login: loginApi,
  register: registerApi,
  async getMe(token: string) {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Phiên đăng nhập hết hạn");
    return res.json();
  },
};
