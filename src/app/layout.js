import { Archivo_Black, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import LayoutShell from "./components/LayoutShell";

const archivo = Archivo_Black({
  weight: "400",
  variable: "--font-archivo",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-spacemono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Zulfa Sulthany - Backend Developer',
  description: 'Portfolio of Zulfa Sulthany, a backend developer based in Bandung, Indonesia. Clean architecture, reliable systems, selected projects.',
  openGraph: {
    title: 'Zulfa Sulthany - Backend Developer',
    description: 'Portfolio of Zulfa Sulthany, a backend developer based in Bandung, Indonesia.',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${grotesk.variable} ${spaceMono.variable} bg-[#fffdf5] text-black antialiased`}
      >
        <LayoutShell>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
