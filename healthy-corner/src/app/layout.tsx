import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import I18nProvider from "@/components/providers/I18nProvider";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";

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
  keywords: ["healthy food", "restaurant", "nutrition", "balanced meals", "Mauritania", "Nouakchott"],
  authors: [{ name: APP_NAME }],
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    type: "website",
    url: "https://healthycornermauritanie.me",
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
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  metadataBase: new URL("https://healthycornermauritanie.me"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col min-h-screen">
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

