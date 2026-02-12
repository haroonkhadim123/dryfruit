"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { useEffect } from "react";
import Loader from "../component/Loader";
import { getDeviceId } from "../utilities/deviceId";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";



export default function CartPage() {
  const { data: session}= useSession();

 
  // Example cart state (you can replace with actual cart logic)
  const [cart, setcart] = useState([])
const [itemLoading, setItemLoading] = useState({});
const [loader, setloader] = useState(false)


useEffect(() => {
  const deviceId = getDeviceId();

  fetch(`/api/cart?deviceId=${deviceId}`)
    .then(res => res.json())
    .then(data => setcart(data));
}, []);

      const handleDelete = async (id) => {
  if (!id) {
    toast.error("Product ID missing. Cannot delete.");
    return;
  }

  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const res = await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Deleted successfully");
      setcart((prev) => prev.filter((p) => p._id !== id));
    } else {
      toast.error(data.message || "Delete failed");
    }
  } catch (error) {
    console.error(error);
    toast.error(error);
  }
};
const updateQty = async (id, action) => {
  try {
  setItemLoading((prev) => ({ ...prev, [id]: true }));
      await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await fetch(`/api/cart/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });

    const data = await res.json();

    if (res.ok) {
      // update UI without refetch
      setcart((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, qty: data.data.qty } : item
        )
      );
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error(error);
    toast.error(error);
  }
  finally{
  setItemLoading((prev) => ({ ...prev, [id]: false }));

  }
};



  

  

  // Calculate total
 

  return (
    <div className="bg-white min-h-screen px-5 sm:px-10 py-16">
     <h2 className="flex items-center gap-4 text-2xl sm:text-3xl font-bold text-gray-600 mb-20">
  <span className="flex-1 h-[1px] bg-gray-400"></span>
  Your cart
  <span className="flex-1 h-[1px] bg-gray-400"></span>
</h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 text-xl">
          Your cart is empty. <Link href="/products" className="text-black font-semibold">Shop Now</Link>
          {!session && (
            <div>Have an account?<Link className="text-black font-semibold" href={'/login'}> Login</Link></div>
          )}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Cart Items */}
          <div className="grid grid-cols-1 gap-6">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 rounded-xl p-4 shadow"
              >
              <div className="w-32 h-32 relative flex-shrink-0">
  {item?.image && (
    <Image
      src={item.image}
      alt={item.name}
      fill
      unoptimized
      className="object-cover rounded-lg"
    />
  )}
</div>

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item?.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Price: {item?.price} PKR / {item?.grams}g
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                    <button
                     
    onClick={() => updateQty(item._id, "dec")}
      disabled={itemLoading[item._id]}
                    
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>
  {itemLoading[item._id] ? <Loader size={16}/> : item?.qty}
</span>

                    <button
                     
    onClick={() => updateQty(item._id, "inc")}
      disabled={itemLoading[item._id]}
                  
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button
                  onClick={() => item._id && handleDelete(item._id)}
                  
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                  <p className="text-gray-800 font-semibold">
                  Rs.{((item?.grams * item?.price / 250) * item?.qty).toFixed(2)} PKR

                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Total & Checkout */}
          <div className="mt-10 flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
          Total: ₹{cart.reduce((sum, item) => sum + (item.price / 250) * item.grams * item.qty, 0).toFixed(2)} PKR

            </h2>
        <Link
  href="/booking"
  onClick={() => setloader(true)}
  className={`relative mt-4 md:mt-0  px-6 py-3
    flex items-center justify-center rounded-2xl font-semibold transition
    ${loader 
      ? 'bg-gray-400 pointer-events-none' 
      : 'bg-black text-white hover:bg-yellow-500'
    }`}
>
  {/* Text (space reserve karta rahega) */}
  <span className={loader ? 'invisible' : 'visible'}>
    Proceed to Checkout
  </span>

  {/* Loader (overlay) */}
  {loader && (
    <span className="absolute inset-0 flex items-center justify-center">
      <Loader />
    </span>
  )}
</Link>

          </div>
        </div>
      )}
    </div>
  );
}
