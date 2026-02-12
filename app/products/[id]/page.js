
"use client"
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";
import Marquee from '../../component/Slider';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import toast from "react-hot-toast";
import Loader from "@/app/component/Loader";
import { getDeviceId } from "@/app/utilities/deviceId";



const Page = () => {

  const deviceId = getDeviceId();
  const { id } = useParams();
  const router = useRouter();
  const [product, setproduct] = useState(null);


  const [qty, setQty] = useState(1);
  const [grams, setGrams] = useState(250); // default 250g
  const [form, setform] = useState({ name: '', comment: '' })
  const [comment, setcomment] = useState([])
  const [open, setopen] = useState(false)
  const [qtyLoading, setQtyLoading] = useState(false);
  const [loader, setloader] = useState(false)
  const [loading, setloading] = useState(false)
  const [comentloading, setcomentloading] = useState(false);
  const [error, seterror] = useState({ name: '', comment: '' });



  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror({ name: '', comment: '' });


    const isAllEmpty =
      !form.name.trim() &&
      !form.comment.trim()

    if (isAllEmpty) {
      seterror({
        name: "Name is required.",
        comment: "Comment is required.",

      });
      return;
    }
    if (!form.name.trim()) {
      seterror(prev => ({ ...prev, name: "Name is required" }));
      return;
    }
    const regex = /^[A-Za-z\s]+$/;

    if (!regex.test(form.name)) {
      seterror(prev => ({
        ...prev,
        name: "Please enter a valid name (letters only)"
      }));
      return;
    }


    if (form?.name?.length < 3) {
      seterror(prev => ({
        ...prev,
        name: "Please enter atleat 3 character"
      }));
      return;
    }
    if (!form.comment.trim()) {
      seterror(prev => ({ ...prev, comment: "Comment is required" }));
      return;
    }
    if (form.comment.trim().length < 5) {
      seterror(prev => ({
        ...prev,
        comment: "Comment must be at least 5 characters long."
      }));
      return;
    }

    if (form.comment.trim().length > 200) {
      seterror(prev => ({
        ...prev,
        comment: "Comment cannot exceed 200 characters."
      }));
      return;
    }


    setcomentloading(true);
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setopen(false);
        setform({ name: "", comment: "" });
        setcomment((prev) => [
          ...prev,
          {
            _id: new Date().getTime(), // temporary id, replace with real from DB if returned
            name: form.name,
            comment: form.comment,
          },
        ]);

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    finally {
      setcomentloading(false)
    }
  };





  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("/api/comment", { cache: "no-store" });
      const data = await res.json();
      setcomment(data.reviewitem || []);



    };

    fetchCart();
  }, []);






  useEffect(() => {
    if (!id) return; // 🔥 STOP if id not ready

    const fetchproduct = async () => {
      const res = await fetch(`/api/product/${id}`, { cache: "no-store" });
      const data = await res.json();
      setproduct(data);
    };

    fetchproduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      console.log("PRODUCT IMAGE 👉", product.image);
    }
  }, [product]);

  const addtocart = async (e) => {
    e.preventDefault();
    setloader(true);


    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId,
          productId: product._id,
          name: product.name,
          image: product.image,
          price: product.newprice,
          qty,
          grams,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Add to cart successfully')




        router.push('/cart')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    finally {
      setloader(false)
    }
  };
  const buy = async (e) => {
    e.preventDefault();
    setloading(true);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deviceId,
          productId: product._id,
          name: product.name,
          image: product.image,
          price: product.newprice,
          qty,
          grams,
        }),
      });

      const data = await res.json();

      if (res.ok) {





        router.push('/booking')
      } else {
        toast.error('Error in buying product' || data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
    finally {
      setloading(false);
    }
  };
  useEffect(() => {
    const savedQty = localStorage.getItem(`qty-${id}`);
    const savedGrams = localStorage.getItem(`grams-${id}`);

    if (savedQty) setQty(Number(savedQty));
    if (savedGrams) setGrams(Number(savedGrams));
  }, [id]);
  const handleGrams = (value) => {
    setGrams(value);
    localStorage.setItem(`grams-${id}`, value);
  };
  const togglemenue = () => {
    setopen(!open)
  }





  const rating = 4; // example rating

  return (
    <>
      <div className="flex gap-1  text-sm items-center text-gray-600 w-[70vw] mt-5 mx-auto">
        <Link href="/" className="text-black">Home<span className="text-black"> &gt; </span></Link>

        <Link href="/products" className="hover:text-black">Products<span> &gt; </span></Link>

      </div>
      <div className="max-w-6xl  mx-auto p-6 md:flex md:gap-12">

        {/* Product Image */}
        <div className="md:w-1/2 w-full flex justify-center mb-8 md:mb-0">
          {product?.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={400}   // max desktop width
              height={400}  // max desktop height
              className="w-[90vw] h-[500px]  object-cover rounded-2xl shadow-xl"
              unoptimized
              loading="eager"
            />
          ) : (<Loader />)}
        </div>



        {/* Product Details */}
        <div className="md:w-1/2 w-full flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-3">{product?.name} 250g (Rs.{product?.newprice} PKR)</h1>


            {/* Star Rating */}
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) =>
                i < rating ? (
                  <FaStar key={i} className="text-yellow-500 mr-1" />
                ) : (
                  <FaRegStar key={i} className="text-yellow-500 mr-1" />
                )
              )}
              <span className="text-gray-500 ml-2">(24 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-semibold text-black">
                Rs.{product?.newprice} PKR
              </span>
              {product?.oldprice && (
                <span className="line-through text-gray-400">
                  Rs.{product?.oldprice} PKR
                </span>
              )}
              <span className=" bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                Sale
              </span>
            </div>
            <Marquee text={`Enjoy the freshness of ${product?.name} – premium quality, perfect for gifting or everyday use!`} />


            {/* Weight Selection */}


            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              {`   This premium quality product is carefully selected and packed to
            ensure freshness and excellent taste. Perfect for everyday use or
            gifting. Enjoy the finest quality with every purchase.`}
            </p>
          </div>
          <div>
            {/* Weight buttons */}
            <div className="flex gap-2 mb-4">
              {[250, 500, 750, 1000].map((item) => (
                <button
                  key={item}
                  onClick={() => handleGrams(item)}
                  className={`px-3 py-1 border rounded transition
    ${grams === item ? "bg-black text-white" : "bg-white text-black"}
  `}
                >
                  {item}g
                </button>

              ))}
            </div>



            {/* Quantity buttons */}
            <div className="flex gap-2 items-center mb-4">
              <button
                onClick={async () => {
                  if (qty <= 1) return;
                  setQtyLoading(true);
                  await new Promise((resolve) => setTimeout(resolve, 1000)); // 2-second delay
                  const newQty = qty - 1;
                  setQty(newQty);
                  localStorage.setItem(`qty-${id}`, newQty);
                  setQtyLoading(false);
                }}
                className="px-3 py-1 bg-gray-200 rounded"
                disabled={qtyLoading}
              >
                -
              </button>

              <span>{qtyLoading ? <Loader size={16} /> : qty}</span>

              <button
                onClick={async () => {
                  setQtyLoading(true);
                  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay
                  const newQty = qty + 1;
                  setQty(newQty);
                  localStorage.setItem(`qty-${id}`, newQty);
                  setQtyLoading(false);
                }}
                className="px-3 py-1 bg-gray-200 rounded"
                disabled={qtyLoading}
              >
                +
              </button>


            </div>



            <button
              disabled={!product?.image || loader}

              onClick={(e) => addtocart(e)}
              className={`flex text-center items-center justify-center   py-3 px-6 rounded-lg w-full mb-2 
    ${!product?.image || loader
                  ? "bg-gray-400 cursor-not-allowed"
                  : "text-black border border-black cursor-pointer"}
  `}
            >
              {loader ? <Loader /> : 'Add to Cart'}
            </button>

          </div>


          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-4">
            <button
              disabled={!product?.image || loading}
              onClick={(e) => buy(e)}

              className={`flex text-center items-center justify-center   py-3 px-6 rounded-lg 
    ${!product?.image || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black  hover:bg-gray-800 text-white font-semibold transition cursor-pointer "}
  `}
            >
              {loading ? <Loader /> : "  Buy Now"}
            </button>







          </div>
        </div>
      </div>
      {/* ================= Product Highlights / Policy Info ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-[90vw] md:w-[70vw] mx-auto">
        <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm">
          <span className="text-green-600 font-bold text-lg">💚 100% Natural</span>
          <p className="text-gray-700 text-center text-sm mt-2">
            {`    Our products are 100% natural and carefully packed for freshness.`}
          </p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm">
          <span className="text-blue-600 font-bold text-lg">🔄 Easy Returns</span>
          <p className="text-gray-700 text-center text-sm mt-2">
            {` Return within 7 days if you are not satisfied with the product.`}
          </p>
        </div>
        <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm">
          <span className="text-yellow-600 font-bold text-lg">🚚 Fast Delivery</span>
          <p className="text-gray-700 text-center text-sm mt-2">
            {`         Quick and safe delivery to your doorstep.`}
          </p>
        </div>
      </div>

      {/* ================= Customer Reviews ================= */}
      <div className="mt-6 md:w-[70vw] mx-auto w-[90vw]">
        <h2 className="flex items-center gap-4 text-2xl sm:text-3xl  text-black font-bold mb-8">
          <span className="flex-1 h-[1px] bg-gray-400"></span>
          Customers Reviews
          <span className="flex-1 h-[1px] bg-gray-400"></span>


        </h2>

        <div className="
  flex
  p-6
  no-scrollbar
  items-stretch
  justify-start
  overflow-x-auto
  gap-4
  px-4
">


          {comment.map((item) => (
            <div
              key={item._id}
              className="flex-shrink-0 w-72 h-56 bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Rating & Name */}
              <div className="flex items-center mb-3">
                <div className="flex mr-3">
                  <FaStar className="text-yellow-500 mr-1" />
                  <FaStar className="text-yellow-500 mr-1" />
                  <FaStar className="text-yellow-500 mr-1" />
                  <FaStar className="text-yellow-500 mr-1" />
                </div>
                <span className="font-semibold text-gray-700">{item.name}</span>
              </div>

              {/* Comment */}
              <p className="text-gray-600 text-sm line-clamp-4">
                {item.comment}
              </p>

              {/* Optional footer or icons */}
              <div className="mt-3 text-right">
                <span className="text-xs text-gray-400">Verified Buyer</span>

              </div>
            </div>
          ))}
        </div>


      </div>
      <div className="flex items-center flex-col justify-center p-4 ">
        <button onClick={togglemenue} className="bg-black flex text-center items-center justify-center hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition">{open ? 'Close Review' : 'Write Review'}</button>

      </div>


      {open && (

        <div className=" flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-4 max-w-md bg-white rounded-2xl shadow-2xl p-8"
          >

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Write your Comment
            </h2>

            {/* Email */}
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
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Your Comment"
              rows={6}
              autoComplete="off"
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
            {error && error.comment && (
              <p className="text-red-500 text-sm mt-1">{error.comment}</p>
            )}



            {/* Login Button */}

            <button
              type="submit"
              disabled={comentloading}
              className={`w-full h-[52px] flex items-center justify-center rounded-2xl font-semibold transition
    ${comentloading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-yellow-500'
                }`}
            >
              {comentloading ? <Loader /> : 'Send Message'}
            </button>



          </form>
        </div>
      )}


    </>
  );
};

export default Page;
