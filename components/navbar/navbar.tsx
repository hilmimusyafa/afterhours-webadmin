"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "DASH", href: "/" },
  { label: "CTLG", href: "/catalog" },
  { label: "ORDR", href: "/orders" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="flex w-full items-center justify-between mb-6">
      <Link href="/" className="flex items-baseline gap-0 no-underline">
        <span className="font-['Ndot57Caps'] text-[2.1rem] tracking-[0.05em] text-[#f0ece4]">
          AFTER
        </span>
        <span className="font-['Ndot57Caps'] text-[2.1rem] tracking-[0.05em] text-[#d42b2b]">
          HOURS
        </span>
        <span className="ml-[10px] self-center font-['JetBrains_Mono'] text-[0.75rem] uppercase tracking-[0.3em] text-white">
          ADMIN
        </span>
      </Link>

      <div className="flex items-center gap-5">
      <nav className="flex items-center gap-1 rounded-full border border-[#1e1e1e] bg-[#111] p-[6px]">
        {NAV.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={[
          "rounded-full px-3 py-[5px]",
          "font-['Ndot57Caps'] text-[1.25rem] tracking-[0.12em]",
          "transition-colors",
          isActive(item.href) ? "text-[#d42b2b]" : "text-white hover:text-white",
          ].join(" ")}
        >
          {item.label}
        </Link>
        ))}
      </nav>

      <button
        type="button"
        className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#d42b2b] font-['Ndot57Caps'] text-[1.25rem] font-semibold text-white"
      >
        S
      </button>
      </div>
    </div>
  );
}