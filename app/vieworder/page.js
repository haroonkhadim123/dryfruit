"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaPlusCircle, FaBoxes, FaEye } from "react-icons/fa";
import { useState } from "react";
import { useSession,signOut } from "next-auth/react";
import {
  FaTrash,

} from "react-icons/fa";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";





const ViewOrdersPage  = () => {
  const pathname = usePathname();

  const { data: session } = useSession();
      const [orders, setOrders] = useState([]);
     const [sidebarOpen, setSidebarOpen] = useState(false);
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
           const handleDelete = async (id) => {
  if (!id) {
    toast.error("Cannot delete.");
    return;
  }

  if (!confirm("Are you sure you want to delete?")) return;

  try {
    const res = await fetch("/api/order", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Deleted successfully");
      setOrders((prev) => prev.filter((p) => p._id !== id));
    } else {
      toast.error(data.message || "Delete failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("something went wrong");
  }
};
 const updateStatus = async (id,status) => {
    setOrders((prev) =>
      prev.map((c) =>
        c._id === id ? { ...c, status } : c
      )
    );

    try {
      const res = await fetch("/api/order", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Status Updated!");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };
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
        <Image src="/logo.jfif" width={90} height={40} alt="Logo" />
      </div>
        <button
          className="md:hidden fixed top-5 left-4 text-gray-700 text-2xl z-50"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
         {sidebarOpen ? 'X': '☰'}
        </button>

      {/* Layout */}
      <section className="flex pt-16 bg-gray-50 min-h-screen">

        {/* Sidebar */}
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
      <div className="max-w-5xl mx-auto p-6 md:w-[50vw] w-full  overflow-y-auto h-[90vh] md:ml-[30vw] no-scrollbar">
      <h2 className="text-2xl font-semibold mb-6 mt-4">All Orders</h2>
      

{orders.length===0?(<span>Not Order Yet Received</span>):(
  <div className="grid grid-cols-1 gap-6">
  {Array.isArray(orders) &&
    orders.map((order, index) => (
      <div
        key={order._id}
        className="bg-white shadow-lg rounded-xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
      >
        {/* ================= ORDER HEADER ================= */}
        <div className="mb-4 border-b pb-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {order.firstname} {order.lastname}
          </h3>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Email:</span> {order.email}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Phone:</span> {order.phone || "N/A"}
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-medium">Address:</span> {order.address}
          </p>
            <p className="text-sm text-gray-500">
            <span className="font-medium">City:</span> {order.city}
          </p>
              <p className="text-sm text-gray-500">
          <span className="font-medium">Status: </span>
<span
  className={`font-semibold px-2 py-1 rounded ${
    order.status === "Received"
      ? "text-yellow-500 "
      : order.status === "shipped"
      ? "text-blue-500 "
      : order.status === "Delivered"
      ? "text-green-500"
      : "bg-gray-200 text-gray-800"
  }`}
>
  {order.status}
</span>


          </p>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="mb-4">
          <h4 className="text-md font-semibold text-gray-700 mb-2">Products:</h4>
          <div className="space-y-3">
            {Array.isArray(order.products) &&
              order.products.map((p) => (
                <div
                  key={p.name}
                  className="bg-gray-50 rounded-md p-3 flex justify-between items-center"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {p.qty} • {p.grams}g
                    </p>
                  </div>
               
                </div>
              ))}
                 <div className="text-sm font-semibold">Total: Rs.{order.total}.00</div>
          </div>
        </div>

        {/* ================= STATUS BUTTONS ================= */}

<div className="flex flex-wrap gap-2 mt-4">
  {/* Admin clicks this when the order is shipped */}
  <button
    onClick={() => updateStatus(order._id, "shipped")}
    className="flex-1 py-2 rounded-lg text-sm font-medium bg-blue-500 text-white"
  >
    Shipped
  </button>

  {/* Admin clicks this when courier confirms delivery */}
  <button
    onClick={() => updateStatus(order._id, "Delivered")}
    className="flex-1 py-2 rounded-lg text-sm font-medium bg-green-500 text-white"
  >
    Delivered
  </button>

  {/* Delete order if needed */}
  <button
    onClick={() => handleDelete(order._id)}
    className="p-2 rounded-lg border border-red-500 text-red-500"
  >
    <FaTrash />
  </button>
</div>



      </div>
      
    ))}
</div>
)}



    </div>
      
    

      </section>
      
    </>
  );
};

export default ViewOrdersPage ;
