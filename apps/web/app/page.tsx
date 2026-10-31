// frontend/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { getProducts } from "@/services/product.service";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const products = getProducts();

  const totalItems = useCartStore((state) => state.getTotalItems());
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pb-28">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-neutral-950/80 backdrop-blur border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-white">BrewLite</span>
          <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-medium">Coffee</span>
        </div>

        <div>
          {mounted && isAuthenticated && user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-3 py-1.5 rounded-xl transition active:scale-95"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-semibold text-neutral-200 max-w-[100px] truncate">
                {user.name}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 px-3.5 py-2 rounded-xl transition active:scale-95 shadow-sm"
            >
              Đăng nhập / Đăng ký
            </Link>
          )}
        </div>
      </header>

      {/* Main Menu Grid */}
      <main className="max-w-4xl mx-auto px-6 pt-8">
        <h1 className="text-2xl font-bold text-white">Thực đơn hôm nay</h1>
        <p className="text-sm text-neutral-400 mt-1">Chọn món để tùy chỉnh size, topping và đặt hàng nhanh chóng</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group bg-neutral-900/70 rounded-2xl overflow-hidden border border-neutral-800/80 hover:border-neutral-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square w-full overflow-hidden bg-neutral-800 relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-3.5">
                  <h3 className="font-semibold text-neutral-200 text-sm group-hover:text-amber-400 transition line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-amber-500 font-bold text-xs mt-1">
                    Giá từ {product.price.toLocaleString("vi-VN")} đ
                  </p>
                </div>
              </div>

              {/* Nút điều hướng rõ ràng */}
              <div className="p-3.5 pt-0">
                <div className="w-full py-2 text-xs font-semibold text-amber-400 bg-amber-400/10 group-hover:bg-amber-400 group-hover:text-neutral-950 rounded-xl transition flex items-center justify-center gap-1">
                  <span>Tùy chọn món</span>
                  <span>&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Floating Bottom Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent flex justify-center z-20">
        <Link
          href="/cart"
          className="w-full max-w-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-900/30 flex items-center justify-between transition active:scale-98"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Xem giỏ hàng ({mounted ? totalItems : 0})</span>
          </div>
          <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}