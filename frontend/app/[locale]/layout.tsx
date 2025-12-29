import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQAssistant from "@/components/ai/FAQAssistant";
import { ThemeProvider } from "@/components/ThemeProvider";
import LayoutWrapper from "@/components/LayoutWrapper";
import TopBar from "@/components/TopBar";

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexa-Sphere | Intelligent AI Systems",
  description: "AI-Powered Consulting & Automation Agency based in Silicon Valley.",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <LayoutWrapper
              topBar={<TopBar />}
              navbar={<Navbar />}
              footer={<Footer />}
              faqAssistant={<FAQAssistant />}
            >
              {children}
            </LayoutWrapper>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
