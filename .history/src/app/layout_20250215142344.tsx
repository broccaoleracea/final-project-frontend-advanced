import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/Components/Sidebar/Sidebar";
import Footer from "@/Components/Footer/Footer";

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
<<<<<<< HEAD
        <div className="h-screen w-screen">
          <div className="flex w-full h-full">
            <Sidebar />
            <div className="h-full w-full">
              {children}
              <Footer />
            </div>
          </div>
=======
        <div className="flex w-100">
          
       
        <Sidebar/>
        {children}
        <Footer/>
>>>>>>> 7dfa8dc047ef8e7764085cd43cf6d7737e3351e1
        </div>
      </body>
      <script src="node_modules\flowbite\dist\flowbite.min.js"></script>
    </html>
  );
}
