import "./globals.css";
import type { Metadata } from "next";
import { Navbar, Footer } from "@/components";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Wheelz Hub",
  description: "Discover the best cars in the world",
  icons: {
    icon: "root/app/logo.ico",
    apple: "root/app/logo.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={"/logo.ico"} type="image/x-icon" sizes="16x16" />
      </head>
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
