"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
  src: "/banner1.jpg",
  title: "Premium Quality Dry Fruits",
  subtitle: "Fresh, healthy, and hand-picked for your daily nutrition.",
  cta: "Shop Now",
  link: "/products",
},
{
  src: "/banner2.avif",
  title: "Nutritious & Delicious",
  subtitle: "Tasty dry fruits and nuts crafted for a healthy lifestyle.",
  cta: "Explore Products",
  link: "/products",
},
{
  src: "/banner3.avif",
  title: "Trusted & Reliable Service",
  subtitle: "Fast delivery, secure payments, and 100% satisfaction guaranteed.",
  cta: "Buy Now",
  link: "/products",
},

];

export default function Banner() {
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      className="h-[50vh] md:h-[80vh]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="relative">
          {/* Lazy-loaded Next.js Image */}
          <Image
            src={slide.src}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0} // first slide loads immediately, others lazy
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Text & CTA */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl md:text-5xl font-semibold text-white mb-4 animate-fadeIn">
              {slide.title}
            </h1>
            <p className="text-sm md:text-lg text-gray-200 mb-6 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
              {slide.subtitle}
            </p>
            <Link
              href={slide.link}
              className="bg-amber-400 text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-amber-500 transition animate-fadeIn"
              style={{ animationDelay: "0.6s" }}
            >
              {slide.cta}
            </Link>
          </div>
        </SwiperSlide>
      ))}

      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(1.5rem); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 1s forwards; }
      `}</style>
    </Swiper>
  );
}
