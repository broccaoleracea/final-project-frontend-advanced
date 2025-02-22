"use client";
import { usePathname } from "next/navigation";
import FooterView from "@/components/Footer/Footer.view";


export default function Navbar() {
    const pathname = usePathname();
    if (pathname.startsWith("/auth")) {
        return null;
    }
    return <FooterView />;
}
