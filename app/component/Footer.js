"use client"
import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaFacebookF, } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import Image from 'next/image';
import {
  FiHome,
  FiShoppingBag,
  FiTruck,
  FiShoppingCart
} from "react-icons/fi";
import { usePathname, } from "next/navigation";
import { useEffect,useState } from 'react';
import { getDeviceId } from '../utilities/deviceId';




const Fotter = () => {
   const pathname = usePathname();
   const [cart, setcart] = useState([])
  const linkClass = (path) =>
  `relative z-10 flex items-center justify-center
   px-4 py-4 rounded-full transition-all duration-200
   ${pathname === path
     ? "bg-sky-100 text-black"
     : "text-gray-600 hover:text-black"
   }`;
   useEffect(() => {
     const deviceId = getDeviceId();
   
     fetch(`/api/cart?deviceId=${deviceId}`)
       .then(res => res.json())
       .then(data => setcart(data));
   }, []);


  return (
<>
<footer className="bg-white text-gray-700 border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-5 sm:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
    
    {/* ================= BRAND ================= */}
    <div>
      <h3 className="text-gray-600 text-2xl font-bold mb-4">
        <Image width={100} height={100} src={'/logo.jfif'} alt=''></Image>
      </h3>
      <p className="text-gray-600 text-sm">
       {` Premium dried fruits and healthy snacks crafted for everyday wellness.  
        Naturally dried and carefully selected for quality and flavor.`}
      </p>
    </div>

    {/* ================= COMPANY LINKS ================= */}
    <div>
      <h4 className="text-gray-800  font-semibold mb-4">Company</h4>
      <ul className="space-y-2 text-sm">
        <li><Link href="/about" className=" transition">About Us</Link></li>
        <li><Link href="/contact" className=" transition">Contact</Link></li>
        <li><Link href="/trackorder" className=" transition">Track Order</Link></li>
     
      </ul>
    </div>

    {/* ================= HELP LINKS ================= */}
    <div>
      <h4 className="text-gray-800 font-semibold mb-4">Help</h4>
      <ul className="space-y-2 text-sm">
        <li><Link href="/faq" className=" transition">FAQs</Link></li>
        <li><Link href="/shipping" className=" transition">Shipping</Link></li>
        <li><Link href="/return" className=" transition">Returns</Link></li>
        <li><Link href="/privacy" className=" transition">Privacy Policy</Link></li>
        <li><Link href="/term" className=" transition">Terms & Conditions</Link></li>
      </ul>
    </div>

    {/* ================= GET IN TOUCH ================= */}
    <div>
      <h4 className="text-gray-800 font-semibold mb-4">Get in Touch</h4>
      <ul className="space-y-2 text-sm">
        <li className='flex items-center  gap-1'><HiOutlineMail/> <a href="mailto:info@dryfruitsco.com" className=" transition">info@dryfruitsco.com</a></li>
        <li className='flex items-center  gap-1'><FiPhone/> <a href="tel:+1234567890" className=" transition">+1 234 567 890</a></li>
        <li className='flex items-center  gap-1'><GoLocation/> 123 Dry Fruits Street, City, Country</li>
      </ul>
    </div>

  </div>

  {/* ================= SOCIAL MEDIA ================= */}
  <div className="max-w-7xl mx-auto px-5 sm:px-10 py-6 flex flex-col md:flex-row justify-between items-center border-t border-gray-200">
    <p className="text-sm text-gray-500 mb-4 md:mb-0">
    {`  © ${new Date().getFullYear()} DryFruitsCo. All rights reserved. Developed by Haroon.`}
    </p>
    <div className="flex gap-4">
      <Link href="https://instagram.com" className="text-gray-500  transition text-xl">  <FaInstagram /></Link>
      <Link href="https://facebook.com" className="text-gray-500  transition text-xl"><FaFacebookF/></Link>
    
    </div>
  </div>
</footer>
<div className='md:hidden w-screen bg-white shadow-2xl flex items-center justify-center z-50  sticky bottom-0 text-gray-600'>
  <ul className='flex items-center justify-center gap-12  py-6 text-2xl'>

      <li><Link className={linkClass('/')} href={'/'}><FiHome/></Link></li>


      <li><Link className={linkClass('/products')} href={'/products'}><FiShoppingBag/></Link></li>


      <li><Link className={linkClass('/trackorder')} href={'/trackorder'}><FiTruck/></Link></li>

  <li>
  <Link href="/cart" className={linkClass("/cart")}>
    <div className="relative">
      <FiShoppingCart />

    {cart.length>0 &&(
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
        {cart.length}
      </span>
    )}
    </div>
  </Link>
</li>


  </ul>
</div>
</>


  )
}

export default Fotter