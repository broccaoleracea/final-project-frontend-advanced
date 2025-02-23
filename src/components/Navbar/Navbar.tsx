"use client";
import { usePathname } from "next/navigation";

import NavbarView from "@/components/Navbar/Navbar.view";



export default function Navbar() {
    const pathname = usePathname();
    if (!pathname.startsWith("/admin") || !pathname.startsWith("/reset-password")|| pathname.startsWith("/auth")) {
        return null;
    }
    return <NavbarView />;
}
