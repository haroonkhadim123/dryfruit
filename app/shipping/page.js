import {
  FaTruck,
  FaClock,
  FaMapMarkedAlt,
  FaBoxOpen,
  FaMoneyBillWave,
  FaHeadset,
} from "react-icons/fa";

export const metadata = {
  title: "Shipping & Delivery | Premium Dry Fruits",
  description:
    "Everything you need to know about our shipping process, delivery timelines, packaging standards, and customer support.",
};

export default function ShippingPage() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Page Title */}
        <header className="mb-14">
          <h1 className="text-4xl mb-2 font-semibold text-gray-900 tracking-tight">
            Shipping & Delivery
          </h1>
          <span className="mt-5 text-gray-600 leading-relaxed max-w-3xl">
            We take great care in delivering premium quality dry fruits to your
            doorstep. Our shipping process is designed to ensure freshness,
            safety, and timely delivery, giving you complete peace of mind when
            you shop with us.
          </span>
        </header>

        {/* Content */}
        <div className="space-y-10 text-gray-700 leading-relaxed">
          <div className="flex gap-4">
            <FaTruck className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Reliable Shipping Partners
              </h2>
              <span>
                We collaborate with reputable courier services to ensure every
                order is handled with care and delivered in excellent condition,
                maintaining the quality and freshness of our products.
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <FaClock className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Delivery Timelines
              </h2>
              <span>
                Orders are typically delivered within{" "}
                <strong>2–5 business days</strong>. Delivery times may vary based
                on your location, courier service availability, or unforeseen
                circumstances.
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <FaMapMarkedAlt className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Nationwide Coverage
              </h2>
              <span>
                We offer shipping across Pakistan, covering major metropolitan
                areas as well as most remote locations, ensuring accessibility
                for all our customers.
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <FaBoxOpen className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Hygienic & Secure Packaging
              </h2>
              <span>
                All dry fruits are packed in food-grade, airtight, and
                tamper-resistant packaging to preserve taste, aroma, and
                nutritional value during transit.
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <FaMoneyBillWave className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Shipping Charges
              </h2>
              <span>
                Shipping charges vary depending on order size and delivery
                location. Any applicable fees are clearly displayed at checkout
                before you confirm your order.
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <FaHeadset className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Customer Support
              </h2>
              <span>
                If you have any questions regarding shipping, tracking, or
                delivery, our customer support team is always available to
                assist you promptly.
              </span>
            </div>
          </div>
        </div>

        {/* Footer Statement */}
        <footer className="mt-16 pt-8 border-t text-gray-600">
      {`    Once your order is dispatched, tracking details will be shared via SMS
          or email, allowing you to monitor your shipment every step of the way.`}
        </footer>
      </div>
    </section>
  );
}
