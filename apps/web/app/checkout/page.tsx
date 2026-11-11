// apps/web/app/checkout/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import {
  createOrderApi,
  processPaymentApi,
  validateCouponApi,
} from "@/services/order.service";
import { useAuthStore } from "@/store/useAuthStore";

type PaymentMethod = "WALLET" | "BANK_CARD";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Auth state
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Zustand state
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  // Local state & Ref khóa chống spam click
  const [method, setMethod] = useState<PaymentMethod>("WALLET");
  const [isProcessing, setIsProcessing] = useState(false);
  const isSubmitting = useRef(false);

  // State mã giảm giá (Coupon)
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
    finalTotal: number;
    message: string;
  } | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");

  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login?redirect=/checkout");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-neutral-900 text-neutral-400 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const discountAmount = appliedCoupon ? appliedCoupon.discountAmount : 0;
  const finalPrice = Math.max(0, subtotal - discountAmount);

  // Kiểm tra giỏ hàng rỗng
  if (items.length === 0 && !completedOrder) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold">Không có món nào để thanh toán!</h2>
        <p className="text-neutral-400 text-sm mt-2">Vui lòng chọn món trước khi vào trang này.</p>
        <Link
          href="/"
          className="mt-6 px-6 py-2.5 bg-amber-500 text-neutral-950 font-semibold rounded-xl text-sm transition active:scale-95"
        >
          Về thực đơn
        </Link>
      </div>
    );
  }

  // Xử lý áp dụng mã giảm giá
  const handleApplyCoupon = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!couponCodeInput.trim()) return;

    setIsValidatingCoupon(true);
    setCouponError("");

    try {
      const res = await validateCouponApi(
        couponCodeInput.trim(),
        subtotal,
        user.id
      );
      setAppliedCoupon({
        code: res.code,
        discountAmount: res.discountAmount,
        finalTotal: res.finalTotal,
        message: res.message,
      });
      setCouponError("");
    } catch (err: any) {
      setCouponError(err.message || "Mã giảm giá không hợp lệ");
      setAppliedCoupon(null);
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCodeInput("");
    setCouponError("");
  };

  // Xử lý tạo đơn và thanh toán
  const handlePayment = async () => {
    // Chặn tuyệt đối nếu đang trong tiến trình xử lý (chống bấm đúp trên điện thoại)
    if (isSubmitting.current || isProcessing) return;
    isSubmitting.current = true;
    setIsProcessing(true);

    try {
      // 1. Tạo đơn mới trực tiếp vào PostgreSQL (kèm mã giảm giá nếu có)
      const order = await createOrderApi({
        userId: user.id,
        items,
        couponCode: appliedCoupon?.code,
      });

      // 2. Thanh toán đơn vừa tạo bằng mã đơn duy nhất
      const paymentResult = await processPaymentApi({
        orderId: order.id,
        method,
        idempotencyKey: `pay-${order.id}-${Date.now()}`,
      });

      // 3. Xóa sạch giỏ hàng khi thanh toán thành công
      clearCart();

      // 4. Chuyển sang màn hình xác nhận thành công
      setCompletedOrder({
        orderId: order.id,
        status: paymentResult.status || "PAID",
      });
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra trong quá trình xử lý đơn hàng. Vui lòng thử lại!"
      );
    } finally {
      setIsProcessing(false);
      isSubmitting.current = false;
    }
  };

  // MÀN HÌNH (5) XÁC NHẬN ĐƠN HÀNG THÀNH CÔNG
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col justify-between p-6 max-w-md mx-auto">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-extrabold text-white">Đặt hàng thành công</h1>
          <p className="text-neutral-400 text-sm mt-1">Cảm ơn bạn đã trải nghiệm BrewLite</p>

          <div className="w-full bg-neutral-800/60 border border-neutral-700/60 rounded-2xl p-5 mt-8 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-400">Mã đơn hàng</span>
              <span className="font-mono font-bold text-lg text-amber-400">
                #{completedOrder.orderId}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-400">Trạng thái</span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-md font-bold">
                {completedOrder.status}
              </span>
            </div>
          </div>

          <p className="text-amber-500/90 font-medium text-sm mt-8 animate-pulse">
            Mời bạn tới quầy lấy nước khi nhận được thông báo
          </p>
        </div>

        <div className="pt-6">
          <Link
            href="/"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl flex items-center justify-center transition shadow-lg shadow-emerald-900/30 active:scale-98"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 pb-36">
      <header className="sticky top-0 z-10 flex items-center gap-3 px-6 py-4 bg-neutral-900/80 backdrop-blur border-b border-neutral-800">
        <button
          onClick={() => router.back()}
          className="p-1.5 text-neutral-400 hover:text-white bg-neutral-800 rounded-lg transition active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-bold text-white">Thanh toán</h1>
      </header>

      <main className="max-w-md mx-auto px-6 pt-6 space-y-6">
        {/* Hộp tổng tiền & Chi tiết chiết khấu */}
        <section className="bg-neutral-800/50 border border-neutral-800 rounded-2xl p-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Tạm tính ({items.length} món)</span>
            <span className="font-semibold text-neutral-300">
              {subtotal.toLocaleString("vi-VN")} đ
            </span>
          </div>

          {appliedCoupon && (
            <div className="flex items-center justify-between text-xs text-emerald-400 font-medium">
              <span>Ưu đãi voucher ({appliedCoupon.code})</span>
              <span>-{discountAmount.toLocaleString("vi-VN")} đ</span>
            </div>
          )}

          <div className="pt-2 border-t border-neutral-700/60 flex items-center justify-between">
            <span className="text-xs text-neutral-400 font-medium">Tổng tiền thanh toán</span>
            <p className="text-2xl font-extrabold text-amber-400">
              {finalPrice.toLocaleString("vi-VN")} đ
            </p>
          </div>
        </section>

        {/* Khối nhập mã ưu đãi (Coupon) */}
        <section className="bg-neutral-800/40 border border-neutral-800 rounded-2xl p-4.5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-200 flex items-center gap-1.5">
              <span>🎟️</span> Mã giảm giá / Voucher
            </h2>
            {appliedCoupon && (
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-medium">
                Đã áp dụng
              </span>
            )}
          </div>

          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-400">
              <div className="space-y-0.5">
                <p className="font-bold font-mono tracking-wide">
                  {appliedCoupon.code}: -{appliedCoupon.discountAmount.toLocaleString("vi-VN")} đ
                </p>
                <p className="text-neutral-400 text-[11px]">{appliedCoupon.message}</p>
              </div>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-xs text-rose-400 hover:text-rose-300 font-semibold px-2 py-1 bg-rose-500/10 rounded-lg transition active:scale-95"
              >
                Gỡ mã
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                  placeholder="Nhập mã (ví dụ: BREW10)"
                  className="flex-1 bg-neutral-900 border border-neutral-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white uppercase font-mono tracking-wider focus:outline-none focus:border-amber-500 transition"
                />
                <button
                  type="submit"
                  disabled={isValidatingCoupon || !couponCodeInput.trim()}
                  className="bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-neutral-950 font-bold px-4 py-2.5 rounded-xl text-xs transition active:scale-95 shrink-0"
                >
                  {isValidatingCoupon ? "Kiểm tra..." : "Áp dụng"}
                </button>
              </div>
              {couponError && (
                <p className="text-rose-400 text-xs mt-1">{couponError}</p>
              )}
            </form>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-neutral-200">Phương thức thanh toán</h2>
            <span className="text-xs text-neutral-500">Không dùng tiền mặt</span>
          </div>

          <div className="space-y-3">
            <label
              onClick={() => setMethod("WALLET")}
              className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                method === "WALLET"
                  ? "border-amber-500 bg-amber-500/10 text-white"
                  : "border-neutral-800 bg-neutral-800/40 text-neutral-400 hover:border-neutral-700"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                    method === "WALLET" ? "border-amber-500" : "border-neutral-600"
                  }`}
                >
                  {method === "WALLET" && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">Ví điện tử</span>
                  <span className="text-xs text-neutral-400">MoMo, ZaloPay, ShopeePay</span>
                </div>
              </div>
              <span className="text-xl">📱</span>
            </label>

            <label
              onClick={() => setMethod("BANK_CARD")}
              className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                method === "BANK_CARD"
                  ? "border-amber-500 bg-amber-500/10 text-white"
                  : "border-neutral-800 bg-neutral-800/40 text-neutral-400 hover:border-neutral-700"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                    method === "BANK_CARD" ? "border-amber-500" : "border-neutral-600"
                  }`}
                >
                  {method === "BANK_CARD" && <div className="w-2.5 h-2.5 bg-amber-500 rounded-full" />}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">Thẻ ngân hàng</span>
                  <span className="text-xs text-neutral-400">ATM nội địa, Visa, Mastercard</span>
                </div>
              </div>
              <span className="text-xl">💳</span>
            </label>
          </div>
        </section>

        <section className="bg-neutral-800/30 border border-neutral-800/80 rounded-2xl p-4">
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
            Chi tiết đơn đặt
          </h3>
          <div className="space-y-2 text-sm">
            {items.map((i, idx) => (
              <div key={idx} className="flex justify-between text-neutral-300">
                <span>
                  {i.name} ({i.size?.name || "Tiêu chuẩn"}) x{i.qty}
                </span>
                <span className="font-medium text-neutral-200">
                  {(i.lineTotal || 0).toLocaleString("vi-VN")} đ
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent flex justify-center z-20">
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full max-w-md py-4 px-6 bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-700 text-white font-bold rounded-2xl transition shadow-xl shadow-emerald-950/40 active:scale-98 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Đang xử lý đơn hàng...</span>
            </>
          ) : (
            <span>Xác nhận trả ({finalPrice.toLocaleString("vi-VN")} đ)</span>
          )}
        </button>
      </div>
    </div>
  );
}