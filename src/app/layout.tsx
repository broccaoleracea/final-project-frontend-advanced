import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/providers/AuthProvider";
import { Provider } from "react-redux";
import { store } from "@/state/store";
import {Providers} from "@/providers/Providers";
import Sidebar from "@/Components/Sidebar/Sidebar";
import Footer from "@/Components/Footer/Footer";
import Script from "next/script";
import Redirect from "@/Redirect";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
}); 

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-full`}
      >
        <div className="h-screen w-screen">
          <div className="flex w-full h-full">
            {/* <Sidebar /> */}
            <div className="h-full w-full">
              <Providers>
                {children}
              </Providers>
              <Footer />
            </div>
          </div>
        </div>
      </body>
      <Script src="node_modules\flowbite\dist\flowbite.min.js"></Script>
    </html>
  );
}
