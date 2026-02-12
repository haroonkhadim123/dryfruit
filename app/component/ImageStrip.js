import React from "react";
import Image from "next/image";

const ImageStrip = () => {
  const images = [
    {
      src: "/fresh.avif",
      title: "Fresh & Natural",
      description:
        "Our dry fruits are sourced directly from trusted farms to ensure natural freshness and authentic taste.",
    },
    {
      src: "/quality.webp",
      title: "Premium Quality",
      description:
        "Every product goes through strict quality checks so you receive only the finest grade dry fruits.",
    },
    {
      src: "/packaging.jpg",
      title: "Hygienic Packing",
      description:
        "Packed in clean, sealed, and food-safe packaging to maintain freshness and hygiene till delivery.",
    },
  ];

  return (
    <section className="py-14 grid grid-cols-1 md:grid-cols-3 gap-8">
      {images.map((img, index) => (
        <div key={index} className="text-center px-4">
          <div className="relative w-full h-64 mb-4">
            <Image
              src={img.src}
              alt={img.title}
              fill
              className="rounded-xl object-cover"
              loading="lazy"
            />
          </div>

          <h4 className="font-semibold text-lg mb-2">
            {img.title}
          </h4>

          <p className="text-gray-600 text-sm leading-relaxed">
            {img.description}
          </p>
        </div>
      ))}
    </section>
  );
};

export default ImageStrip;
