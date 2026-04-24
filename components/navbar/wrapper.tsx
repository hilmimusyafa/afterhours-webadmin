"use client";
import Navbar from "@/components/navbar/navbar";
import { usePathname } from "next/navigation";

export default function NavbarWrapper() {
  const pathname = usePathname();
  if (pathname === "/login") return null;
  return <Navbar />;
}