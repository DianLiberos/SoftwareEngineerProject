"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { getProducts } from "@/services/product.service";
import { Product } from "@/types";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const products = getProducts();

  const totalItems = useCartStore((state) => state.getTotalItems());
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation(); // Chặn sự kiện click nhảy lên thẻ Link cha
    
    const defaultSize = product.sizes?.[0] || { name: "Tiêu chuẩn", price: 0 };
    
    addItem({
      productId: product.id,
      name: product.name,
      basePrice: product.price,
      size: defaultSize,
      toppings: [],
      qty: 1,
      lineTotal: product.price + defaultSize.price,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 pb-28">
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-neutral-900/80 backdrop-blur border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-white">BrewLite</span>
          <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-medium">Coffee</span>
        </div>
        <button className="text-neutral-400 hover:text-white transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-6">
        <h1 className="text-2xl font-bold text-white">Thực đơn hôm nay</h1>
        <p className="text-sm text-neutral-400 mt-1">Chọn món yêu thích và đặt hàng nhanh chóng cùng BrewLite</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-neutral-800/60 rounded-2xl overflow-hidden border border-neutral-800/80 hover:border-neutral-700 transition flex flex-col justify-between"
            >
              {/* Vùng click vào xem chi tiết món */}
              <Link href={`/product/${product.id}`} className="block">
                <div className="aspect-square w-full overflow-hidden bg-neutral-800 relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-3.5 pb-0">
                  <h3 className="font-semibold text-neutral-200 text-sm group-hover:text-amber-400 transition">
                    {product.name}
                  </h3>
                  <p className="text-amber-500 font-medium text-xs mt-1">
                    {product.price.toLocaleString("vi-VN")} đ
                  </p>
                </div>
              </Link>

              {/* Vùng nút Thêm nhanh độc lập ngoài Link */}
              <div className="p-3.5 pt-3">
                <button
                  type="button"
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="w-full py-2 text-xs font-medium text-amber-400 bg-amber-400/10 hover:bg-amber-400 hover:text-neutral-900 rounded-lg transition active:scale-95"
                >
                  + Thêm
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

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