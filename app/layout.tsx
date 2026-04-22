import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoCare - Monitor Servis Kendaraan",
  description: "Aplikasi monitoring jadwal ganti oli dan servis rutin kendaraan Anda.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className={`${inter.variable} min-h-screen flex flex-col bg-dark-950 text-dark-50 selection:bg-brand-500/30`}>
        {children}
        <Toaster position="top-center" richColors theme="dark" />
      </body>
    </html>
  );
}
