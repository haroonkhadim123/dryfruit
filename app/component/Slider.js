"use client"; // must be first line

export default function Marquee({ text }) {
  return (
    <div className="overflow-hidden whitespace-nowrap mb-6">
      <div className="flex w-max animate-marquee gap-8">
        <span className="font-semibold text-gray-600">{text}</span>
        <span className="font-semibold text-gray-600">{text}</span> {/* duplicate for seamless scroll */}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: flex;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
