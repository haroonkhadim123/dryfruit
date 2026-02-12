"use client";
import Link from "next/link";
import Image from "next/image";
import {
  FaHome,
  FaBox,
  FaInfoCircle,
  FaPhoneAlt,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

import OfferTimer from "./OfferTimer";
import { MdLocalShipping, MdLogout } from "react-icons/md";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname, } from "next/navigation";
import { getDeviceId } from "../utilities/deviceId";
import toast from "react-hot-toast";






const Navbar = () => {

  const pathname = usePathname();


  const { data: session } = useSession();


 
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [show, setShow] = useState(false); // account dropdown
  const [search, setSearch] = useState(""); // search input
  const [searchOpen, setSearchOpen] = useState(false); // mobile search overlay
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setcart] = useState([])


useEffect(() => {
  const deviceId = getDeviceId();

  fetch(`/api/cart?deviceId=${deviceId}`)
    .then(res => res.json())
    .then(data => setcart(data));
}, []);
    




useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/product");
      const data = await res.json();

      console.log("API RESPONSE 👉", data);

      if (Array.isArray(data.products)) {
        setProducts(data.products.filter((p) => p?._id));
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Navbar fetch error:", error);
      setProducts([]);
    }
  };

  fetchProducts();
}, []);


  // Filtered products for search
useEffect(() => {
  if (search.trim() === "") {
    setLoading(false);
    return;
  }

  setLoading(true);

  const timer = setTimeout(() => {
    setLoading(false);
  }, 2000); // ⏳ 2 seconds loader

  return () => clearTimeout(timer);
}, [search]);
const filteredProducts =
  search.trim() === ""
    ? []
    : products.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );



  // Link active class
  const linkClass = (path) =>
    pathname === path
      ? "text-black font-semibold border-b-2 border-black flex items-center gap-2"
      : "text-gray-500 hover:text-black flex items-center gap-2";

  // Promo ticker
  const promoText = [
    "🚚 Free Nationwide Shipping on Orders Above Rs. 5,000",
    "🔥 Enjoy Flat 50% OFF Storewide",
    "🌿 Handpicked • Premium • 100% Natural",
    "⭐ Trusted by Thousands of Happy Customers",
  ];
  const scrollingText = [...promoText, ...promoText];
 // empty array => runs only once on client mount


;






  return (
    <>
    <OfferTimer/>
      {/* ===== Promo Ticker ===== */}
      <section className="bg-black text-gray-300 py-2 overflow-hidden">
        <div className="relative w-full">
          <div className="flex w-max animate-ticker gap-8 whitespace-nowrap">
            {scrollingText.map((text, index) => (
              <span
                key={index}
                className="font-semibold text-sm sm:text-base md:text-lg"
              >
                {text}
              </span>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes ticker {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-ticker {
            display: flex;
            animation: ticker 40s linear infinite;
          }
        `}</style>
      </section>

      {/* ===== Navbar ===== */}
      <nav className="bg-white shadow-md   sticky top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Hamburger mobile */}
          <div className="md:hidden flex items-center justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="text-gray-600 hover:text-black"
            >
              <FaBars size={20} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image width={80} height={80} src="/logo.jpg" alt="Logo" />
            </Link>
          </div>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center gap-8">
            <Link href="/" className={linkClass("/")}>
              <FaHome size={16} /> Home
            </Link>
            <Link href="/products" className={linkClass("/products")}>
              <FaBox size={16} /> Products
            </Link>
            <Link href="/about" className={linkClass("/about")}>
              <FaInfoCircle size={16} /> About
            </Link>
            <Link href="/contact" className={linkClass("/contact")}>
              <FaPhoneAlt size={16} /> Contact
            </Link>
            <Link href="/trackorder" className={linkClass("/trackorder")}>
              <MdLocalShipping size={16} /> Track Order
            </Link>
          </div>

          {/* Right: Search, Cart, Account */}
          <div className="flex justify-center items-center gap-4 relative">
            {/* Mobile Search */}
            <div>
              {!searchOpen && (
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
                  onClick={() => setSearchOpen(true)}
                >
                  <FaSearch className="text-gray-600" />
                </button>
              )}
           
            </div>
         
<div className="relative md:block hidden">
  <Link href="/cart" className="relative">
      <FaShoppingCart className="text-2xl" />

   {cart.length>0 && (
    
        <span className="absolute -top-2 -right-2 bg-red-600 text-white
          w-5 h-5 text-xs flex items-center justify-center rounded-full">
        {cart.length}
        </span>
   )}

    </Link>
  
  
</div>






          


            {/* Account */}
            {session ? (
              <div 
 className="relative">
                <button
                  onClick={() => setShow((prev) => !prev)}
                
                 
                  className="w-6 h-6 flex items-center cursor-pointer justify-center rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
                  title={session.user?.name}
                >
                  {session.user?.name?.charAt(0).toUpperCase() || "U"}
                </button>
            {show && (
  <span
    onClick={() => {
      toast.success("Logout successfully");
      setShow(false);


        signOut({ callbackUrl: "/" });
    
    }}
    className="bg-gray-300 cursor-pointer text-sm p-1 flex items-center justify-center font-bold rounded-2xl absolute whitespace-nowrap -left-15 -bottom-8"
  >
    <MdLogout className="font-bold" /> Sign Out
  </span>
)}

               
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition"
              >
                <span className="p-1 border-2 border-gray-600 rounded-full">
                  <FaUser size={16} className="text-gray-600" />
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* ===== Mobile Slide-in Menu ===== */}
        <div
          className={`fixed top-0 left-0 w-full h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-end p-8">
            <button onClick={() => setIsOpen(false)}>
              <FaTimes size={20} />
            </button>
          </div>

          <div className="flex justify-center my-4">
            <Link href="/">
              <Image width={100} height={100} src="/logo.jpg" alt="Logo" />
            </Link>
          </div>

          <div className="flex flex-col gap-6 px-6 mt-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={linkClass("/")}
            >
              <FaHome size={16} /> Home
            </Link>
            <Link
              href="/products"
              onClick={() => setIsOpen(false)}
              className={linkClass("/products")}
            >
              <FaBox size={16} /> Products
            </Link>
            <Link
              href="/about"
              onClick={() => setIsOpen(false)}
              className={linkClass("/about")}
            >
              <FaInfoCircle size={16} /> About
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={linkClass("/contact")}
            >
              <FaPhoneAlt size={16} /> Contact
            </Link>
            <Link
              href="/trackorder"
              onClick={() => setIsOpen(false)}
              className={linkClass("/trackorder")}
            >
              <MdLocalShipping size={16} /> Track Order
            </Link>
          </div>
          {session && (
            <div className=" bg-gray-200 px-3 mt-1 border-black  py-8 flex items-center justify-between  w-full">

            <div className="flex items-center justify-center gap-1">
               <button
              
          
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
                  title={session.user?.name}
                >
                  {session.user?.name?.charAt(0).toUpperCase() || "U"}
                </button>
                <div className="flex flex-col ">
                  <span className="text-sm text-black">{session.user?.name}</span>
                  <span className="text-sm text-gray-600">{session.user?.email}</span>
                
                </div>
              

            </div>
              <div>
                      <span
                        onClick={() => {
                           toast.success("Logout successfully");
                          setIsOpen(false);
                          signOut({ callbackUrl: "/" });
                        }}
                        className="flex gap-1 items-center justify-center whitespace-nowrap    font-bold  hover:bg-gray-100 cursor-pointer"
                      >
                        <MdLogout className="font-bold" /> Sign Out
                      </span>
                    </div>
            
          </div>
          )}
        </div>
        {/* ===== Mobile Slide-in Menu ===== */}
        <div
           className={`fixed top-0 left-0 w-full h-[100vh] overflow-auto no-scrollbar pb-10 bg-white shadow-lg 
  transform transition-transform duration-300 ease-in-out z-50
  ${searchOpen ? "translate-y-0" : "-translate-y-full"}`}
        >
             {searchOpen && (
                <div className=" mt-6  p-2   md:w-[60vw]  justify-center  mx-auto z-50  flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
              
                    className="flex-1 w-full border rounded-full  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  >
                    <FaTimes className="text-gray-600" />
                  </button>
                </div>
              )}
          {/* ===== Search Dropdown ===== */}
  {search && (
  <div className="grid grid-cols-1 gap-5 mt-4 md:w-[60vw] mx-auto z-50">
    {loading ? (
      // 🔄 Loader
      <div className="flex justify-center py-6">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-black"></div>
      </div>
    ) : filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <div
          key={product._id}
          className="flex items-center mt-4 justify-between bg-white rounded-xl p-4 hover:shadow-xl transition-shadow duration-200"
        >
          <Link
  href={`/products/${product._id}`}
  onClick={() => {
    
    setSearch("");
    setSearchOpen(false);
  }}
  className="flex items-center w-full"
>

            <div className="flex items-center gap-4">
              {product?.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={50}
                  height={50}
                  unoptimized
                  className="object-cover rounded-lg"
                />
              )}
              <div>
                <h3 className="font-medium text-gray-800">
                  {product.name}
                </h3>

                {product.oldprice && (
                  <span className="line-through text-gray-400 text-sm mr-2">
                    {product.oldprice} PKR/250g
                  </span>
                )}

                {product.newprice && (
                  <span className="font-bold text-gray-800">
                    {product.newprice} PKR/250g
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-center py-4">
      {`  No products found`}
      </p>
    )}
  </div>
)}

       

        </div>


        {/* Mobile overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
      </nav>

    
    </>
  );
};

export default Navbar;
