// frontend/app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { getMyOrdersApi } from "@/services/order.service";
import { Order } from "@/types";

export default function ProfilePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    getMyOrdersApi().then((data) => {
      setOrders(data);
      setLoadingOrders(false);
    });
  }, [isAuthenticated, router]);

  if (!mounted || !isAuthenticated || !user) return null;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-neutral-900/80 backdrop-blur border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-white">Tài khoản cá nhân</h1>
        </div>

        <button
          onClick={handleLogout}
          className="text-xs text-rose-400 hover:text-rose-300 font-medium px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-lg transition active:scale-95"
        >
          Đăng xuất
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-6 space-y-6">
        {/* Card Thông tin User */}
        <section className="bg-neutral-800/60 border border-neutral-800 rounded-3xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center text-2xl font-black">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user.name}</h2>
              <p className="text-xs text-neutral-400 mt-0.5">{user.email}</p>
              <div className="inline-flex items-center gap-1.5 mt-2 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md text-xs font-semibold text-amber-400">
                <span>⭐ {user.loyaltyPoints || 0} điểm thưởng</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lịch sử giao dịch (Task 9: GET /orders/me) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Lịch sử đặt hàng</h3>
            <span className="text-xs text-neutral-400">{orders.length} đơn</span>
          </div>

          {loadingOrders ? (
            <div className="text-center py-10 text-xs text-neutral-500">Đang tải lịch sử...</div>
          ) : orders.length === 0 ? (
            <div className="bg-neutral-800/30 border border-neutral-800 rounded-2xl p-8 text-center text-neutral-400">
              <p className="text-sm">Bạn chưa có đơn đặt hàng nào.</p>
              <Link href="/" className="inline-block mt-3 text-xs text-amber-400 font-semibold hover:underline">
                Đặt món ngay &rarr;
              </Link>
            </div>
          ) : (
            <div className="space-y-3.5">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-neutral-800/50 border border-neutral-800 rounded-2xl p-4.5 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-neutral-800/80 pb-2.5">
                    <div>
                      <span className="font-mono font-bold text-sm text-white">#{ord.id}</span>
                      <span className="text-xs text-neutral-500 ml-2">
                        {new Date(ord.createdAt).toLocaleDateString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </span>
                    </div>
                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded">
                      {ord.status}
                    </span>
                  </div>

                  {/* Chi tiết từng món trong đơn */}
                  <div className="space-y-1 text-xs text-neutral-300">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>
                          {it.name} ({it.size.name}) x{it.qty}
                        </span>
                        <span className="text-neutral-400">{it.lineTotal.toLocaleString("vi-VN")} đ</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-neutral-800/60 text-xs">
                    <span className="text-neutral-400">Tổng thanh toán</span>
                    <span className="font-bold text-amber-400 text-sm">
                      {ord.total.toLocaleString("vi-VN")} đ
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}