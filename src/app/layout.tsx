import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import Footer from "@/Components/Footer/Footer";
import Script from "next/script";
import Navbar from "@/Components/Navbar/Navbar";
import Sidebar from "@/Components/Sidebar/Sidebar";

const inter = Inter();

export const metadata: Metadata = {
  title: "GacorCihuy",
  description: "Website peminjaman elektronik.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased h-full w-full`}>
        <div className="h-screen w-screen">
          <div className="flex w-full h-full">
            <div className="h-full w-full">
              <Navbar />
              <Sidebar />
              <Providers>
                <div>{children}</div> {/* Default Layout */}
              </Providers>
              <Footer />
            </div>
          </div>
        </div>
      </body>
      <Script src="node_modules/flowbite/dist/flowbite.min.js"></Script>
    </html>
  );
}
