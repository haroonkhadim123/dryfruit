"use client";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import { useState } from "react";

import { FaPhoneAlt,  FaMapMarkerAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import Loader from "../component/Loader";

export default function ContactPage() {
    const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loader, setloader] = useState(false)
  const [error, seterror] = useState({name:'',email:'',phone:'',message:''})
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 const handleSubmit = async (e) => {
  e.preventDefault();

  seterror({ name: '', email: '', phone: '', message: '' });
  const isAllEmpty =
  !form.name.trim() &&
  !form.email.trim() &&
  !form.phone.trim() &&
  !form.message.trim();

if (isAllEmpty) {
  seterror({
    name: "Name is required.",
    email: "Email is required.",
    phone: "Phone number is required.",
    message: "Message is required."
  });
  return;
}
 if (!form.name.trim()) {
  seterror(prev => ({ ...prev, name: "Name is required" }));
  return;
}

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(form.name)) {
    seterror(prev => ({
      ...prev,
      name: "Please enter a valid name (letters only)"
    }));
    return;
  }

  if (form.name.trim().length < 3) {
    seterror(prev => ({
      ...prev,
      name: "Name must be at least 3 characters long."
    }));
    return;
  }
   if (!form.email.trim()) {
  seterror(prev => ({ ...prev, email: "Email is required" }));
  return;
}

  const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

  if (!emailRegex.test(form.email.trim())) {
    seterror(prev => ({
      ...prev,
      email: "Email must end with .com (example: name@gmail.com)"
    }));
    return;
  }
   if (!form.phone.trim()) {
  seterror(prev => ({ ...prev, phone: "Phone number is required" }));
  return;
}
  const phoneRegex = /^03\d{9}$/;

  if(!phoneRegex.test(form.phone.trim())){
    seterror(prev=>({
      ...prev,phone:'Phone number must start with 03 and be 11 digits long.'
    }))
    return;
  }
   if (!form.message.trim()) {
  seterror(prev => ({ ...prev, message: "Message is required" }));
  return;
}
  if (form.message.trim().length < 10) {
  seterror(prev => ({
    ...prev,
    message: "Message must be at least 10 characters long."
  }));
  return;
}


  setloader(true);

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      toast.success(data.message);
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      toast.error('Failed to send');
    }

  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  } finally {
    setloader(false);
  }
};

  return (
    <div className="bg-white min-h-screen">

      {/* ================= HERO / HEADING ================= */}
      <section className="bg-yellow-50 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Contact Us</h1>
        <p className="mt-4 max-w-xl mx-auto text-gray-600 text-lg">
         {` We’d love to hear from you! Reach out with any questions, feedback, or orders.`}
        </p>
      </section>

      {/* ================= CONTACT FORM & INFO ================= */}
      <section className="max-w-7xl mx-auto px-5 sm:px-10 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* --------- Contact Form --------- */}
            <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[90vw]  md:w-[30vw]">
        
        {/* Name Input */}
        <div className="relative">
          <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            
         autoComplete="off"

            className="border border-gray-300 rounded-lg px-12 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
          />
           {error && error.name && (
        <p className="text-red-500 text-sm mt-1">{error.name}</p>
      )}
        </div>

        {/* Email Input */}
        <div className="relative">
          <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            
              autoComplete="off"

            className="border border-gray-300 rounded-lg px-12 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
          />
           {error && error.email && (
        <p className="text-red-500 text-sm mt-1">{error.email}</p>
      )}
        </div>

        {/* Phone Input */}
        <div className="relative">
          <FaPhone className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Your Phone"
            
            autoComplete="off"

            className="border border-gray-300 rounded-lg px-12 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
          />
           {error && error.phone && (
        <p className="text-red-500 text-sm mt-1">{error.phone}</p>)}
          
        </div>

        {/* Message Textarea */}
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={6}
          
        autoComplete="off"

          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
        ></textarea>
        {error && error.message && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>)}

        {/* Submit Button */}
     
<button
  type="submit"
  disabled={loader}
  className={`w-full h-[52px] flex items-center justify-center rounded-2xl font-semibold transition
    ${loader 
      ? 'bg-gray-400 cursor-not-allowed' 
      : 'bg-black text-white hover:bg-yellow-500'
    }`}
>
  {loader ? <Loader /> : 'Send Message'}
</button>
      </form>
    </div>


        {/* --------- Contact Info --------- */}
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-gray-700 text-xl" />
            <span className="text-gray-700">0343 5121737</span>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-gray-700 text-xl" />
            <span className="text-gray-700">info@dryfruitsco.com</span>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-gray-700 text-xl" />
            <span className="text-gray-700">
              123 Dry Fruits Street, Kotli, Kashmir
            </span>
          </div>

          {/* --------- Google Map --------- */}
      <div className="mt-6 w-full h-64 rounded-xl overflow-hidden shadow">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d338977.5748483801!2d73.676181!3d33.771935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e0b6fa4f3c0a3d%3A0x1b8f8f187c517de1!2sKashmir%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
    width="100%"
    height="100%"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="border-0 w-full h-full"
  ></iframe>
</div>

        </div>

      </section>
    </div>
  );
}
