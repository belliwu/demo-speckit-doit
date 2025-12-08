import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Doit - 目標追蹤應用",
  description: "追蹤你的目標，掌握每一天",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
