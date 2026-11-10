import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import PaymentModal from "../components/PaymentModal";
import NotificationToast from "../components/NotificationToast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "0.1% Community | The Elite High-Income Digital Guild",
  description: "Join the top 0.1% in video editing, freelancing, web development, and content creation. Private VIP WhatsApp circles, member hub, and real earnings proof wall.",
  openGraph: {
    title: "0.1% Community - Master High-Income Digital Skills",
    description: "₹999 Lifetime Access. Exclusive WhatsApp circles and transparent community results.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-white text-[#091540] min-h-screen flex flex-col font-sans selection:bg-[#091540] selection:text-white">
        <AppProvider>
          <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <NotificationToast />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <AuthModal />
            <PaymentModal />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
