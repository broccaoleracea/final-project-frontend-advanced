import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/providers/Providers";
import Sidebar from "@/Components/Sidebar/Sidebar"; // Your sidebar component

const inter = Inter();

export const metadata: Metadata = {
  title: "Auth - GacorCihuy",
  description: "Authentication pages.",
};

export default function AuthLayout({
                                     children,
                                   }: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="en">
      <body className={`${inter.className} antialiased h-full w-full`}>
      <div className="h-screen w-screen">
        <div className="flex w-full h-full">
          <Sidebar />
          <div className="h-full w-full">
            <Providers>
              <div>{children}</div>
            </Providers>
          </div>
        </div>
      </div>
      </body>
      </html>
  );
}
