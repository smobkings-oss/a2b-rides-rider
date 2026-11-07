import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A2B Rides | HopRide - Instant & Scheduled Rides",
  description: "Premium rides in NW Ohio. Book instantly or schedule ahead. Better pay for drivers. Local to Toledo and beyond.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <header className="border-b border-gold-500/30 bg-black/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-500 to-holographic flex items-center justify-center text-black font-bold text-sm">
                A2B
              </div>
              <span className="text-xl font-bold holographic">HopRide</span>
            </div>
            <nav className="flex gap-6 text-sm">
              <a href="#" className="hover:text-gold-400 transition">Rides</a>
              <a href="#" className="hover:text-gold-400 transition">Account</a>
            </nav>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-gold-500/20 py-8 text-center text-sm text-gray-400">
          A2B Rides • Premium local rides • NW Ohio & Michigan
        </footer>
      </body>
    </html>
  );
}