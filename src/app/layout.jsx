import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppWidget from "@/component/whatsApp/WhatsApp";
import GoldenCursor from "@/component/cursor/GoldenCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Jas Modular & Interior Designer",
  description: "Design Your Space with Jas Modular & Interior Designer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <GoldenCursor/> */}
        {children}
        <WhatsAppWidget/>
      </body>
    </html>
  );
}
