import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import PaymentModal from "../components/PaymentModal";
import NotificationToast from "../components/NotificationToast";
import ClockIntroLoader from "../components/ClockIntroLoader";
import WhatsAppAgent from "../components/WhatsAppAgent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "0.1% Community | The Elite High-Income Digital Guild",
  description: "Join the top 0.1% in video editing, freelancing, web development, and content creation. Exactly 100 slots only. Private VIP WhatsApp circles, direct founder mentorship, and real earnings proof wall.",
  openGraph: {
    title: "0.1% Community - Master High-Income Digital Skills",
    description: "₹999 Pro / ₹1,499 VIP Lifetime Access. Exactly 100 slots only. Exclusive WhatsApp circles and transparent community results.",
    type: "website",
  },
  verification: {
    google: "Kxq1pTJDuU0rM2PcvxapP4jaSPNuLzKw2Uaa1Y4AWDY",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <head>
        <meta name="google-site-verification" content="Kxq1pTJDuU0rM2PcvxapP4jaSPNuLzKw2Uaa1Y4AWDY" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-black text-white min-h-screen flex flex-col font-sans selection:bg-red-600 selection:text-white antialiased overflow-x-hidden">
        <AppProvider>
          {/* Dramatic 2-3 Second Animated Clock Loader */}
          <ClockIntroLoader />

          <div className="flex flex-col min-h-screen bg-black text-white relative">
            <Navbar />
            <NotificationToast />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <AuthModal />
            <PaymentModal />
            
            {/* Live WhatsApp Agent Floating Bubble */}
            <WhatsAppAgent />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
