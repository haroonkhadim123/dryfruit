"use client";
import { useEffect, useState } from "react";
import { FaBox, FaTruck, FaCheckCircle, FaRegCheckCircle, FaSearch } from "react-icons/fa";
  import toast from "react-hot-toast";
  import Loader from "../component/Loader";

export default function TrackOrderPage() {
  const [email, setEmail] = useState("");
  const [orderList, setOrderList] = useState([]); // fetched orders
  const [order, setOrder] = useState(null); // single tracked order
  const [loader, setLoader] = useState(false);
  const [error, seterror] = useState('')


  // Fetch all orders on mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/order", { cache: "no-store" });
        const data = await res.json();
        if (res.ok && data.products) {
          setOrderList(data.products);
          return; // array of orders
        } else {
          toast.error("Failed to fetch orders");
        }
      } catch (err) {
        console.log("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);
const handleTrack = (e) => {
  e.preventDefault();
  seterror('');
  if(!email){
    seterror("Enter a email")
    return;
    
  }
  
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    toast.error("Please enter a valid email to track your order.");
    return;
  }

  try {
    setOrder(null);    // Clear previous order
    setLoader(true);  // Show loading spinner

    // Simulate 5-second delay
    setTimeout(() => {
      try {
        const foundOrder = orderList.find(
          (item) => item.email.toLowerCase() === trimmedEmail.toLowerCase()
        );

        if (foundOrder) {
          setOrder(foundOrder); // Set the found order
          setEmail("");         // Clear input
        } else {
          toast.error("No order found for this email. Please check and try again.");
          setOrder(null);       // Reset state
        }
      } catch (error) {
        console.error("Error tracking order:", error);
        toast.error("Something went wrong while fetching your order. Please try again later.");
      } finally {
        setLoader(false);    // Hide spinner after 5 seconds
      }
    }, 2000); 
  } catch (error) {
    console.error("Error initiating tracking:", error);
    setLoader(false);
  }
};



  // Utility to get timeline class based on status
  const getStepClass = (step) => {
    if (!order) return "text-gray-400";
    if (order.status.toLowerCase() === step.toLowerCase()) return "text-green-600";
    const orderStepIndex = ["placed", "shipped", "delivered", "received"].indexOf(order.status.toLowerCase());
    const currentStepIndex = ["placed", "shipped", "delivered", "received"].indexOf(step.toLowerCase());
    return orderStepIndex >= currentStepIndex ? "text-green-600" : "text-gray-400";
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* ===== Heading ===== */}
      <h1 className="text-4xl font-bold mb-4 text-center text-black">
        Track Your Order
      </h1>
      <p className="text-center text-gray-600 mb-2">
        Enter the email used during checkout to see the current status of your order.
      </p>
      <p className="text-center text-gray-600 mb-6">
        Follow your order from placement to delivery at your doorstep.
      </p>

      {/* ===== Search Section ===== */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <div className="flex md:flex-row flex-col gap-3">
          <div className="w-full">
            <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 border w-full rounded-lg px-4 py-2 outline-none focus:border-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
                  {error && (<span className="text-red-500 mt-1">{error}</span>)}
          </div>
       <button
  onClick={handleTrack}
  disabled={loader}
  className={` h-[52px] flex items-center whitespace-nowrap justify-center rounded-lg px-2 font-semibold transition
    ${loader 
      ? 'bg-gray-400 cursor-not-allowed' 
      : 'bg-black text-white hover:bg-yellow-500'
    }`}
>
  {loader ? <Loader /> : <><FaSearch className="mr-2" /> Track Order</>}
</button>
        </div>

      </div>

      {/* ===== Timeline & Order Details ===== */}
      {order && (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline */}
          <div className="lg:col-span-2 bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-6">Order Status</h2>
            <div className="space-y-6">
              {/* Order Placed */}
              <div className="flex gap-4 items-start">
                <FaBox className={`${getStepClass("placed")} mt-1`} size={22} />
                <div>
                  <h3 className={`font-medium ${getStepClass("placed")}`}>Order Placed</h3>
                  <p className="text-sm text-gray-500">{`Your order has been successfully placed.`}</p>
                </div>
              </div>

              {/* Shipped */}
              <div className="flex gap-4 items-start">
                <FaTruck className={`${getStepClass("shipped")} mt-1`} size={22} />
                <div>
                  <h3 className={`font-medium ${getStepClass("shipped")}`}>Shipped</h3>
                  <p className="text-sm text-gray-500">{`Your order is on the way.`}</p>
                </div>
              </div>

              {/* Delivered */}
              <div className="flex gap-4 items-start">
                <FaCheckCircle className={`${getStepClass("delivered")} mt-1`} size={22} />
                <div>
                  <h3 className={`font-medium ${getStepClass("delivered")}`}>Delivered</h3>
                  <p className="text-sm text-gray-500">
                    {order.status.toLowerCase() === "delivered" || order.status.toLowerCase() === "received"
                      ? "Package delivered to customer"
                      : "Pending delivery"}
                  </p>
                </div>
              </div>

              {/* Received */}
              <div className="flex gap-4 items-start">
                <FaRegCheckCircle className={`${getStepClass("received")} mt-1`} size={22} />
                <div>
                  <h3 className={`font-medium ${getStepClass("received")}`}>Received</h3>
                  <p className="text-sm text-gray-500">
                    {order.status.toLowerCase() === "received"
                      ? "Customer has received the package"
                      : "Waiting for delivery confirmation"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="bg-white shadow rounded-xl p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>

            <div className="space-y-3 text-sm">
           
             
              <div className="flex justify-between">
                <span>Status</span>
                <span className={`font-medium ${getStepClass(order.status)}`}>{order.status}</span>
              </div>
              <div className="flex justify-between">
  <span>Order Date</span>
  <span className="font-medium">
    {new Date(order.createdAt).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}
  </span>
</div>

            </div>

            <hr className="my-4" />

            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p className="text-sm text-gray-600">
              {`${order.firstname} ${order.lastname} `}
            </p>
             <p className="text-sm text-gray-600">
              {`${order.address} `},
            </p>
              <p className="text-sm text-gray-600">
              {`${order.city} `}
            </p>
          </div>
        </div>
      )}

      {/* Support Section */}
      <div className="mt-10 bg-blue-50 p-6 rounded-xl text-center">
        <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
        <p className="text-gray-700 mb-1">
     {`     If you have any questions about your order, please contact our support team.`}
        </p>
        <p className="text-gray-700">
       {`   We are here 24/7 to ensure your order reaches you safely.`}
        </p>
      </div>
    </div>
  );
}
