import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/components/navbar/wrapper";

export const metadata: Metadata = {
  title: "After Hours Admin",
  description: "After Hours Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="mx-auto px-16 py-16 w-full min-h-[calc(100vh-64px)] flex flex-col">
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}