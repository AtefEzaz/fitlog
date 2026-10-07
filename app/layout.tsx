import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Pick a lift, lock it into today's plan.",
  icons: { icon: "/assets/logo.png" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <body>
        <PlanProvider>
          <Navbar />
          <main className="mx-auto min-h-[70vh] max-w-7xl px-4 sm:px-6">
            {children}
          </main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#141414",
                color: "#fff",
                border: "1px solid #ccff00",
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}
