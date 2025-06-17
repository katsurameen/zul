import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Press_Start_2P } from 'next/font/google';
import LayoutShell from "./components/LayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-press-start',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Zumawahib',
  description: 'Portfolio website',
  icons: {
    icon: '/favicon.ico', 
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${pressStart.variable} bg-[#222] text-white min-h-screen p-6 sm:p-8`}
      >
        <LayoutShell>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
