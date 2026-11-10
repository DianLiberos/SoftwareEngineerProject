"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getProductById } from "@/services/product.service";
import { useCartStore } from "@/store/useCartStore";
import { Product, ProductOption } from "@/types";

function ProductDetailContent() {
  const params = useParams();
  const router = useRouter();
  const productId = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const addItem = useCartStore((state) => state.addItem);
  const totalCartItems = useCartStore((state) => state.getTotalItems());

  const [selectedSize, setSelectedSize] = useState<ProductOption | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<ProductOption[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!productId) return;

    setIsLoading(true);
    getProductById(productId)
      .then((data) => {
        setProduct(data);
        if (data && data.sizes && data.sizes.length > 0) {
          const first = data.sizes[0];
          setSelectedSize({
            name: first.name,
            price: (first as any).price ?? (first as any).priceAdjustment ?? 0,
          });
        } else {
          setSelectedSize({ name: "Tiêu chuẩn", price: 0 });
        }
      })
      .catch((err) => console.error("Lỗi tải món nước:", err))
      .finally(() => setIsLoading(false));
  }, [productId]);

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 text-neutral-400 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm">Đang tải chi tiết món nước...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold">Không tìm thấy thức uống này!</h2>
        <p className="text-neutral-400 text-sm mt-2">Món bạn chọn có thể đã ngừng phục vụ hoặc không tồn tại.</p>
        <Link
          href="/"
          className="mt-6 px-6 py-2.5 bg-amber-500 text-neutral-950 font-semibold rounded-xl text-sm transition active:scale-95"
        >
          Quay lại thực đơn
        </Link>
      </div>
    );
  }

  const toggleTopping = (topping: ProductOption) => {
    const exists = selectedToppings.some((t) => t.name === topping.name);
    if (exists) {
      setSelectedToppings(selectedToppings.filter((t) => t.name !== topping.name));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const productPrice = Number(product.price ?? product.basePrice ?? 0);
  const sizePrice = Number(selectedSize?.price || 0);
  const toppingsPrice = selectedToppings.reduce((sum, t) => sum + Number(t.price || 0), 0);
  const unitPrice = productPrice + sizePrice + toppingsPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    if (!selectedSize) return;

    addItem({
      productId: product.id,
      name: product.name,
      basePrice: productPrice,
      size: selectedSize,
      toppings: selectedToppings,
      qty: quantity,
      lineTotal: totalPrice,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 pb-36">
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-neutral-900/80 backdrop-blur border-b border-neutral-800">
        <button
          onClick={() => router.back()}
          className="p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl transition active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <span className="font-semibold text-sm text-neutral-300">Tùy chỉnh món</span>

        <Link
          href="/cart"
          className="relative p-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {totalCartItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-500 text-neutral-950 font-bold text-xs rounded-full flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
        </Link>
      </header>

      <main className="max-w-xl mx-auto px-6 pt-4">
        {/* Khối hiển thị ảnh có fallback nếu link bị 404 */}
        <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-800 border border-neutral-800 shadow-xl relative flex items-center justify-center">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.parentElement?.querySelector(".fallback-coffee");
                if (fallback) fallback.classList.remove("hidden");
              }}
            />
          ) : null}
          <div className={`fallback-coffee flex flex-col items-center justify-center text-neutral-600 gap-1.5 ${product.imageUrl ? "hidden" : ""}`}>
            <span className="text-4xl">☕</span>
            <span className="text-xs uppercase font-bold text-neutral-500">BrewLite Coffee</span>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">{product.name}</h1>
            <span className="text-lg font-bold text-amber-500">
              {productPrice.toLocaleString("vi-VN")} đ
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">Còn lại: {product.stock} phần trong kho</p>
        </div>

        <hr className="border-neutral-800 my-6" />

        {/* Danh sách Kích cỡ (Size) */}
        {product.sizes && product.sizes.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-white text-sm">Chọn kích cỡ (Size)</h2>
              <span className="text-xs text-amber-500/80 font-medium bg-amber-500/10 px-2 py-0.5 rounded">Bắt buộc</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {product.sizes.map((size: any) => {
                const sPrice = Number(size.price ?? size.priceAdjustment ?? 0);
                const isSelected = selectedSize?.name === size.name;
                return (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize({ name: size.name, price: sPrice })}
                    className={`py-3 px-4 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? "border-amber-500 bg-amber-500/10 text-amber-400 font-bold shadow-sm"
                        : "border-neutral-800 bg-neutral-800/40 text-neutral-400 hover:border-neutral-700"
                    }`}
                  >
                    <span className="text-base font-semibold">{size.name}</span>
                    <span className="text-xs font-normal">
                      {sPrice === 0 ? "Tiêu chuẩn" : `+${sPrice.toLocaleString("vi-VN")}đ`}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Danh sách Topping */}
        {product.toppings && product.toppings.length > 0 && (
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-white text-sm">Thêm Topping</h2>
              <span className="text-xs text-neutral-400">Chọn nhiều</span>
            </div>

            <div className="space-y-2.5">
              {product.toppings.map((topping: any) => {
                const tPrice = Number(topping.price ?? topping.priceAdjustment ?? 0);
                const isChecked = selectedToppings.some((t) => t.name === topping.name);
                return (
                  <button
                    key={topping.name}
                    onClick={() => toggleTopping({ name: topping.name, price: tPrice })}
                    className={`w-full p-3.5 rounded-2xl border flex items-center justify-between transition ${
                      isChecked
                        ? "border-amber-500/80 bg-amber-500/10 text-white"
                        : "border-neutral-800 bg-neutral-800/30 text-neutral-400 hover:border-neutral-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                          isChecked ? "bg-amber-500 border-amber-500 text-neutral-950" : "border-neutral-600"
                        }`}
                      >
                        {isChecked && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium">{topping.name}</span>
                    </div>

                    <span className="text-xs text-amber-500 font-semibold">
                      +{tPrice.toLocaleString("vi-VN")} đ
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* Tăng / giảm số lượng ly */}
        <section className="flex items-center justify-between p-4 bg-neutral-800/40 border border-neutral-800 rounded-2xl">
          <span className="font-semibold text-sm text-neutral-200">Số lượng ly</span>
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-700/60 rounded-xl p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition active:scale-90"
            >
              -
            </button>
            <span className="w-8 text-center font-bold text-white text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition active:scale-90"
            >
              +
            </button>
          </div>
        </section>
      </main>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent flex justify-center z-20">
        <button
          onClick={handleAddToCart}
          className={`w-full max-w-xl py-4 px-6 rounded-2xl font-bold flex items-center justify-between transition shadow-xl active:scale-98 ${
            isAdded
              ? "bg-emerald-500 text-neutral-950 shadow-emerald-500/20"
              : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40"
          }`}
        >
          <div className="flex items-center gap-2">
            {isAdded ? (
              <>
                <svg className="w-5 h-5 text-neutral-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                <span>Đã thêm vào giỏ!</span>
              </>
            ) : (
              <span>Thêm vào giỏ hàng</span>
            )}
          </div>

          <span className="text-base font-extrabold tracking-tight">
            {totalPrice.toLocaleString("vi-VN")} đ
          </span>
        </button>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-900 text-neutral-400 flex items-center justify-center">
          Đang tải chi tiết món...
        </div>
      }
    >
      <ProductDetailContent />
    </Suspense>
  );
}