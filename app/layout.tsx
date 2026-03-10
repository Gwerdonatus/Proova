import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/landing/SiteFooter";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Proova — Revenue attribution for social commerce",
  description:
    "Know which influencer or ad brought confirmed money — even when payment happens in DMs, WhatsApp, and bank transfers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-app-bg text-app-ink`}>
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}