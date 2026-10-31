// frontend/app/checkout/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import {
  createOrderApi,
  DEMO_BACKEND_USER_ID,
  processPaymentApi,
} from "@/services/order.service";

type PaymentMethod = "WALLET" | "BANK_CARD";
type PendingPayment = {
  orderId: string;
  cartSignature: string;
};

const PENDING_PAYMENT_KEY = `brewlite_pending_payment_${DEMO_BACKEND_USER_ID}`;

function getPendingPayment(): PendingPayment | null {
  const savedPayment = localStorage.getItem(PENDING_PAYMENT_KEY);
  if (!savedPayment) return null;

  try {
    const parsed: unknown = JSON.parse(savedPayment);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "orderId" in parsed &&
      typeof parsed.orderId === "string" &&
      "cartSignature" in parsed &&
      typeof parsed.cartSignature === "string"
    ) {
      return {
        orderId: parsed.orderId,
        cartSignature: parsed.cartSignature,
      };
    }
  } catch {
    // Replace corrupt local state with a fresh order on the next attempt.
  }

  localStorage.removeItem(PENDING_PAYMENT_KEY);
  return null;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Zustand state & actions
  const items = useCartStore((state) => state.items);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  // Local state
  const [method, setMethod] = useState<PaymentMethod>("WALLET");
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    status: string;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const totalPrice = getTotalPrice();

  // Kiểm tra giỏ hàng rỗng (nếu khách chưa thanh toán mà cố tình gõ link /checkout)
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

  // Xử lý luồng đặt hàng & thanh toán (Task 8 & 10)
  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      const cartSignature = JSON.stringify(items);
      let pendingPayment = getPendingPayment();

      if (pendingPayment?.cartSignature !== cartSignature) {
        pendingPayment = null;
      }

      if (!pendingPayment) {
        const order = await createOrderApi({
          userId: DEMO_BACKEND_USER_ID,
          items,
        });
        pendingPayment = { orderId: order.id, cartSignature };
        localStorage.setItem(
          PENDING_PAYMENT_KEY,
          JSON.stringify(pendingPayment),
        );
      }

      // Reuse the order and key if the request is retried or its response is lost.
      const paymentResult = await processPaymentApi({
        orderId: pendingPayment.orderId,
        method,
        idempotencyKey: `pay-${pendingPayment.orderId}`,
      });

      // 4. Xóa sạch giỏ hàng sau khi thanh toán thành công
      clearCart();
      localStorage.removeItem(PENDING_PAYMENT_KEY);

      // 5. Lưu đơn thành công để chuyển sang Wireframe Screen (5)
      setCompletedOrder({
        orderId: paymentResult.orderId,
        status: paymentResult.status,
      });
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Có lỗi xảy ra trong quá trình xử lý đơn hàng. Vui lòng thử lại!",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // VIEW 2: MÀN HÌNH (5) XÁC NHẬN ĐƠN HÀNG THÀNH CÔNG
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col justify-between p-6 max-w-md mx-auto">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Icon Checkmark xanh */}
          <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-extrabold text-white">Đặt hàng thành công</h1>
          <p className="text-neutral-400 text-sm mt-1">Cảm ơn bạn đã trải nghiệm BrewLite</p>

          {/* Hộp thông tin mã đơn & trạng thái */}
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

        {/* Nút Về trang chủ */}
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

  // VIEW 1: MÀN HÌNH (4) THANH TOÁN (CHECKOUT FORM)
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 pb-36">
      {/* Header */}
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
        {/* Hộp tổng tiền */}
        <section className="bg-neutral-800/50 border border-neutral-800 rounded-2xl p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-neutral-400 font-medium">Tổng tiền thanh toán</span>
            <p className="text-2xl font-extrabold text-amber-400 mt-0.5">
              {totalPrice.toLocaleString("vi-VN")} đ
            </p>
          </div>
          <span className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full font-medium border border-amber-500/20">
            {items.length} món
          </span>
        </section>

        {/* Cụm chọn phương thức thanh toán */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-neutral-200">Phương thức thanh toán</h2>
            <span className="text-xs text-neutral-500">Không dùng tiền mặt</span>
          </div>

          <div className="space-y-3">
            {/* Tùy chọn 1: Ví điện tử */}
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

            {/* Tùy chọn 2: Thẻ ngân hàng */}
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

        {/* Tóm tắt danh sách món */}
        <section className="bg-neutral-800/30 border border-neutral-800/80 rounded-2xl p-4">
          <h3 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
            Chi tiết đơn đặt
          </h3>
          <div className="space-y-2 text-sm">
            {items.map((i, idx) => (
              <div key={idx} className="flex justify-between text-neutral-300">
                <span>
                  {i.name} ({i.size.name}) x{i.qty}
                </span>
                <span className="font-medium text-neutral-200">
                  {i.lineTotal.toLocaleString("vi-VN")} đ
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating Bottom Bar: Nút Xác nhận trả */}
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
            <span>Xác nhận trả ({totalPrice.toLocaleString("vi-VN")} đ)</span>
          )}
        </button>
      </div>
    </div>
  );
}