import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BrewLite - Cà phê trực tuyến",
  description: "Ứng dụng đặt thức uống trực tuyến không tiền mặt BrewLite",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full antialiased font-sans">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
