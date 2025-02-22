"use client";
import { usePathname } from "next/navigation";
import SIdebarView from "@/Components/Sidebar/SIdebar.view";

export default function Sidebar() {
  const pathname = usePathname();
  if (!pathname.startsWith("/admin")) {
    return null;
  }
  return <SIdebarView />;
}
