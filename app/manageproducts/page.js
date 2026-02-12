"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaPlusCircle, FaBoxes } from "react-icons/fa";
import { useState } from "react";
import { FaTrashAlt,FaEye } from "react-icons/fa";
import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";


const page = () => {
   const { data: session } = useSession();
    const pathname = usePathname();
  
     const [sidebarOpen, setSidebarOpen] = useState(false);
     const [Products, setProducts] = useState([])
     useEffect(() => {
       const fetchProducts = async () => {
  const res = await fetch("/api/product");
  const data = await res.json();
  setProducts(data.products.filter(p => p._id)); // filter out any item without _id
};
     
       fetchProducts();
     }, []);

      const handleDelete = async (id) => {
  if (!id) {
    toast.error("Product ID missing. Cannot delete.");
    return;
  }

  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const res = await fetch("/api/product", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Deleted successfully");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } else {
      toast.error(data.message || "Delete failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
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
      <div className="max-w-5xl mx-auto p-5 md:w-[50vw] w-full overflow-y-auto h-[90vh] md:ml-[30vw] no-scrollbar">
      <h2 className="text-2xl font-semibold mb-6 mt-4">Manage Products</h2>

     {Products.length===0?(<span>Products are not available yet!</span>):(
       <div className="grid grid-cols-1 gap-5">
        {Products.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
            {product?.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={30}
                  height={30}
                  unoptimized
                  className="object-cover rounded-lg w-16 h-16"
                />
              )}

           <div className="flex flex-col gap-2 ">
  <h3 className="font-medium text-gray-800">{product.name}</h3>
 
 <div className="flex gap-2 items-center">
  {product.oldprice && (
    <span className="line-through text-gray-400 text-sm">
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

            </div>

            {/* Delete */}
       <button
  onClick={() => product._id && handleDelete(product._id)}
  className="text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition"
>
  <FaTrashAlt size={16} />
</button>

          </div>
        ))}
      </div>
     )}
    </div>

      </section>
      
    </>
  );
};

export default page;
