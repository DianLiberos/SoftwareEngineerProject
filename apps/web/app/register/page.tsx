"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { registerApi } from "@/services/auth.service";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const login = useAuthStore((state) => state.login);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không trùng khớp");
      return;
    }

    setLoading(true);

    try {
      await registerApi(name, email, password);
      // KHÔNG tự đăng nhập nữa -> Chuyển sang /login kèm thông báo
      router.push(`/login?registered=true&email=${encodeURIComponent(email)}${redirectUrl !== "/" ? `&redirect=${redirectUrl}` : ""}`);
    } catch (err: any) {
      setError(err.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md py-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-white">BrewLite</span>
          <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-medium">Coffee</span>
        </Link>
        <h2 className="text-xl font-bold text-white mt-4">Tạo tài khoản mới</h2>
        <p className="text-xs text-neutral-400 mt-1">
          Đăng ký để tích điểm thành viên và nhận ưu đãi mỗi ngày
        </p>
      </div>

      <div className="bg-neutral-800/60 border border-neutral-800 rounded-3xl p-6 shadow-xl backdrop-blur">
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Họ và tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-neutral-900 border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
              placeholder="Nguyễn Văn A"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-neutral-900 border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
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
              className="w-full bg-neutral-900 border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
              placeholder="Tối thiểu 6 ký tự"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">Xác nhận mật khẩu</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-neutral-900 border border-neutral-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500 transition"
              placeholder="Nhập lại mật khẩu"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-amber-500 hover:bg-amber-400 disabled:bg-neutral-700 text-neutral-950 font-bold rounded-xl transition active:scale-95 flex items-center justify-center gap-2 text-sm shadow-lg shadow-amber-500/10"
          >
            {loading ? <span>Đang khởi tạo tài khoản...</span> : <span>Đăng ký thành viên</span>}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-neutral-400">
          Đã có tài khoản?{" "}
          <Link
            href={`/login${redirectUrl !== "/" ? `?redirect=${redirectUrl}` : ""}`}
            className="text-amber-400 hover:underline font-semibold"
          >
            Đăng nhập
          </Link>
        </div>
      </div>

      <div className="text-center mt-6">
        <Link href="/" className="text-xs text-neutral-400 hover:text-white transition">
          &larr; Bỏ qua, quay lại thực đơn
        </Link>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-900 flex items-center justify-center text-neutral-400">Đang tải...</div>}>
      <RegisterForm />
    </Suspense>
  );
}