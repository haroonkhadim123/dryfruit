"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const OFFER_DURATION = 3 * 24 * 60 * 60 * 1000; // 3 days

export default function TopOfferBar() {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    let endTime = localStorage.getItem("offerEndTime");

    if (!endTime) {
      endTime = Date.now() + OFFER_DURATION;
      localStorage.setItem("offerEndTime", endTime);
    }

    const interval = setInterval(() => {
      const now = Date.now();
      let remaining = endTime - now;

      if (remaining <= 0) {
        endTime = Date.now() + OFFER_DURATION;
        localStorage.setItem("offerEndTime", endTime);
        remaining = OFFER_DURATION;
      }

      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="bg-gradient-to-r from-green-700 to-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-xs md:text-sm">

        {/* Left Text */}
        <div className="flex items-center gap-2 font-medium tracking-wide">
          <span className="text-base">🎉</span>
          <span className="uppercase">
            Limited Time Offer on Premium Dry Fruits
          </span>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-2 font-mono">
          <TimeBox value={days} label="D" />
          <span className="opacity-70">:</span>
          <TimeBox value={hours} label="H" />
          <span className="opacity-70">:</span>
          <TimeBox value={minutes} label="M" />
          <span className="opacity-70">:</span>
          <TimeBox value={seconds} label="S" />
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href={'/products'} className="bg-white text-green-700 text-xs px-3 py-1 rounded-full font-semibold hover:bg-green-50 transition">
            Shop Now
          </Link>
        </div>

      </div>
    </div>
  );
}

function TimeBox({ value, label }) {
  return (
    <div className="bg-white/95 text-green-700 rounded-md px-2 py-1 min-w-[38px] text-center shadow-sm">
      <div className="text-sm font-bold leading-none">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-[9px] font-semibold opacity-70 leading-none">
        {label}
      </div>
    </div>
  );
}
