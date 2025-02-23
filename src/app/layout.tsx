import {Inter} from "next/font/google";
import "./globals.css";
import {Providers} from "@/providers/Providers";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import {ToastContainer} from "react-toastify";
import {ClientErrorBoundary} from "@/components/ClientErrorBoundary";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
});

export const metadata = {
    title: "GacorCihuy",
    description: "Segala kebutuhanmu, ada disini!",
    icons: {
        icon: "/logo/key-lineal-color.ico",
    },
};

export default function RootLayout({
                                             children,
                                         }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={`${inter.className} antialiased h-full w-full`}>
        <ClientErrorBoundary>
            <Providers>
                <div className="h-screen w-screen flex">
                    <Sidebar/>
                    <div className="flex flex-col flex-1 h-full w-full">
                        <Navbar/>
                        <main className="flex-1  pb-12 overflow-y-auto">{children}</main>
                        <ToastContainer position="top-right" autoClose={3000}/>
                        <Footer/>
                    </div>
                </div>
            </Providers>
        </ClientErrorBoundary>
        </body>

        </html>
    );
}
