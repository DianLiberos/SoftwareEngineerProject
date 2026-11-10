import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  loyaltyPoints?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (arg1: any, arg2?: any) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (arg1: any, arg2?: any) => {
        const token = typeof arg1 === "string" ? arg1 : typeof arg2 === "string" ? arg2 : null;
        const user = typeof arg1 === "object" && arg1 !== null ? arg1 : typeof arg2 === "object" && arg2 !== null ? arg2 : null;
        set({ user, token, isAuthenticated: !!token });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        if (typeof window !== "undefined") {
          localStorage.removeItem("brewlite_auth_storage");
        }
      },

      updateUser: (fields) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...fields } : null,
        })),
    }),
    {
      name: "brewlite_auth_storage",
    }
  )
);