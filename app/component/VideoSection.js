"use client";



export default function VideoSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10">

        {/* Video Left */}
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg">
          <video
            src="video.mp4" // replace with your dry fruit video link
            controls
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Text Right */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Discover the Best Quality Dry Fruits
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
         {`   Our dry fruits are carefully selected for freshness, taste, and nutritional value.  
            Perfect for snacks, gifts, and healthy eating.  
            Enjoy premium quality almonds, cashews, dates, and more, all in one place.`}
          </p>
        
        </div>

      </div>
    </section>
  );
}
