"use client";

import Image from "next/image";
import Link from "next/link";
import {useState,useEffect} from "react";


export default function ProductsPage() {
  const [Products, setProducts] = useState([]);



  useEffect(() => {
  const fetchProducts = async () => {
    const res = await fetch("/api/product");
    const data = await res.json();
    setProducts(data.products);
  };

  fetchProducts();
}, []);


  return (
    <div className="bg-white min-h-screen">
      {/* ================= HERO ================= */}
      <section className="bg-yellow-50 py-12 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-700">
          Our Products
        </h1>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          {`Explore our wide range of premium dried fruits, snacks, and gift packs. Fresh, healthy, and naturally dried for everyday snacking.`}
        </p>
      </section>
      
      

      {/* ================= PRODUCTS GRID ================= */}
      <section className="md:max-w-7xl w-full  mx-auto md:px-5 p-1   py-16">
      
<div className="flex gap-1 mb-4 text-sm items-center text-gray-600 px-2">
  <Link href="/" className="text-black">Home<span className="text-black"> &gt; </span></Link>
  
  <Link href="/products" className="hover:text-black">Products<span> &gt; </span></Link>

</div>
        
        <div className="grid grid-cols-2 space-y-2   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-8">
          {Products.map((product) => (
          <Link  key={product._id} href={'/products/' + product._id}>
           <div
             
              className="group border  border-gray-100 rounded-2xl p-1 overflow-hidden space-y-4 shadow-sm hover:shadow-lg transition"
            >
              {/* Product Image */}
              <div className="relative md:h-64 h-40 w-full overflow-hidden rounded-t-2xl">
           <Image
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // adjust as needed
  loading="lazy" // can stay lazy for below-the-fold images
  className="object-cover transform transition-transform duration-500 group-hover:scale-105"
    unoptimized
/>

                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Sale
                  </span>
              
              </div>

              {/* Product Info */}
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
                <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
       
                    <span className="line-through text-gray-400 text-sm">
                     Rs:{product.oldprice} PKR/250g
                    </span>
        
                  <span className="font-bold text-gray-800">Rs:{product.newprice} PKR/250g</span>
                </div>
             
              </div>
            </div></Link>
          ))}
        </div>
      </section>
    </div>
  );
}
