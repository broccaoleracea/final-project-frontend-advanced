import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/Components/Sidebar";
import Footer from "@/Components/Footer";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
<<<<<<< HEAD
        <div className="flex w-100">
          <Sidebar />

        {children}</div>
=======
        <Sidebar/>
        {children}
        <Footer/>
>>>>>>> aefb5e8f01a8d2fd687abaa0baada7bbe47be6e8
      </body>
      <script src="node_modules\flowbite\dist\flowbite.min.js"></script>
    </html>
  );
}
