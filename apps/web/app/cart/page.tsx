"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      // Chưa đăng nhập: đẩy sang login kèm param nhớ đường về
      router.push("/login?redirect=/checkout");
    } else {
      // Đã đăng nhập: đi thẳng tới thanh toán
      router.push("/checkout");
    }
  };

  // Lấy dữ liệu và các hàm thao tác từ Zustand Store
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  // Chống lỗi Hydration Mismatch của Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-neutral-400">
        Đang tải giỏ hàng...
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const totalCount = getTotalItems();

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 pb-36">
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
          <h1 className="text-lg font-bold text-white">Giỏ hàng của bạn</h1>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-rose-400 hover:text-rose-300 transition font-medium"
          >
            Xóa tất cả
          </button>
        )}
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-6">
        {/* Empty State */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-500 mb-4">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-white">Giỏ hàng chưa có món nào</h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-xs">
              Có vẻ bạn chưa chọn thức uống nào. Hãy dạo quanh thực đơn và chọn món nhé!
            </p>
            <Link
              href="/"
              className="mt-6 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold rounded-xl text-sm transition active:scale-95"
            >
              Khám phá thực đơn
            </Link>
          </div>
        ) : (
          /* Danh sách món trong giỏ */
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={`${item.productId}-${item.size.name}-${index}`}
                className="bg-neutral-800/70 border border-neutral-800 rounded-2xl p-4 flex items-center justify-between gap-4"
              >
                {/* Thông tin món */}
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm">{item.name}</h3>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                    <span className="text-xs bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-md font-medium">
                      Size {item.size.name}
                    </span>
                    {item.toppings.map((top, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs bg-neutral-700/60 text-neutral-300 px-2 py-0.5 rounded-md"
                      >
                        +{top.name}
                      </span>
                    ))}
                  </div>
                  <p className="text-amber-500 font-bold text-sm mt-2">
                    {item.lineTotal.toLocaleString("vi-VN")} đ
                  </p>
                </div>

                {/* Bộ điều khiển số lượng */}
                <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700/60 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition active:scale-90"
                    title="Giảm 1"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-semibold text-sm text-white">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition active:scale-90"
                    title="Tăng 1"
                  >
                    +
                  </button>
                </div>

                {/* Nút xóa nhanh */}
                <button
                  onClick={() => removeItem(index)}
                  className="text-neutral-500 hover:text-rose-400 p-1.5 transition"
                  title="Xóa món"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer thanh toán cố định ở đáy (chỉ hiện khi có món) */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent flex justify-center z-20">
          <div className="w-full max-w-2xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-md p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-neutral-400">Tổng thanh toán ({totalCount} món)</p>
              <p className="text-xl font-bold text-amber-400">
                {totalPrice.toLocaleString("vi-VN")} đ
              </p>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 px-6 rounded-xl transition shadow-lg shadow-emerald-900/40 active:scale-95 flex items-center gap-2"
            >
              <span>Thanh toán</span>
              <span>&rarr;</span>
            </button> 
          </div>
        </div>
      )}
    </div>
  );
}