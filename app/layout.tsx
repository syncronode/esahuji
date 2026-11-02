import type { Metadata, Viewport } from "next";
import { Poppins, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const tiro = Tiro_Devanagari_Hindi({
  subsets: ["latin", "devanagari"],
  weight: "400",
  variable: "--font-tiro",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://esahuji.com"),
  title: "eSahuji | तपाईंको डिजिटल साहुजी",
  description:
    "eSahuji is a POS for Nepali kirana stores and small shops: fast billing, cash and QR, udharo, stock and owner insights. Tablet included.",
  openGraph: {
    title: "eSahuji | तपाईंको डिजिटल साहुजी",
    description: "Billing, udharo, stock and sales on one tablet, made for Nepali shops.",
    url: "https://esahuji.com",
    siteName: "eSahuji",
    images: [{ url: "/assets/icon-full-360.png", width: 360, height: 360 }],
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2563EB",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${tiro.variable}`}>
      <body>{children}</body>
    </html>
  );
}
