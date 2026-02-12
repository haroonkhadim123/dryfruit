"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      
      {/* ================= HERO SECTION ================= */}
      <section className="bg-yellow-50 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          About Us
        </h1>
        <p className="mt-4 max-w-xl mx-auto text-gray-600 text-lg">
         {` Premium dried fruits and healthy snacks crafted with care. Naturally dried, carefully selected, and perfect for everyday snacking or gifting.`}
        </p>
      </section>

      {/* ================= COMPANY STORY ================= */}
    <section className="max-w-7xl mx-auto px-5 sm:px-10 py-16 flex flex-col md:flex-row items-center gap-6 md:gap-10">
  <div className="md:w-1/2 w-full">
    <Image
      src="/about.jpg"
      alt="About DryFruitsCo"
      width={500}
      height={400}
      className="w-full h-auto rounded-xl object-cover"
    />
  </div>
  <div className="md:w-1/2 w-full mt-6 md:mt-0">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
      Our Story
    </h2>
    <p className="text-gray-600 mb-4">
     {` DryFruitsCo started with a passion for healthy snacking and natural goodness...`}
    </p>
    <p className="text-gray-600">
     {` Every product is carefully selected...`}
    </p>
  </div>
</section>


      {/* ================= MISSION & VISION ================= */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">Our Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
              <p className="text-gray-600">
                {`To provide premium, healthy, and natural dried fruits while promoting sustainable and ethical sourcing practices.`}
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
              <p className="text-gray-600">
               {` To become the most trusted brand for dried fruits and healthy snacks, delivering quality and freshness to customers worldwide.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA / MORE INFO ================= */}
      <section className="py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Experience the Difference</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
     {`     Explore our wide range of dried fruits and healthy snacks crafted to perfection. Quality, taste, and health in every bite.`}
        </p>
        <a href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-2xl shadow-lg hover:bg-yellow-500 transition">
          Shop Products
        </a>
      </section>

    </div>
  );
}
