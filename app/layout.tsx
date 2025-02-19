import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Flame } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GasKita - Solusi Kebutuhan Gas Anda',
  description: 'Distributor gas terpercaya dengan layanan 24 jam',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <nav className="bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <Flame className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-xl">GasKita</span>
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600">Beranda</Link>
                <Link href="/products" className="text-gray-700 hover:text-blue-600">Produk</Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600">Tentang Kami</Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600">Hubungi Kami</Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">GasKita</h3>
                <p className="text-gray-400">
                  Solusi terpercaya untuk kebutuhan gas Anda. Melayani dengan kualitas terbaik 24/7.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-400 hover:text-white">Beranda</Link></li>
                  <li><Link href="/products" className="text-gray-400 hover:text-white">Produk</Link></li>
                  <li><Link href="/about" className="text-gray-400 hover:text-white">Tentang Kami</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white">Hubungi Kami</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Kontak</h3>
                <p className="text-gray-400">
                  Jl H.MAWI KP. WARU<br />
                  GG. SERIUS RT04/RW013<br />
                  Indonesia<br />
                  <br />
                  Tel: +62 812 8332 9743<br />
                  Email: info@gaskita.com
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 GasKita. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
