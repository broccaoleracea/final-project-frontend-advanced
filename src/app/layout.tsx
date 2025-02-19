"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import Footer from "@/Components/Footer/Footer";
import Script from "next/script";
import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// ✅ Perbaikan ErrorFallback dengan gaya yang lebih baik
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 p-6">
      <h2 className="text-2xl font-bold text-red-600">Terjadi Kesalahan!</h2>
      <p className="text-zinc-700">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Coba Lagi
      </button>
    </div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased h-full w-full`}>
            <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (
              <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
            )}>
              <Providers>
        <div className="h-screen w-screen flex">
          <Sidebar />
          <div className="flex flex-col flex-1 h-full w-full">
            <Navbar />
                <main className="flex-1 p-4 overflow-y-auto">{children}</main>
                <ToastContainer position="top-right" autoClose={3000} />
            <Footer />
          </div>
        </div>
              </Providers>
            </ErrorBoundary>
      </body>
      
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.js" strategy="lazyOnload" />
    </html>
  );
}
