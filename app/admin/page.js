"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaPlusCircle, FaBoxes,FaEye } from "react-icons/fa";
import { useSession,signOut } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

const page = () => {
  const pathname=usePathname();
   const { data: session } = useSession();
     const [sidebarOpen, setSidebarOpen] = useState(false);
      const [orders, setOrders] = useState([]);
      const [product, setproduct] = useState([]);
       useEffect(() => {
             const fetchCart = async () => {
               const res = await fetch("/api/order",{cache:"no-store"});
               const data = await res.json();
               setOrders(data.products)
           
               if (res.ok) {
                 console.log(data); // all cart items
               } else {
                 console.log('Failed to fetch cart items');
               }
             };
           
             fetchCart();
           }, []);
            useEffect(() => {
             const fetchCart = async () => {
               const res = await fetch("/api/product",{cache:"no-store"});
               const data = await res.json();
               setproduct(data.products)
           
               if (res.ok) {
                 console.log(data); // all cart items
               } else {
                 console.log('Failed to fetch products');
               }
             };
           
             fetchCart();
           }, []);
           const linkClass = (path) => `
  flex items-center gap-3 px-4 py-2 rounded-md mt-3 transition-all duration-200
  ${pathname === path 
    ? "text-black font-semibold underline underline-offset-4" 
    : "text-gray-700 hover:bg-gray-100 hover:text-black"
  }
`;


  return (
    <>
      {/* Top Navbar */}
      <div className="bg-white fixed top-0 left-0 w-full  flex items-center justify-center shadow z-40">
        <Image src="/logo.jpg" width={90} height={40} alt="Logo" />
      </div>
        <button
          className="md:hidden fixed top-5 left-4 text-gray-700 text-2xl z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
         {sidebarOpen ? 'X': '☰'}
        </button>

      {/* Layout */}
      <section className="flex pt-16 bg-gray-50 min-h-screen">

       {/* Desktop Sidebar */}
      <aside className="w-[20vw] min-h-screen hidden md:block bg-white shadow-lg fixed left-0 top-16 p-4">
    
      {/* Title */}
      <h1 className="text-xl font-bold mt-6 text-center text-gray-800 mb-4">
        Admin Dashboard
      </h1>
        <div className="bg-gray-400 h-[3px] "></div>
      {/* Menu Wrapper */}
      <div className="flex flex-col justify-between h-[calc(100vh-120px)]">
    
        {/* Navigation */}
        <nav className="flex flex-col gap-1">
       <Link href="/admin" className={linkClass("/admin")}>
      <MdDashboard className="text-xl" />
      <span>Dashboard</span>
    </Link>
    
    <Link href="/addproduct" className={linkClass("/addproduct")}>
      <FaPlusCircle className="text-lg" />
      <span>Add Product</span>
    </Link>
    
    <Link href="/vieworder" className={linkClass("/vieworder")}>
      <FaEye className="text-lg" />
      <span>View Order</span>
    </Link>
    
    <Link href="/manageproducts" className={linkClass("/manageproducts")}>
      <FaBoxes className="text-lg" />
      <span>Manage Products</span>
    </Link>
    
          <Link
            href="/"
            onClick={() => {
                   toast.success('Logout Successfully')
              setSidebarOpen(false);
              signOut({ callbackUrl: "/" });
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-md
                       text-red-600 hover:bg-gray-100 transition-all duration-200"
          >
            <MdLogout className="text-xl" />
            <span>Logout</span>
          </Link>
    
        </nav>
    
   
       
    
      </div>
    </aside>
    {/* Sidebar mobile  */}
    <aside
      className={`
        fixed left-0 w-[60vw] min-h-screen bg-white shadow-lg p-4
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden
      `}
    >
      {/* Title */}
      <h1 className="text-xl font-bold mt-6 text-center text-gray-800 mb-4">
        Admin Dashboard
      </h1>
      <div className="bg-gray-400 h-[3px] mb-4"></div>
    
      {/* Menu Wrapper */}
      <div className="flex flex-col justify-between h-[calc(100vh-120px)]">
        {/* Navigation */}
        <nav className="flex flex-col gap-1">
    
          <Link
            href="/admin"
            onClick={() => setSidebarOpen(false)}
            className={linkClass("/admin")}
          >
            <MdDashboard className="text-xl" />
            <span>Dashboard</span>
          </Link>
    
          <Link
            href="/addproduct"
            onClick={() => setSidebarOpen(false)}
            className={linkClass("/addproduct")}
          >
            <FaPlusCircle className="text-lg" />
            <span>Add Product</span>
          </Link>
    
          <Link
            href="/manageproducts"
            onClick={() => setSidebarOpen(false)}
            className={linkClass("/manageproducts")}
          >
            <FaBoxes className="text-lg" />
            <span>Manage Products</span>
          </Link>
    
          <Link
            href="/vieworder"
            onClick={() => setSidebarOpen(false)}
            className={linkClass("/vieworder")}
          >
            <FaEye className="text-lg" />
            <span>View Order</span>
          </Link>
    
          <Link
            href="/"
            onClick={() => {
                   toast.success('Logout Successfully')
              setSidebarOpen(false);
              signOut({ callbackUrl: "/" });
            }}
            className="flex items-center gap-3 px-4 py-2 rounded-md
                       text-red-600 hover:bg-gray-100 transition-all duration-200"
          >
            <MdLogout className="text-xl" />
            <span>Logout</span>
          </Link>
    
        </nav>
      </div>
    </aside>




        {/* Main Content */}
        <main className="md:ml-[20vw] flex-1 p-8">

          <h1 className="text-2xl font-semibold text-gray-800 mb-6 mt-2">
            Dashboard
          </h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Total Orders */}
            <div className="bg-white rounded-xl p-6 border border-gray-200
                            hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                {`    Total Orders`}
                  </p>
                  <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {orders.length}
                  </h2>
                </div>

                <div className="bg-gray-100 p-4 rounded-full">
                  <FaBoxes className="text-gray-600 text-xl" />
                </div>
              </div>
            </div>
              {/* Total Products */}
            <div className="bg-white rounded-xl p-6 border border-gray-200
                            hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                 {`   Total Products`}
                  </p>
                  <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {product.length}
                  </h2>
                </div>

                <div className="bg-gray-100 p-4 rounded-full">
                  <FaBoxes className="text-gray-600 text-xl" />
                </div>
              </div>
            </div>

          </div>
        </main>

      </section>
      
    </>
  );
};

export default page;
