import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { ThemeProvider } from "../context/ThemeContext";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "TechBazar — Nepal's PC & Laptop Marketplace",
  description: "Buy and sell new PCs, used laptops, and refurbished computers. Nepal's #1 trusted tech marketplace for desktops, laptops, gaming rigs and accessories.",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300","400","500","600","700","800","900"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${inter.className} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                {children}
                <ToastContainer position="top-right" autoClose={3000} />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


