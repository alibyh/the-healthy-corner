import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import I18nProvider from "@/components/providers/I18nProvider";
import { APP_NAME, APP_DESCRIPTION, CONTACT_INFO, SOCIAL_LINKS } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  keywords: [
    "healthy food",
    "restaurant",
    "nutrition",
    "balanced meals",
    "Mauritania",
    "Mauritanie",
    "Nouakchott",
    "Healthy Corner",
    "The Healthy Corner",
    "Healthy Corner Mauritanie",
    "The Healthy Corner Mauritanie",
    "The Healthy Corner Nouakchott",
    "The Healthy Corner Tevragh Zeina",
    "The Healthy Corner Chighali",
    "The Healthy Corner Chighali Nouakchott",
    "The Healthy Corner Chighali Tevragh Zeina",
    "The Healthy Corner Chighali Nouakchott Tevragh Zeina",

    "الركن الصحي",
    "الركن الصحي موريتانيا",
    "الركن الصحي نواكشوط",
    "الركن الصحي تفرغ زينة",
    "الركن الصحي مقابل مسجد شيغالي",
    "الركن الصحي مقابل مسجد شيغالي نواكشوط",
    "الركن الصحي مقابل مسجد شيغالي تفرغ زينة",
    "الركن الصحي مقابل مسجد شيغالي نواكشوط تفرغ زينة",

  ],
  authors: [{ name: APP_NAME }],
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    type: "website",
    url: "https://healthycornermauritanie.me",
    siteName: APP_NAME,
    locale: "en_US",
    alternateLocale: ["ar_MA", "fr_FR"],
    images: [
      {
        url: "/images/logo.jpg",
        width: 1200,
        height: 630,
        alt: APP_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: ["/images/logo.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon.ico", sizes: "16x16", type: "image/x-icon" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://healthycornermauritanie.me",
  },
  themeColor: "#0f172a",
  metadataBase: new URL("https://healthycornermauritanie.me"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: APP_NAME,
    url: "https://healthycornermauritanie.me",
    image: "https://healthycornermauritanie.me/images/logo.jpg",
    description: APP_DESCRIPTION,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT_INFO.address,
      addressLocality: "Nouakchott",
      addressCountry: "Mauritania",
    },
    telephone: CONTACT_INFO.phone,
    sameAs: [
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.instagram,
      SOCIAL_LINKS.snapchat,
      SOCIAL_LINKS.whatsapp,
    ],
  };

  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col min-h-screen">
        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <I18nProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}

