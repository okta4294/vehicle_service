import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="id" suppressHydrationWarning>
      <head>
        <script src="https://kit.fontawesome.com/9d2a010394.js" crossOrigin="anonymous" async></script>
      </head>
      <body className={`${fredoka.variable} font-sans min-h-screen flex flex-col bg-background text-on-surface selection:bg-primary-container/30`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <SpeedInsights />
          <Toaster position="top-center" richColors theme="system" />
        </ThemeProvider>
      </body>
    </html>
  );
}
