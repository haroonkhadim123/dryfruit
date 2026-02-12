"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// ✅ dynamic imports
const Navbar = dynamic(() => import("./component/Navbar"), {
  ssr: false,
});

const Footer = dynamic(() => import("./component/Footer"), {
  ssr: false,
});

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const showNavbar =
    pathname === "/" ||
    pathname === "/products" ||
    pathname === "/cart" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname === "/trackorder" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/faq" ||
    pathname === "/shipping" ||
    pathname === "/return" ||
    pathname === "/privacy" ||
    pathname === "/term" ||
    pathname === "/booking" ||
    pathname.startsWith("/products/");

  const showFooter = 
   pathname === "/" ||
    pathname === "/products" ||
    pathname === "/cart" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname === "/trackorder" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/faq" ||
    pathname === "/shipping" ||
    pathname === "/return" ||
    pathname === "/privacy" ||
    pathname === "/term" ||
    
    pathname.startsWith("/products/");

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </>
  );
}
