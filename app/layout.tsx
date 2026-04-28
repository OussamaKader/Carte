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
  title: "Carte AEM — Association des Étudiants Mauritaniens au Maroc",
  description: "Créez votre carte officielle de membre AEM en quelques minutes.",

  openGraph: {
    title: "Carte AEM",
    description: "Obtenez votre carte officielle de membre AEM",
    url: "https://www.oussamakader.best",
    siteName: "AEM Maroc",
    images: [{ url: "/vercel.svg", width: 800, height: 800 }],
    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Carte AEM",
    description: "Obtenez votre carte officielle de membre AEM",
    images: ["/vercel.svg"],
  },

  icons: {
    icon: "/vercel.svg",
    shortcut: "/vercel.svg",
    apple: "/vercel.svg",
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
