"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { loginApi } from "@/services/auth.service";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";
  const isJustRegistered = searchParams.get("registered") === "true";
  const registeredEmail = searchParams.get("email") || "";

  const login = useAuthStore((state) => state.login);

  // Tự điền email nếu vừa đăng ký xong, mật khẩu để trống cho khách tự gõ
  const [email, setEmail] = useState(registeredEmail || "   ");
  const [password, setPassword] = useState(registeredEmail ? "" : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginApi(email, password);
      login(res.accessToken, res.user);
      router.push(redirectUrl);
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="w-full min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4 sm:p-6">
    <div className="w-full max-w-md py-8">
      {/* Header logo & title */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-white">BrewLite</span>
          <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-medium">Coffee</span>
        </Link>
        <h2 className="text-xl font-bold text-white mt-4">Đăng nhập tài khoản</h2>
        <p className="text-xs text-neutral-400 mt-1">
          {redirectUrl !== "/" ? "Đăng nhập để tiếp tục thanh toán đơn hàng" : "Chào mừng bạn quay trở lại"}
        </p>
      </div>

      {/* Box Form */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        {isJustRegistered && (
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span>Đăng ký thành công! Vui lòng nhập mật khẩu để đăng nhập.</span>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Mật khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-800 text-neutral-950 font-bold rounded-xl transition active:scale-95 flex items-center justify-center gap-2 text-sm shadow-lg shadow-amber-500/10"
          >
            {loading ? <span>Đang kiểm tra...</span> : <span>Đăng nhập ngay</span>}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-neutral-400">
          Chưa có tài khoản?{" "}
          <Link
            href={`/register${redirectUrl !== "/" ? `?redirect=${redirectUrl}` : ""}`}
            className="text-amber-400 hover:underline font-semibold"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>

      <div className="text-center mt-6">
        <Link href="/" className="text-xs text-neutral-400 hover:text-white transition">
          &larr; Bỏ qua, quay lại thực đơn
        </Link>
      </div>
    </div>
  </div>
);
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-900 flex items-center justify-center text-neutral-400">Đang tải trang đăng nhập...</div>}>
      <LoginForm />
    </Suspense>
  );
}