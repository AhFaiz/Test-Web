"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    if (!authStatus && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  // Don't show navigation on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show navigation only if authenticated
  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && (
        <div className="border-b bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="flex space-x-6 h-14">
              <Link
                href="/admin/products"
                className={cn(
                  "flex items-center px-4 border-b-2 text-sm font-medium transition-colors hover:text-blue-600",
                  isActive("/admin/products")
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-700"
                )}
              >
                Produk
              </Link>
              <Link
                href="/admin/transactions"
                className={cn(
                  "flex items-center px-4 border-b-2 text-sm font-medium transition-colors hover:text-blue-600",
                  isActive("/admin/transactions")
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-700"
                )}
              >
                Pesanan
              </Link>
              <Link
                href="/admin/clients"
                className={cn(
                  "flex items-center px-4 border-b-2 text-sm font-medium transition-colors hover:text-blue-600",
                  isActive("/admin/clients")
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-700"
                )}
              >
                Client
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  );
}