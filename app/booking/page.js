"use client";

import Image from "next/image";
import { FaTruck } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getDeviceId } from "../utilities/deviceId";
import toast from "react-hot-toast";
import Loader from "../component/Loader";


export default function BookingPage() {
  const deviceId = getDeviceId();
  const router = useRouter();
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setloader] = useState(false)
  const [form, setform] = useState({ firstname: '', lastname: '', email: '', phone: '', address: '', city: '' })
  const [error, seterror] = useState({ firstname: '', lastname: '', email: '', phone: '', address: '', city: '' })




  useEffect(() => {
    const deviceId = getDeviceId();

    fetch(`/api/cart?deviceId=${deviceId}`)
      .then(res => res.json())
      .then(data => setCart(data));
  }, []);
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + (item.price / 250) * item.grams * item.qty,
    0
  );


  const shippingprice = 300;
  const total = subtotal >= 5000 ? subtotal : subtotal + shippingprice;

  const handlechange = (e) => {
    const { name, value } = e.target;

    setform(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    seterror({ firstname: '', lastname: '', email: '', phone: '', address: '', city: '' })
    const isAllEmpty =
      !form.firstname.trim() &&
      !form.lastname.trim() &&
      !form.email.trim() &&
      !form.phone.trim() &&
      !form.address.trim() &&
      !form.city.trim();


    if (isAllEmpty) {
      seterror({
        firstname: "Name is required.",
        lastname: "Lastname is required.",
        email: "Email is required.",
        phone: "Phone number is required.",
        address: "Address is required.",
        city: "City is required.",

      });
      return;
    }
   // FIRST NAME
if (!form.firstname.trim()) {
  seterror(prev => ({ ...prev, firstname: "Name is required" }));
  return;
}
if (!/^[A-Za-z\s]+$/.test(form.firstname)) {
  seterror(prev => ({ ...prev, firstname: "Please enter a valid name (letters only)" }));
  return;
}
if (form.firstname.trim().length < 3) {
  seterror(prev => ({ ...prev, firstname: "Please enter at least 3 characters" }));
  return;
}

// LAST NAME
if (!form.lastname.trim()) {
  seterror(prev => ({ ...prev, lastname: "Lastname is required" }));
  return;
}
if (!/^[A-Za-z\s]+$/.test(form.lastname)) {
  seterror(prev => ({ ...prev, lastname: "Please enter a valid lastname (letters only)" }));
  return;
}
if (form.lastname.trim().length < 3) {
  seterror(prev => ({ ...prev, lastname: "Please enter at least 3 characters" }));
  return;
}

// EMAIL
if (!form.email.trim()) {
  seterror(prev => ({ ...prev, email: "Email is required" }));
  return;
}
if (! /^[^\s@]+@[^\s@]+\.com$/.test(form.email.trim())) {
  seterror(prev => ({ ...prev, email: "Please enter a valid email address" }));
  return;
}

// PHONE
if (!form.phone.trim()) {
  seterror(prev => ({ ...prev, phone: "Phone number is required" }));
  return;
}
if (!/^03\d{9}$/.test(form.phone.trim())) {
  seterror(prev => ({ ...prev, phone: "Phone number must start with 03 and be 11 digits long" }));
  return;
}

// ADDRESS
if (!form.address.trim()) {
  seterror(prev => ({ ...prev, address: "Address is required" }));
  return;
}
if (form.address.trim().length < 5) {
  seterror(prev => ({ ...prev, address: "Address must be at least 5 characters long" }));
  return;
}

// CITY
const trimmedCity = form.city.trim();
if (!trimmedCity) {
  seterror(prev => ({ ...prev, city: "City is required" }));
  return;
}
if (trimmedCity.length > 100) {
  seterror(prev => ({ ...prev, city: "City name is too long" }));
  return;
}
if (!/^[A-Za-z\s]+$/.test(trimmedCity)) {
  seterror(prev => ({ ...prev, city: "Please enter a valid city name" }));
  return;
}






    if (cart.length === 0) return toast.error("Your cart is empty")
    e.preventDefault(); // prevent default form submit

    const products = cart.map((item) => ({
      name: item.name,
      qty: item.qty,
      grams: item.grams,

    }));

    const body = {

      deviceId,
      firstname: form.firstname.trim(),
      lastname: form.lastname.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),        // correct spelling
      address: form.address.trim(),    // correct spelling
      city: form.city.trim(),    // correct spelling
      products,
      total: total.toFixed(2)
    };
    setloader(true);

    try {
      const res = await fetch('/api/order', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data)
      if (data.success) {
        router.push('/success')
        setform({ firstname: '', lastname: '', email: '', phone: '', address: '', city: '' })

        return
      }
      else {
        toast.error('Failed to place order')


      }



    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while placing the order.");

    }
    finally {
      setloader(false);
    }
  }




  return (
    <>


      <div className="md:max-w-7xl w-full mx-auto  md:px-4  py-10">
        <h1 className="text-3xl font-semibold mb-4 px-4">Checkout</h1>

        {/* SINGLE FORM */}
        <form onSubmit={handlesubmit} className="grid lg:grid-cols-3 gap-8">
          {/* ================= LEFT SIDE ================= */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            {/* Customer Info */}
            <h2 className="text-xl font-semibold mb-4">
              Customer Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <input onChange={handlechange}
                  value={form.firstname}

                  name="firstname"
                  placeholder="First Name"
                  autoComplete="off"
                  className="p-2 border w-full border-gray-300 rounded-md"
                />

                {error && error.firstname && (
                  <p className="text-red-500 text-sm mt-1">{error.firstname}</p>
                )}
              </div>

              <div>

                <input onChange={handlechange}
                  value={form.lastname}

                  name="lastname"
                  placeholder="Last Name"
                  autoComplete="off"
                  className="p-2 border w-full  border-gray-300 rounded-md"
                />
                {error && error.lastname && (
                  <p className="text-red-500 text-sm mt-1">{error.lastname}</p>
                )}

              </div>

              <div>
                <input onChange={handlechange}

                  type="email"
                  name="email"
                  value={form.email}
                  placeholder="Email Address"
                  autoComplete="off" className="p-2 border w-full  border-gray-300 rounded-md"
                />
                 {error && error.email && (
                  <p className="text-red-500 text-sm mt-1">{error.email}</p>
                )}

              </div>

           <div>
               <input onChange={handlechange}

                type="tel"
                name="phone"
                value={form.phone}
                placeholder="03XXXXXXXXX"
                autoComplete="off" className="p-2 border w-full border-gray-300  rounded-md"
              />
               {error && error.phone && (
                  <p className="text-red-500 text-sm mt-1">{error.phone}</p>
                )}
           </div>
<div>
  
              <input onChange={handlechange}

                name="address"
                placeholder="Complete Address"
                value={form.address}
                autoComplete="off"
                className="p-2 border w-full border-gray-300  rounded-md"
              />
              {error && error.address && (
                  <p className="text-red-500 text-sm mt-1">{error.address}</p>
                )}
</div>
             <div>
               <input
                name="city"
                value={form.city}
                onChange={handlechange}

                placeholder="City"
                autoComplete="off" className="p-2 border w-full border-gray-300 rounded-md"
              />
                {error && error.city && (
                  <p className="text-red-500 text-sm mt-1">{error.city}</p>
                )}
             </div>

            </div>

            {/* Country / Region */}
            <h2 className="text-xl font-semibold mb-4">Country / Region</h2>

            <div className="border  border-gray-300 rounded-lg p-4 ">
              <label className="flex items-center gap-3 ">
                <input onChange={handlechange}
                  type="radio"
                  name="country"
                  value="Pakistan"
                  checked
                  readOnly
                />
                <span className="font-medium">Pakistan</span>
              </label>
            </div>

            {/* Payment */}
            <h2 className="text-xl font-semibold mt-6 mb-4">
              Payment Method
            </h2>

            <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer  border-gray-300">
              <input onChange={handlechange}
                type="radio"
                name="payment"
                value="Cash on Delivery"
                defaultChecked
              />
              <FaTruck />
              <span>Cash on Delivery</span>
            </label>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="bg-white rounded-xl shadow p-6 h-fit">
            {/* Header with toggle */}
            <div
              className="flex justify-between items-center mb-4 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>
              <div>
                <span>Rs.{total}.00 PKR</span>
              </div>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-sm">{`Your cart is empty`}</p>
            ) : (
              <>
                {/* Always show first product */}
                <div key={cart[0]._id} className="flex items-center justify-between mb-4">
                  <div className="w-32 flex gap-3    flex-shrink-0  rounded-lg">
                    <div className="relative     flex-shrink-0  rounded-lg">
                      {cart[0]?.image && (
                        <Image
                          src={cart[0].image}
                          alt={cart[0].name}
                          height={30}
                          width={30}
                          unoptimized
                          className="object-cover rounded-lg w-16 h-16"
                        />

                      )}
                      <span className="absolute w-6 h-6 flex items-center justify-center bottom-13 right-0 
  rounded-full z-50 
  bg-gray-400 text-white
  dark:bg-red-500 dark:text-black  "> {cart[0]?.qty}</span>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium">{cart[0]?.name}</h3>
                      <p className="text-sm text-gray-500 whitespace-nowrap">
                        {cart[0]?.grams}g
                      </p>
                    </div>
                  </div>



                  <p className="font-semibold">
                    Rs.{((cart[0]?.grams * cart[0]?.price) / 250 * cart[0]?.qty).toFixed(2)} PKR
                  </p>
                </div>

                {/* Toggle remaining products */}
                {isOpen &&
                  cart.slice(1).map((item) => (
                    <div key={item._id} className="flex items-center justify-between mb-4">
                      <div className="w-32 flex gap-3  flex-shrink-0   rounded-lg">
                        <div className="relative     flex-shrink-0  rounded-lg">
                          {item?.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              height={30}
                              width={30}
                              unoptimized
                              className="object-cover rounded-lg w-16 h-16"
                            />

                          )}
                          <span className="absolute w-6 h-6 flex items-center justify-center bottom-13 right-0 
  rounded-full z-50 
  bg-gray-400 text-white
  dark:bg-red-500 dark:text-black
">
                            {item?.qty ?? 0}
                          </span>

                        </div>

                        <div className="flex-1 ">
                          <h3 className="font-medium">{item?.name}</h3>
                          <p className="text-sm text-gray-500 whitespace-nowrap">
                            {item?.grams}g
                          </p>
                        </div>
                      </div>



                      <p className="font-semibold">
                        Rs.{((item?.grams * item?.price) / 250 * item?.qty).toFixed(2)} PKR
                      </p>
                    </div>
                  ))}
              </>
            )}

            <hr className="my-4" />

            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Subtotal:</span>
              <span>Rs.{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Shipping</span>
              <span>
                {subtotal >= 5000 ? "Free" : `Rs.${shippingprice.toFixed(2)} PKR`}
              </span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>Rs.{total.toFixed(2)} PKR</span>
            </div>


            <button
              type="submit"
              disabled={loader}
              className={`w-full h-[52px] flex mt-2 items-center justify-center rounded-2xl font-semibold transition
    ${loader
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-yellow-500'
                }`}
            >
              {loader ? <Loader /> : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
      <div>
        <ul className=" gap-4 md:gap-10  border-t-2 border-gray-100 text-sm py-6 bg-white w-full flex flex-wrap items-center justify-center  shadow-2xl z-40">

          <li className="flex items-center justify-center border-b-2 border-b-blue-700 text-blue-700 whitespace-nowrap"><Link href="/shipping" className=" transition">Shipping</Link></li>
          <li className="flex items-center justify-center border-b-2 border-b-blue-700 text-blue-700 whitespace-nowrap"><Link href="/return" className=" transition">Returns</Link></li>
          <li className="flex items-center justify-center border-b-2 border-b-blue-700 text-blue-700 whitespace-nowrap"><Link href="/privacy" className=" transition">Privacy Policy</Link></li>
          <li className="flex items-center justify-center border-b-2 border-b-blue-700 text-blue-700 whitespace-nowrap"><Link href="/term" className=" transition">Terms & Conditions</Link></li>
        </ul>
      </div>

    </>
  );
}
