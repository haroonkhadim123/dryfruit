"use client";

import { useEffect, useRef, useState } from "react";
import { FaShoppingBag, FaCheckCircle, FaSmile } from "react-icons/fa";

const statsData = [
  {
    icon: <FaShoppingBag />,
    label: "Total Orders",
    value: 2500,
  },
  {
    icon: <FaCheckCircle />,
    label: "Successful Orders",
    value: 2350,
  },
  {
    icon: <FaSmile />,
    label: "Happy Customers",
    value: 1800,
  },
];

export default function StatsCounter() {
  const sectionRef = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#f9f7f2] py-16 px-4"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Trusted by Thousands of Customers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {statsData.map((item, index) => (
            <StatBox
              key={index}
              icon={item.icon}
              label={item.label}
              value={item.value}
              start={start}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatBox({ icon, label, value, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const increment = Math.ceil(value / 60);

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [start, value]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition">
      <div className="text-4xl text-green-600 mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-4xl font-bold text-gray-800">
        {count}+
      </h3>
      <p className="text-gray-600 mt-2">{label}</p>
    </div>
  );
}
