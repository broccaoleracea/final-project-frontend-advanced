"use client";
import { usePathname } from "next/navigation";
import SIdebarView from "@/Components/Sidebar/SIdebar.view";



export default function Navbar() {
  const pathname = usePathname();
  if (pathname.startsWith("/auth")) {
    return null;
  }
  return <SIdebarView />;
}
