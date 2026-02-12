"use client";
import Image from "next/image";
import Link from "next/link";
import { FaLeaf, FaAward, FaShippingFast, FaHeart, FaArrowRight } from "react-icons/fa";
import Banner from "./component/Banner";
import ImageStrip from "./component/ImageStrip";
import VideoSection from "./component/VideoSection";
import Head from "next/head";
import Script from "next/script";
import StatsCounter from "./component/Counter";
import { useEffect,useState } from "react";

export default function Home() {
  const [products, setproducts] = useState([])

  useEffect(() => {
    const fetchproduct=async()=>{
      const res=await fetch('/api/getproduct?limit=8',{cache:'no-store'});
      const data=await res.json();
      if(res.ok && data.products){
        setproducts(data.products);
      }
      

    }
    fetchproduct();
  
  }, [])


  const features = [
    { icon: <FaLeaf />, title: "100% Natural", description: "Our dried fruits are sourced from natural farms with no chemicals." },
    { icon: <FaAward />, title: "Premium Quality", description: "Carefully selected, fresh and healthy dried fruits for you." },
    { icon: <FaShippingFast />, title: "Fast Delivery", description: "Quick and safe delivery right to your doorstep." },
    { icon: <FaHeart />, title: "Healthy & Tasty", description: "Perfectly dried to preserve taste, nutrients, and freshness." },
  ];

  const scrollingFeatures = [...features, ...features];



  return (
    <>
      {/* SEO */}
      <Head>
        <title>Premium Dry Fruits Online | Healthy Snacks</title>
        <meta name="description" content="Shop premium quality dry fruits online. 100% natural, healthy, and tasty almonds, cashews, dates, and mixed dry fruits delivered to your doorstep." />
        <meta name="keywords" content="dry fruits, almonds, cashews, dates, healthy snacks, premium dry fruits, natural dry fruits" />
        <meta name="robots" content="index, follow" />
      </Head>

      {/* JSON-LD Structured Data */}
      <Script id="product-jsonld" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": products.map((product, index) => ({
            "@type": "Product",
            position: index + 1,
            name: product.name,
            image: [`https://yourwebsite.com${product.image}`],
            sku: `SKU-${index + 1}`,
            offers: { "@type": "Offer", priceCurrency: "PKR", price: product.price, availability: "https://schema.org/InStock" },
          })),
        })}
      </Script>

      {/* Banner */}
      <Banner />

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <h2 className="flex items-center gap-4 text-2xl sm:text-3xl font-bold text-black mb-16">
            <span className="flex-1 h-[1px] bg-gray-400"></span>
            Why Choose Us
            <span className="flex-1 h-[1px] bg-gray-400"></span>
          </h2>
          <div className="relative w-full overflow-hidden  ">
            <div className="flex w-max animate-marquee gap-6 ">
              {scrollingFeatures.map((feature, index) => (
                <div key={index} className="flex-shrink-0  flex flex-col items-center p-6 bg-white border border-gray-200 rounded-lg w-64 opacity-0 translate-y-6 animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-gray-600 mb-3 text-3xl">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">{feature.title}</h3>
                  <span className="text-gray-500 text-sm text-center">{feature.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white text-black py-20">
        <div className="md:max-w-7xl w-full  mx-auto md:px-5 ">
          <h2 className="flex items-center gap-4 text-2xl sm:text-3xl font-bold text-black mb-16">
            <span className="flex-1 h-[1px] bg-gray-400"></span>
            Featured Products
            <span className="flex-1 h-[1px] bg-gray-400"></span>
          </h2>
          <div className="grid grid-cols-2   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 space-y-4 gap-2 md:gap-8">
             {products.map((product) => (
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
  loading="eager" // good for above-the-fold images
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
          <div className="text-center mt-12">
            <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-2xl shadow-lg hover:bg-gray-900 transition">
              View More <FaArrowRight className="animate-bounce" />
            </Link>
          </div>
        </div>
      </section>

      {/* Image Strip */}
      <ImageStrip />
      <StatsCounter/>
      

      {/* Video + Text Section */}
      <VideoSection />

      {/* Badges / Features */}
      <section className="bg-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 flex flex-wrap justify-center gap-10">
          {[
            { title: "100% Natural", icon: "🍃" },
            { title: "Hygienically Packed", icon: "🏷️" },
            { title: "Quality Checked", icon: "✅" },
            { title: "No Added Sugar", icon: "🍯" },
          ].map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center bg-white p-6 rounded-lg shadow-sm md:w-40 w-52  opacity-0 translate-y-6 animate-fadeIn" style={{ animationDelay: `${idx * 0.2}s` }}>
              <div className="text-amber-500 text-3xl mb-2">{badge.icon}</div>
              <h3 className="text-gray-700 font-medium text-center">{badge.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-black animate-fadeIn">Start Healthy Snacking Today</h2>
        <p className="text-lg mb-6 text-gray-600 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
         {` Explore our range of premium dried fruits and snacks crafted for your wellness.`}
        </p>
        <Link href="/products" className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-100 transition animate-fadeIn" style={{ animationDelay: "0.4s" }}>
          Shop Now
        </Link>
      </section>

      {/* Global animation styles */}
      <style jsx>{`
        @keyframes fadeIn { 0% { opacity: 0; transform: translateY(1.5rem); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 1s forwards; }
        @keyframes marquee { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .animate-marquee { display: flex; gap: 1.5rem; animation: marquee 40s linear infinite; }
      `}</style>
    </>
  );
}
