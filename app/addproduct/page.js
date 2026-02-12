"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaPlusCircle, FaBoxes, FaTag, FaDollarSign, FaImage, FaEye } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "../component/Loader";



const AddProductPage = () => {
    const pathname = usePathname();
 const { data: session } = useSession();
  const [form, setForm] = useState({ name: "", oldprice: "", newprice: "", image: "" });
  const [uploading, setUploading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, seterror] = useState({ name: "", oldprice: "", newprice: "", image: "" });
  const [loader, setloader] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });



const handleSubmit = async (e) => {
  e.preventDefault();

  seterror({ name: "", oldprice: "", newprice: "", image: "" });

  const allempty= !form.name.trim() && !form.oldprice.trim() && !form.newprice.trim() && !form.image.trim();
  if(allempty){
    seterror({
      name:'ProductName is required',
      oldprice:'Oldprice is required',
      newprice:'Newprice is required',
      image:'Image is required',
    })
    return;
  }
  if (!form.name.trim()) {
  seterror(prev => ({ ...prev, name: "ProductName is required" }));
  return;
}
if (!form.oldprice.trim()) {
  seterror(prev => ({ ...prev, oldprice: "Oldprice is required" }));
  return;
}
if (!form.newprice.trim()) {
  seterror(prev => ({ ...prev, newprice: "Newprice is required" }));
  return;
}
if (!form.image.trim()) {
  seterror(prev => ({ ...prev, image: "Image is required" }));
  return;
}

  

  if (submitting) return; // prevent double submit
  setSubmitting(true);
  setloader(true)

  try {
    const res = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await res.json();
    console.log(result)

    if (result.message === "Product added successfully") {
      toast.success("Product added successfully");
      setForm({ name: "", oldprice: "", newprice: "", image: "" });
    } else {
      toast.error("Failed to add product");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  } finally {
    setSubmitting(false);
    setloader(false)
  }
};


  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_upload");
    formData.append("folder", "nextjs_products");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dyr4xwyhf/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setForm((prev) => ({ ...prev, image: data.secure_url }));
      seterror({image:''})
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
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
      {/* Navbar */}
      <div className="bg-white fixed top-0 left-0 w-full flex items-center justify-center shadow z-40">
        <Image src="/logo.jpg" width={90} height={40} alt="Logo" />
      </div>
      <button
        className="md:hidden fixed top-5 left-4 text-gray-700 text-2xl z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "X" : "☰"}
      </button>

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
        <div className="max-w-5xl mx-auto p-2 md:w-[50vw] w-full overflow-y-auto h-[90vh] md:ml-[30vw] no-scrollbar">
          <h2 className="text-2xl font-semibold mb-6 mt-10 text-center">Add New Product</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-4 md:p-6 rounded-xl shadow-md">
            {/* Product Name */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-md p-2">
              <FaTag className="text-gray-400 text-lg" />
              <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Product Name" className="flex-1 outline-none text-gray-700 p-2"/>
               
            </div>
             {error && error.name && (
        <p className="text-red-500 text-sm mt-1">{error.name}</p>
      )}

            {/* Old Price */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-md p-2">
              <FaDollarSign className="text-gray-400 text-lg" />
              <input type="number" name="oldprice" value={form.oldprice} onChange={handleChange} placeholder="Old Price" className="flex-1 outline-none text-gray-700 p-2"/>
                
            </div>
            {error && error.oldprice && (
        <p className="text-red-500 text-sm mt-1">{error.oldprice}</p>
      )}

            {/* New Price */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-md p-2">
              <FaDollarSign className="text-gray-400 text-lg" />
              <input type="number" name="newprice" value={form.newprice} onChange={handleChange} placeholder="New Price" className="flex-1 outline-none text-gray-700 p-2"/>
                
            </div>
            {error && error.newprice && (
        <p className="text-red-500 text-sm mt-1">{error.newprice}</p>
      )}

            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 border border-gray-300 rounded-md p-2">
                <FaImage className="text-gray-400 text-lg" />
                <input type="file" accept="image/*" onChange={handleFileUpload} className="flex-1 outline-none text-gray-700 p-2"/>
                  
              </div>
              {error && error.image && (
        <p className="text-red-500 text-sm mt-1">{error.image}</p>
      )}
              {uploading && <p className="text-gray-500">Uploading image...</p>}
              {form.image && !uploading && (
  <Image
    src={form.image}        // your uploaded image URL
    alt="Preview"
    width={128}             // corresponds to w-32 (32 * 4)
    height={128}            // corresponds to h-32
    className="mt-2 object-cover rounded-md mx-auto"
    unoptimized             // optional, if the image is from an external source like Cloudinary
  />
)}

            </div>

            {/* Submit */}
            <button
  type="submit"
  disabled={uploading || loader}
  className={`bg-black text-white font-semibold py-3 rounded-md 
    hover:bg-yellow-500 transition-all duration-200 shadow-md
    ${(uploading || loader) ? "opacity-50 cursor-not-allowed" : ""}
  `}
>
  {uploading ? "Uploading..." : loader ? <Loader /> : "Add Product"}
</button>

          </form>
        </div>
      </section>
    </>
  );
};

export default AddProductPage;
