"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { cancelOrderApi, getMyOrdersApi } from "@/services/order.service";

export default function ProfilePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  const handleCancelOrder = async (orderId: string) => {
    if (
      !confirm(
        "Bạn có chắc chắn muốn hủy đơn hàng này không? Số lượng thức uống sẽ được hoàn trả lại vào kho."
      )
    ) {
      return;
    }

    setCancellingId(orderId);
    try {
      await cancelOrderApi(orderId);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "CANCELLED" } : o))
      );
      alert("Đã hủy đơn hàng thành công và hoàn trả tồn kho!");
    } catch (err: any) {
      alert(err.message || "Không thể hủy đơn hàng này");
    } finally {
      setCancellingId(null);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!isAuthenticated || !user?.id) {
      router.push("/login?redirect=/profile");
      return;
    }

    setLoadingOrders(true);
    getMyOrdersApi(user.id)
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Lỗi tải đơn hàng:", err))
      .finally(() => setLoadingOrders(false));
  }, [mounted, isAuthenticated, user?.id, router]);

  if (!mounted || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-neutral-400">Đang tải hồ sơ...</span>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const avatarLetter = (user?.name?.trim()?.charAt(0) || "U").toUpperCase();
  const points = user.loyaltyPoints ?? 0;
  const isStaff = user?.role === "BARISTA" || user?.role === "ADMIN";

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-neutral-950/80 backdrop-blur border-b border-neutral-800">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 text-neutral-400 hover:text-white bg-neutral-900 rounded-lg transition active:scale-95"
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
        {/* User Card */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center text-2xl font-black shrink-0">
              {avatarLetter}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white truncate">{user.name || "Khách hàng"}</h2>
                {user.role && (
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      user.role === "ADMIN"
                        ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                        : user.role === "BARISTA"
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                        : "bg-neutral-800 border-neutral-700 text-neutral-400"
                    }`}
                  >
                    {user.role}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 mt-0.5 truncate">{user.email}</p>
              <div className="inline-flex items-center gap-1.5 mt-2 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md text-xs font-semibold text-amber-400">
                <span>⭐ {points.toLocaleString("vi-VN")} điểm thưởng</span>
              </div>
            </div>
          </div>
        </section>

        {/* Lối tắt sang Màn hình Barista KDS: Chỉ hiển thị cho BARISTA hoặc ADMIN */}
        {isStaff && (
          <div className="bg-neutral-900 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">☕</span>
              <div>
                <p className="text-sm font-semibold text-white">Màn hình Barista (KDS)</p>
                <p className="text-xs text-neutral-400">Dành cho nhân viên quầy nhận đơn & pha chế</p>
              </div>
            </div>
            <Link
              href="/barista"
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-xl text-xs font-bold transition active:scale-95"
            >
              Mở KDS &rarr;
            </Link>
          </div>
        )}

        {/* Lịch sử đơn hàng từ PostgreSQL */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white">Lịch sử đặt hàng</h3>
            <span className="text-xs text-neutral-400 font-medium">{orders.length} đơn</span>
          </div>

          {loadingOrders ? (
            <div className="text-center py-10 text-xs text-neutral-500 animate-pulse">
              Đang tải lịch sử từ Database...
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 text-center text-neutral-400">
              <p className="text-sm">Chưa có đơn hàng nào trong hệ thống.</p>
              <Link href="/" className="inline-block mt-3 text-xs text-amber-400 font-semibold hover:underline">
                Đặt món ngay &rarr;
              </Link>
            </div>
          ) : (
            <div className="space-y-3.5">
              {orders.map((ord: any) => (
                <div
                  key={ord.id}
                  className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4.5 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
                    <div>
                      <span className="font-mono font-bold text-sm text-white">#{ord.id.slice(-6)}</span>
                      <span className="text-xs text-neutral-500 ml-2">
                        {ord.createdAt
                          ? new Date(ord.createdAt).toLocaleDateString("vi-VN", {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "2-digit",
                            })
                          : ""}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded border ${
                        ord.status === "PAID"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : ord.status === "PENDING"
                          ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                          : ord.status === "PREPARING"
                          ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
                          : ord.status === "READY"
                          ? "bg-teal-500/10 border-teal-500/20 text-teal-400"
                          : ord.status === "COMPLETED"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : ord.status === "CANCELLED" || ord.status === "PAYMENT_FAILED"
                          ? "bg-rose-500/10 border-rose-500/20 text-rose-400"
                          : "bg-neutral-800 border-neutral-700 text-neutral-300"
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>

                  {/* Render danh sách món */}
                  <div className="space-y-1.5 text-xs text-neutral-300">
                    {ord.items && ord.items.length > 0 ? (
                      ord.items.map((it: any, idx: number) => {
                        const name = it.name || it.product?.name || `Sản phẩm #${it.productId}`;
                        const qty = it.quantity || 1;
                        const itemPrice = Number(it.unitPrice ?? it.product?.price ?? 0);

                        return (
                          <div key={idx} className="flex justify-between items-center">
                            <span>
                              {name} <span className="text-neutral-500">x{qty}</span>
                            </span>
                            <span className="text-neutral-400 font-mono">
                              {itemPrice > 0 ? `${(itemPrice * qty).toLocaleString("vi-VN")} đ` : ""}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-neutral-500 italic">Chi tiết đơn hàng đang cập nhật</p>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-2.5 border-t border-neutral-800 text-xs">
                    <div>
                      <span className="text-neutral-400">Tổng thanh toán: </span>
                      <span className="font-bold text-amber-400 text-sm font-mono">
                        {(ord.total ?? ord.totalAmount ?? 0).toLocaleString("vi-VN")} đ
                      </span>
                    </div>

                    {(ord.status === "PENDING" || ord.status === "PAID") && (
                      <button
                        onClick={() => handleCancelOrder(ord.id)}
                        disabled={cancellingId === ord.id}
                        className="px-3 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-semibold transition active:scale-95 disabled:opacity-50"
                      >
                        {cancellingId === ord.id ? "Đang hủy..." : "Hủy đơn"}
                      </button>
                    )}
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