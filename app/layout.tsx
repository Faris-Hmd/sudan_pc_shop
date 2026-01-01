import React from "react";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import NavBar from "@/components/NavBar";
import { SessionProvider } from "next-auth/react";
import AppFooter from "../components/footer";
import BtmNav from "../components/BtmNav";
const roboto = Nunito({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sudan PC | Premium Gaming Components",
  description: "The ultimate destination for PC builders and gamers in Sudan. Quality components, rapid delivery.",
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="disable">
      <body
        className={`${roboto.className} antialiased bg-[#eee] text-slate-900 min-h-screen flex flex-col`}
      >
        <SessionProvider>
          <main className="w-full  grow min-h-screen">
            <Toaster position="top-center" expand />
            <NavBar />
            {children}
            <BtmNav />
          </main>
          <AppFooter />
        </SessionProvider>
      </body>
    </html>
  );
}
