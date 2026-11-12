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
  cancelOrderApi,
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
    total: number;
    loyaltyPoints: number;
  } | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  const handleCopyOrderId = (id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
  };

  // State Cổng thanh toán Sandbox
  const [showSandboxModal, setShowSandboxModal] = useState(false);
  const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);
  const [sandboxLoading, setSandboxLoading] = useState(false);
  const [sandboxAction, setSandboxAction] = useState<"SUCCESS" | "FAILURE" | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"PENDING" | "FAILED" | "PAID">("PENDING");
  const [sandboxMessage, setSandboxMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(900); // 15 phút (900s)

  useEffect(() => {
    setMounted(true);
  }, []);

  // Bộ đếm thời gian hết hạn Sandbox (15:00)
  useEffect(() => {
    if (!showSandboxModal) return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [showSandboxModal]);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

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

  // 1. Mở Cổng thanh toán Sandbox (Tạo đơn trước ở trạng thái PENDING)
  const handleOpenSandbox = async () => {
    if (isSubmitting.current || isProcessing) return;
    isSubmitting.current = true;
    setIsProcessing(true);

    try {
      let orderId = pendingOrderId;
      if (!orderId) {
        const order = await createOrderApi({
          userId: user.id,
          items,
          couponCode: appliedCoupon?.code,
        });
        orderId = order.id;
        setPendingOrderId(order.id);
      }

      setPaymentStatus("PENDING");
      setSandboxMessage(null);
      setCountdown(900);
      setShowSandboxModal(true);
    } catch (error: any) {
      alert(error.message || "Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!");
    } finally {
      setIsProcessing(false);
      isSubmitting.current = false;
    }
  };

  // 2. Xử lý thanh toán trong Sandbox theo kịch bản (Thành công / Thất bại)
  const handleExecuteSandbox = async (simulateFailure: boolean) => {
    if (!pendingOrderId || sandboxLoading) return;

    setSandboxLoading(true);
    setSandboxAction(simulateFailure ? "FAILURE" : "SUCCESS");
    setSandboxMessage(null);

    // Mô phỏng độ trễ xác thực ngân hàng 1.5 giây
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // RÀNG BUỘC BẮT BUỘC: Mỗi lần gọi thanh toán BẮT BUỘC sinh Idempotency-Key mới
    const freshIdempotencyKey =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `pay-${pendingOrderId}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

    try {
      const paymentResult = await processPaymentApi({
        orderId: pendingOrderId,
        method,
        idempotencyKey: freshIdempotencyKey,
        simulateFailure,
      });

      if (simulateFailure || paymentResult.status === "FAILED") {
        // Giao dịch lỗi: Đơn chuyển PAYMENT_FAILED, GIỮ NGUYÊN GIỎ HÀNG
        setPaymentStatus("FAILED");
        setSandboxMessage(
          paymentResult.message ||
            "Giao dịch bị từ chối: Số dư tài khoản không đủ hoặc thẻ bị khóa. Đơn hàng chuyển sang trạng thái PAYMENT_FAILED."
        );
      } else {
        // Giao dịch thành công: Đơn chuyển PAID, XÓA GIỎ HÀNG
        clearCart();
        setShowSandboxModal(false);
        setCompletedOrder({
          orderId: pendingOrderId,
          status: paymentResult.status || "PAID",
          total: finalPrice,
          loyaltyPoints: Math.floor(finalPrice / 10000),
        });
      }
    } catch (error: any) {
      setPaymentStatus("FAILED");
      setSandboxMessage(
        error.message ||
          "Giao dịch bị từ chối: Lỗi kết nối cổng thanh toán. Đơn hàng chuyển sang trạng thái PAYMENT_FAILED."
      );
    } finally {
      setSandboxLoading(false);
      setSandboxAction(null);
    }
  };

  // 3. Khách bấm Thử lại thanh toán trong Modal Sandbox
  const handleRetryPayment = () => {
    setPaymentStatus("PENDING");
    setSandboxMessage(null);
  };

  // 4. Khách bấm Hủy đơn hàng trong Modal Sandbox (Hoàn trả nguyên liệu kho)
  const handleCancelPendingOrder = async () => {
    if (!pendingOrderId) return;
    if (
      !confirm(
        "Bạn có chắc muốn hủy đơn hàng này? Số lượng thức uống sẽ được hoàn trả lại vào kho nguyên liệu."
      )
    ) {
      return;
    }

    try {
      await cancelOrderApi(pendingOrderId, "Khách hàng hủy đơn tại Cổng thanh toán Sandbox");
      alert("Đã hủy đơn hàng thành công và hoàn trả kho nguyên liệu!");
      setShowSandboxModal(false);
      setPendingOrderId(null);
      setPaymentStatus("PENDING");
    } catch (err: any) {
      alert(err.message || "Không thể hủy đơn hàng này");
    }
  };

  // MÀN HÌNH (5) XÁC NHẬN ĐƠN HÀNG THÀNH CÔNG
  if (completedOrder) {
    return (
      <div className="min-h-screen w-full bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center">
          {/* Icon thành công */}
          <div className="w-20 h-20 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/10">
            <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-2xl font-extrabold text-white">Đặt hàng thành công!</h1>
          <p className="text-neutral-400 text-sm mt-1">Cảm ơn bạn đã trải nghiệm BrewLite</p>

          {/* Thẻ biên lai (Receipt Card) */}
          <div className="w-full bg-neutral-800/60 border border-neutral-700/60 rounded-2xl p-5 mt-6 space-y-3.5 text-left">
            {/* Mã nhận nước */}
            <div className="flex items-center justify-between py-1.5 border-b border-neutral-700/60 text-sm">
              <span className="text-neutral-400 font-medium">Mã nhận nước</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-black text-2xl text-amber-400 tracking-wider">
                  #{completedOrder.orderId ? completedOrder.orderId.slice(-6).toUpperCase() : ""}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyOrderId(completedOrder.orderId)}
                  title={`Sao chép toàn bộ mã đơn: ${completedOrder.orderId}`}
                  className="p-1.5 text-neutral-400 hover:text-white bg-neutral-700/50 hover:bg-neutral-700 rounded-lg transition active:scale-95 flex items-center gap-1"
                >
                  {copiedOrderId ? (
                    <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      Đã chép
                    </span>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Tổng thanh toán */}
            <div className="flex items-center justify-between py-1.5 border-b border-neutral-700/60 text-sm">
              <span className="text-neutral-400 font-medium">Tổng thanh toán</span>
              <div className="text-right">
                <span className="font-extrabold text-lg text-white">
                  {completedOrder.total.toLocaleString("vi-VN")} đ
                </span>
                {completedOrder.loyaltyPoints > 0 && (
                  <div className="mt-0.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full">
                      🎁 +{completedOrder.loyaltyPoints} điểm thưởng
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Trạng thái */}
            <div className="flex items-center justify-between py-1.5 text-sm">
              <span className="text-neutral-400 font-medium">Trạng thái</span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-full font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Đã thanh toán
              </span>
            </div>
          </div>

          <p className="text-amber-500/90 font-medium text-xs sm:text-sm mt-5 animate-pulse">
            ☕ Đơn hàng đã được chuyển tới quầy Barista. Mời bạn theo dõi tiến độ pha chế!
          </p>

          {/* Điều hướng */}
          <div className="w-full mt-6 space-y-3">
            <Link
              href="/profile"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-2xl flex items-center justify-center gap-2 transition shadow-lg shadow-amber-500/20 active:scale-98"
            >
              <span>Theo dõi đơn hàng</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/"
              className="w-full py-3 bg-neutral-800/80 hover:bg-neutral-800 hover:text-white text-neutral-300 font-semibold rounded-2xl flex items-center justify-center transition active:scale-98 border border-neutral-700/50"
            >
              Về trang chủ
            </Link>
          </div>
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
          onClick={handleOpenSandbox}
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
              <span>Đang mở cổng thanh toán...</span>
            </>
          ) : (
            <span>Tiến hành thanh toán • {finalPrice.toLocaleString("vi-VN")} đ</span>
          )}
        </button>
      </div>

      {/* MODAL CỔNG THANH TOÁN SANDBOX */}
      {showSandboxModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-700/80 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl relative flex flex-col max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">💳</span>
                <div>
                  <h3 className="font-bold text-sm text-white">Cổng Thanh Toán Sandbox</h3>
                  <p className="text-[11px] text-neutral-400">VietQR / Thẻ nội địa giả lập</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                Sandbox Mode
              </span>
            </div>

            {/* Thông tin giao dịch */}
            <div className="my-4 p-3.5 bg-neutral-950/70 border border-neutral-800 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Mã đơn hàng:</span>
                <span className="font-mono font-bold text-amber-400">
                  #{pendingOrderId?.slice(-6).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Số tiền thanh toán:</span>
                <span className="font-bold text-emerald-400 text-sm">
                  {finalPrice.toLocaleString("vi-VN")} đ
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Phương thức:</span>
                <span className="font-medium text-neutral-200">
                  {method === "WALLET" ? "Ví MoMo / ZaloPay" : "VietQR / Thẻ NAPAS"}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-neutral-800/80">
                <span className="text-neutral-400">Hết hạn sau:</span>
                <span className="font-mono text-amber-300 font-semibold">
                  ⏳ {formatCountdown(countdown)}
                </span>
              </div>
            </div>

            {/* Giả lập giao diện VietQR hoặc Thẻ */}
            {paymentStatus !== "FAILED" ? (
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl mb-4 text-neutral-950">
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider">
                    VietQR • NAPAS 247
                  </span>
                  <span className="text-[10px] text-neutral-500 font-medium">BrewLite Coffee</span>
                </div>
                {/* Simulated QR Code SVG */}
                <div className="w-36 h-36 bg-neutral-100 border-2 border-neutral-900 rounded-xl flex items-center justify-center relative p-2 shadow-inner">
                  <svg className="w-full h-full text-neutral-900" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="5" y="5" width="25" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="12" y="12" width="11" height="11" fill="currentColor" />
                    <rect x="70" y="5" width="25" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="77" y="12" width="11" height="11" fill="currentColor" />
                    <rect x="5" y="70" width="25" height="25" rx="3" fill="none" stroke="currentColor" strokeWidth="6" />
                    <rect x="12" y="77" width="11" height="11" fill="currentColor" />
                    <rect x="40" y="10" width="8" height="20" />
                    <rect x="55" y="15" width="8" height="15" />
                    <rect x="35" y="40" width="30" height="8" />
                    <rect x="42" y="55" width="16" height="16" />
                    <rect x="70" y="40" width="15" height="8" />
                    <rect x="75" y="60" width="18" height="12" />
                    <rect x="10" y="40" width="18" height="10" />
                    <rect x="40" y="75" width="20" height="12" />
                    <rect x="70" y="75" width="10" height="20" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-7 h-7 bg-amber-500 text-neutral-950 font-black rounded-lg flex items-center justify-center text-xs shadow-md border border-white">
                      ☕
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-neutral-600 mt-2 font-medium">
                  Quét mã để thanh toán hoặc dùng 2 nút kịch bản bên dưới
                </span>
              </div>
            ) : (
              /* Màn hình thông báo lỗi khi thanh toán thất bại */
              <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl mb-4 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <span className="text-base">❌</span>
                  <span>Giao dịch không thành công!</span>
                </div>
                <p className="text-xs text-rose-300 leading-relaxed">
                  {sandboxMessage}
                </p>
                <div className="text-[11px] text-neutral-400 pt-1">
                  💡 Giỏ hàng của bạn vẫn được giữ nguyên. Bạn có thể bấm <strong className="text-white">"Thử lại"</strong> để thanh toán lại hoặc <strong className="text-white">"Hủy đơn"</strong> để hoàn trả kho.
                </div>
              </div>
            )}

            {/* Các nút hành động Sandbox */}
            {paymentStatus === "FAILED" ? (
              <div className="space-y-2">
                <button
                  onClick={handleRetryPayment}
                  disabled={sandboxLoading}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold rounded-xl text-xs transition active:scale-95 flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>🔄 Thử lại thanh toán</span>
                </button>
                <button
                  onClick={handleCancelPendingOrder}
                  disabled={sandboxLoading}
                  className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-rose-400 border border-neutral-700 rounded-xl text-xs font-semibold transition active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span>✕ Hủy đơn hàng này</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="text-[11px] text-neutral-400 font-medium text-center mb-1">
                  Chọn kịch bản kiểm thử (Demo nghiệm thu):
                </div>

                {/* NÚT 1: THÀNH CÔNG */}
                <button
                  onClick={() => handleExecuteSandbox(false)}
                  disabled={sandboxLoading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
                >
                  {sandboxLoading && sandboxAction === "SUCCESS" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Đang xác thực ngân hàng (1.5s)...</span>
                    </>
                  ) : (
                    <>
                      <span>✓ Xác nhận thanh toán (Thành công)</span>
                    </>
                  )}
                </button>

                {/* NÚT 2: GIẢ LẬP LỖI */}
                <button
                  onClick={() => handleExecuteSandbox(true)}
                  disabled={sandboxLoading}
                  className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 disabled:opacity-50 text-rose-400 border border-rose-500/30 font-bold rounded-xl text-xs transition active:scale-95 flex items-center justify-center gap-2"
                >
                  {sandboxLoading && sandboxAction === "FAILURE" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
                      <span>Đang giả lập lỗi từ chối (1.5s)...</span>
                    </>
                  ) : (
                    <>
                      <span>✕ Giả lập lỗi (Demo PAYMENT_FAILED)</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setShowSandboxModal(false)}
                  disabled={sandboxLoading}
                  className="w-full text-center text-[11px] text-neutral-500 hover:text-neutral-300 py-1 transition"
                >
                  Đóng modal (đơn vẫn giữ PENDING)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}