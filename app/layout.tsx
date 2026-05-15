import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carte AEMM — Association des Étudiants Mauritaniens au Maroc",
  description: "Créez votre carte officielle de membre AEMM en quelques minutes.",

  openGraph: {
    title: "Carte AEMM",
    description: "Obtenez votre carte officielle de membre AEMM",
    url: "https://www.aem-maroc.org",
    siteName: "AEMM Carte",
    images: [{ url: "/og-image.svg", width: 800, height: 800 }],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Carte AEMM",
    description: "Obtenez votre carte officielle de membre AEMM",
    images: ["/og-image.svg"],
  },

  icons: {
    icon: "/og-image.svg",
    shortcut: "/og-image.svg",
    apple: "/og-image.svg",
  },
};
        
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
