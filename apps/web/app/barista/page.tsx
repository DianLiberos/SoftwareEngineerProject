"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { getAllOrdersApi, updateOrderStatusApi } from "@/services/order.service";

export default function BaristaPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // 1. Kiểm tra hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Client-side Route Guard cho Barista / Admin
  useEffect(() => {
    if (!mounted) return;

    if (!isAuthenticated || !user) {
      router.replace("/login?redirect=/barista");
      return;
    }

    const isStaff = user.role === "BARISTA" || user.role === "ADMIN";
    if (!isStaff) {
      alert("Tài khoản của bạn không có quyền truy cập vào Màn hình Barista (KDS)!");
      router.replace("/");
      return;
    }

    loadOrders();
  }, [mounted, isAuthenticated, user, router]);

  // 3. Tự động đồng bộ mỗi 8 giây khi đã xác thực
  useEffect(() => {
    if (!mounted || !isAuthenticated || !(user?.role === "BARISTA" || user?.role === "ADMIN")) {
      return;
    }

    if (!autoRefresh) return;
    const interval = setInterval(() => {
      loadOrders();
    }, 8000);

    return () => clearInterval(interval);
  }, [mounted, isAuthenticated, user, autoRefresh]);

  // Hàm tải danh sách đơn hàng
  const loadOrders = async () => {
    try {
      const data = await getAllOrdersApi();
      setOrders(Array.isArray(data) ? data : []);
      setLastRefreshed(new Date());
    } catch (err) {
      console.error("Lỗi khi tải đơn Barista:", err);
    } finally {
      setLoading(false);
    }
  };

  // Chuyển trạng thái đơn
  const handleTransition = async (orderId: string, nextStatus: string) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatusApi(orderId, nextStatus);
      // Cập nhật state cục bộ để giao diện phản hồi tức thì
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o))
      );
    } catch (err: any) {
      alert(err.message || "Lỗi khi chuyển trạng thái đơn");
      loadOrders();
    } finally {
      setUpdatingId(null);
    }
  };

  // Màn hình chờ kiểm tra quyền truy cập (chống nhấp nháy UI)
  if (!mounted || !isAuthenticated || !user || !(user.role === "BARISTA" || user.role === "ADMIN")) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-neutral-400">Đang kiểm tra quyền Barista KDS...</span>
      </div>
    );
  }

  // Phân nhóm đơn theo từng cột
  const paidOrders = orders.filter((o) => o.status === "PAID");
  const preparingOrders = orders.filter((o) => o.status === "PREPARING");
  const readyOrders = orders.filter((o) => o.status === "READY");
  const completedCount = orders.filter((o) => o.status === "COMPLETED").length;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Top Header cho Barista */}
      <header className="sticky top-0 z-20 bg-neutral-900/90 backdrop-blur border-b border-neutral-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl transition text-xs font-semibold"
          >
            &larr; Khách hàng
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-amber-400 tracking-tight">BrewLite</span>
            <span className="text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
              Barista KDS
            </span>
          </div>
        </div>

        {/* Thông tin nhân viên & Live Sync */}
        <div className="flex items-center gap-3 text-xs">
          <div className="hidden sm:flex items-center gap-2 bg-neutral-800/80 px-2.5 py-1 rounded-xl border border-neutral-700/60">
            <div className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-white font-medium">{user.name}</span>
            <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded">
              {user.role}
            </span>
          </div>

          <span className="text-neutral-400 hidden md:inline">
            Cập nhật: {lastRefreshed.toLocaleTimeString("vi-VN")}
          </span>

          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-1.5 rounded-xl font-medium border transition ${
              autoRefresh
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-neutral-800 border-neutral-700 text-neutral-400"
            }`}
          >
            {autoRefresh ? "🟢 Tự động đồng bộ (8s)" : "⚪ Đồng bộ thủ công"}
          </button>

          <button
            onClick={() => loadOrders()}
            disabled={loading}
            className="bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-white font-medium px-3.5 py-1.5 rounded-xl border border-neutral-700 transition flex items-center gap-1.5"
          >
            <span>🔄 Làm mới</span>
          </button>
        </div>
      </header>

      {/* Main 3-Column Kanban Board */}
      <main className="flex-1 p-4 sm:p-6 overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto min-w-[700px] md:min-w-0">
          
          {/* CỘT 1: CHỜ PHA CHẾ (PAID) */}
          <div className="bg-neutral-900/60 border border-amber-500/30 rounded-3xl p-4 flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <h2 className="font-bold text-white text-sm">Chờ pha chế</h2>
              </div>
              <span className="text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                {paidOrders.length}
              </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] pr-1">
              {paidOrders.length === 0 ? (
                <div className="text-center py-12 text-xs text-neutral-500">
                  Chưa có đơn mới cần pha chế
                </div>
              ) : (
                paidOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 space-y-3 shadow-lg hover:border-amber-500/40 transition"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <span className="font-mono font-bold text-amber-400 text-sm">
                        #{ord.id.slice(-6).toUpperCase()}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {new Date(ord.createdAt).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-400">
                      Khách hàng: <span className="text-white font-medium">{ord.user?.name || "Khách vãng lai"}</span>
                    </div>

                    {/* Danh sách món */}
                    <div className="space-y-2 bg-neutral-950/60 rounded-xl p-2.5 border border-neutral-800/80">
                      {ord.items?.map((it: any, idx: number) => (
                        <div key={idx} className="text-xs">
                          <div className="flex justify-between items-center font-semibold text-white">
                            <span>{it.name}</span>
                            <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded text-[11px]">
                              x{it.quantity}
                            </span>
                          </div>
                          {(it.sizeName || (it.toppings && it.toppings.length > 0)) && (
                            <div className="text-[11px] text-neutral-400 mt-0.5 flex flex-wrap gap-1">
                              {it.sizeName && <span>Size {it.sizeName}</span>}
                              {it.toppings?.map((top: any, tIdx: number) => (
                                <span key={tIdx} className="text-neutral-500">
                                  • {typeof top === "string" ? top : top.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Nút hành động chuyển sang PREPARING */}
                    <button
                      onClick={() => handleTransition(ord.id, "PREPARING")}
                      disabled={updatingId === ord.id}
                      className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-neutral-950 font-bold rounded-xl text-xs transition active:scale-95 flex items-center justify-center gap-1.5 shadow-md shadow-amber-950/40"
                    >
                      <span>☕ Bắt đầu pha chế</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CỘT 2: ĐANG PHA CHẾ (PREPARING) */}
          <div className="bg-neutral-900/60 border border-blue-500/30 rounded-3xl p-4 flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                <h2 className="font-bold text-white text-sm">Đang pha chế</h2>
              </div>
              <span className="text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full">
                {preparingOrders.length}
              </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] pr-1">
              {preparingOrders.length === 0 ? (
                <div className="text-center py-12 text-xs text-neutral-500">
                  Không có đơn nào đang pha
                </div>
              ) : (
                preparingOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-neutral-900 border border-blue-500/20 rounded-2xl p-4 space-y-3 shadow-lg"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <span className="font-mono font-bold text-blue-400 text-sm">
                        #{ord.id.slice(-6).toUpperCase()}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {new Date(ord.createdAt).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-400">
                      Khách hàng: <span className="text-white font-medium">{ord.user?.name || "Khách vãng lai"}</span>
                    </div>

                    {/* Danh sách món */}
                    <div className="space-y-2 bg-neutral-950/60 rounded-xl p-2.5 border border-neutral-800/80">
                      {ord.items?.map((it: any, idx: number) => (
                        <div key={idx} className="text-xs">
                          <div className="flex justify-between items-center font-semibold text-white">
                            <span>{it.name}</span>
                            <span className="bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded text-[11px]">
                              x{it.quantity}
                            </span>
                          </div>
                          {(it.sizeName || (it.toppings && it.toppings.length > 0)) && (
                            <div className="text-[11px] text-neutral-400 mt-0.5 flex flex-wrap gap-1">
                              {it.sizeName && <span>Size {it.sizeName}</span>}
                              {it.toppings?.map((top: any, tIdx: number) => (
                                <span key={tIdx} className="text-neutral-500">
                                  • {typeof top === "string" ? top : top.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Nút hành động chuyển sang READY */}
                    <button
                      onClick={() => handleTransition(ord.id, "READY")}
                      disabled={updatingId === ord.id}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs transition active:scale-95 flex items-center justify-center gap-1.5 shadow-md shadow-blue-950/40"
                    >
                      <span>🔔 Đã pha xong (Báo khách)</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CỘT 3: SẴN SÀNG GIAO (READY) */}
          <div className="bg-neutral-900/60 border border-emerald-500/30 rounded-3xl p-4 flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h2 className="font-bold text-white text-sm">Chờ khách nhận nước</h2>
              </div>
              <span className="text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                {readyOrders.length}
              </span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] pr-1">
              {readyOrders.length === 0 ? (
                <div className="text-center py-12 text-xs text-neutral-500">
                  Không có đơn nào chờ giao
                </div>
              ) : (
                readyOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-neutral-900 border border-emerald-500/20 rounded-2xl p-4 space-y-3 shadow-lg"
                  >
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <span className="font-mono font-bold text-emerald-400 text-sm">
                        #{ord.id.slice(-6).toUpperCase()}
                      </span>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {new Date(ord.createdAt).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-400">
                      Khách hàng: <span className="text-white font-medium">{ord.user?.name || "Khách vãng lai"}</span>
                    </div>

                    <div className="space-y-1 text-xs text-neutral-300">
                      {ord.items?.map((it: any, idx: number) => (
                        <div key={idx} className="flex justify-between">
                          <span>{it.name}</span>
                          <span className="text-emerald-400 font-bold">x{it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Nút hoàn tất giao khách */}
                    <button
                      onClick={() => handleTransition(ord.id, "COMPLETED")}
                      disabled={updatingId === ord.id}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs transition active:scale-95 flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/40"
                    >
                      <span>✅ Khách đã lấy (Hoàn thành)</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer info Bar */}
        <div className="mt-8 text-center text-xs text-neutral-500">
          Tổng đơn đã hoàn thành hôm nay: <span className="text-neutral-300 font-bold">{completedCount}</span> đơn.
        </div>
      </main>
    </div>
  );
}
