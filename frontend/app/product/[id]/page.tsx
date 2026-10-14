"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { mockProducts } from "@/data";

interface SizeOption {
  id: "S" | "M" | "L";
  label: string;
  name: string;
  extraPrice: number;
}

interface ToppingOption {
  id: string;
  name: string;
  extraPrice: number;
}

const SIZES: SizeOption[] = [
  { id: "S", label: "S", name: "Nhỏ", extraPrice: 0 },
  { id: "M", label: "M", name: "Vừa", extraPrice: 6000 },
  { id: "L", label: "L", name: "Lớn", extraPrice: 10000 },
];

const TOPPINGS: ToppingOption[] = [
  { id: "pearl", name: "Trân châu", extraPrice: 8000 },
  { id: "cream", name: "Kem cheese", extraPrice: 10000 },
];

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params?.id);

  const product = mockProducts.find((p) => p.id === productId);

  // States
  const [selectedSize, setSelectedSize] = useState<"S" | "M" | "L">("S");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Không tìm thấy món này
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Món bạn đang tìm có thể đã ngừng phục vụ hoặc không tồn tại.
        </p>
        <Link
          href="/"
          className="px-5 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Quay lại thực đơn
        </Link>
      </div>
    );
  }

  // Topping toggle logic
  const toggleTopping = (toppingId: string) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  // Price calculations
  const sizeOption = SIZES.find((s) => s.id === selectedSize) || SIZES[0];
  const toppingsExtraPrice = selectedToppings.reduce((total, toppingId) => {
    const item = TOPPINGS.find((t) => t.id === toppingId);
    return total + (item ? item.extraPrice : 0);
  }, 0);

  const unitPrice = product.price + sizeOption.extraPrice + toppingsExtraPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* 1. Header with Back Button */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Quay lại"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-semibold">Quay lại</span>
          </button>

          <span className="text-sm font-bold text-gray-800">Chi tiết món</span>

          {/* Placeholder for header symmetry */}
          <div className="w-16" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-4 pb-36">
        {/* Product Image */}
        <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100 mb-5 relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2. Product Name & Price */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Thức uống được pha chế tươi mới mỗi ngày với nguyên liệu chất lượng cao.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 font-medium block">Giá gốc</span>
              <span className="text-xl font-extrabold text-amber-900">
                {product.price.toLocaleString("vi-VN")} ₫
              </span>
            </div>
          </div>
        </div>

        {/* 3. Size Selection */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-900 text-base">Chọn Size</h2>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              Bắt buộc
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {SIZES.map((size) => {
              const isSelected = selectedSize === size.id;
              return (
                <button
                  key={size.id}
                  type="button"
                  onClick={() => setSelectedSize(size.id)}
                  className={`py-3 px-3 rounded-2xl border flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/80 text-emerald-900 font-semibold shadow-sm ring-2 ring-emerald-500/20"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg font-bold">{size.label}</span>
                  <span className="text-xs text-gray-500 mt-0.5">{size.name}</span>
                  <span
                    className={`text-xs mt-1 font-medium ${
                      isSelected ? "text-emerald-700" : "text-gray-400"
                    }`}
                  >
                    {size.extraPrice === 0
                      ? "0 ₫"
                      : `+${size.extraPrice.toLocaleString("vi-VN")} ₫`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Topping Selection */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-900 text-base">Chọn Topping</h2>
            <span className="text-xs text-gray-400">Tùy chọn</span>
          </div>

          <div className="space-y-2.5">
            {TOPPINGS.map((topping) => {
              const isSelected = selectedToppings.includes(topping.id);
              return (
                <button
                  key={topping.id}
                  type="button"
                  onClick={() => toggleTopping(topping.id)}
                  className={`w-full py-3 px-4 rounded-2xl border flex items-center justify-between transition-all ${
                    isSelected
                      ? "border-emerald-600 bg-emerald-50/80 text-emerald-900 font-medium shadow-sm ring-1 ring-emerald-500/20"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                        isSelected
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="font-semibold text-sm sm:text-base">
                      {topping.name}
                    </span>
                  </div>

                  <span
                    className={`text-sm font-bold ${
                      isSelected ? "text-emerald-800" : "text-gray-500"
                    }`}
                  >
                    +{topping.extraPrice.toLocaleString("vi-VN")} ₫
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantity selector */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
          <span className="font-bold text-gray-900 text-sm sm:text-base">Số lượng</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-bold text-lg"
            >
              -
            </button>
            <span className="w-8 text-center font-bold text-base text-gray-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg"
            >
              +
            </button>
          </div>
        </div>
      </main>

      {/* 5. Big Green Floating 'Thêm vào giỏ' Button at Bottom */}
      <footer className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-100 p-4 z-40">
        <div className="max-w-2xl mx-auto">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-emerald-600/30 flex items-center justify-between text-base sm:text-lg transition-all"
          >
            <div className="flex items-center gap-2.5">
              <svg
                className="w-6 h-6"
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
              <span>{isAdded ? "Đã thêm vào giỏ! ✓" : "Thêm vào giỏ"}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-emerald-700/60 px-3 py-1 rounded-xl font-black text-sm sm:text-base">
                {totalPrice.toLocaleString("vi-VN")} ₫
              </span>
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}

