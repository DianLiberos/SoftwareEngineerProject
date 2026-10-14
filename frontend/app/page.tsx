"use client";

import { useState } from "react";
import Link from "next/link";
import { mockProducts, Product } from "@/data";

export default function Home() {
  const [cart, setCart] = useState<{ [id: number]: number }>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addToCart = (productId: number) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);

  const totalPrice = Object.entries(cart).reduce((sum, [id, count]) => {
    const product = mockProducts.find((p) => p.id === Number(id));
    return sum + (product ? product.price * count : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* 1. Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-amber-900">
              BrewLite
            </span>
            <span className="text-xs bg-amber-100 text-amber-800 font-medium px-2 py-0.5 rounded-full">
              Coffee
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 active:bg-gray-200 transition-colors focus:outline-none"
          >
            {/* Hamburger Icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <nav className="border-t border-gray-100 bg-white px-4 py-3 space-y-2 md:hidden">
            <a
              href="#menu"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Thực đơn
            </a>
            <a
              href="#about"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Về BrewLite
            </a>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 pb-28">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Thực đơn hôm nay</h1>
          <p className="text-sm text-gray-500 mt-1">
            Chọn món yêu thích và đặt hàng nhanh chóng cùng BrewLite
          </p>
        </div>

        {/* 2. Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {mockProducts.map((product: Product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* Product Image & Info Link */}
              <Link
                href={`/product/${product.id}`}
                className="block cursor-pointer flex-1"
              >
                <div className="relative aspect-square w-full bg-gray-100 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="p-3.5 pb-0">
                  <h2 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1 group-hover:text-emerald-700 transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-amber-800 font-bold text-sm sm:text-base mt-0.5">
                    {product.price.toLocaleString("vi-VN")} ₫
                  </p>
                </div>
              </Link>

              {/* Product Action */}
              <div className="p-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => addToCart(product.id)}
                  className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-600 text-amber-800 hover:text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span>Thêm</span>
                  {cart[product.id] ? (
                    <span className="ml-1 bg-amber-600 group-hover:bg-amber-700 text-white rounded-full px-1.5 text-xs">
                      {cart[product.id]}
                    </span>
                  ) : null}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 3. Bottom Sticky Bar: 'Xem giỏ hàng (0)' */}
      <aside className="fixed bottom-4 inset-x-4 max-w-lg mx-auto z-50">
        <button
          type="button"
          className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold py-3.5 px-6 rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-between transition-all"
        >
          <div className="flex items-center gap-2.5">
            {/* Shopping Bag Icon */}
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="text-base">
              Xem giỏ hàng ({totalItems})
            </span>
          </div>

          <div className="flex items-center gap-2">
            {totalPrice > 0 && (
              <span className="font-bold text-sm bg-emerald-700/60 px-2.5 py-1 rounded-lg">
                {totalPrice.toLocaleString("vi-VN")} ₫
              </span>
            )}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </button>
      </aside>
    </div>
  );
}
