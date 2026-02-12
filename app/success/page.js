"use client";
import Link from "next/link";


export default function SuccessPage() {


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-3">
        Order Placed Successfully 🎉
      </h1>

   
 

      <span className="text-gray-700 mb-2">
        Thank you for your order! Your order has been placed and is being processed.
      </span>

      <span className="text-gray-500 mb-6">
        📦 You can now track your order status from your dashboard.
      </span>

      <div className="flex gap-4">
        <Link
          href="/trackorder"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Track Order
        </Link>

        <Link
          href="/products"
          className="border border-black px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
