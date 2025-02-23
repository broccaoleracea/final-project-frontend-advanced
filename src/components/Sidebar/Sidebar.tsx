"use client";
import { usePathname } from "next/navigation";
import SIdebarView from "@/components/Sidebar/SIdebar.view";

export default function Sidebar() {
  const pathname = usePathname();
  if (!pathname.startsWith("/admin") || pathname.startsWith("/reset-password") ) {
    return null;
  }
  return <SIdebarView />;
}
