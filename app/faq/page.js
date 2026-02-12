import { FaCheckCircle, FaTruck, FaUndoAlt, FaLock } from "react-icons/fa";

export const metadata = {
  title: "FAQs | Premium Dry Fruits",
  description:
    "Find answers to common questions about our premium dry fruits, quality, delivery, payments, and returns.",
};

export default function FAQPage() {
  const faqs = [
    {
      icon: <FaCheckCircle />,
      q: "Are your dry fruits 100% natural?",
      a: "Yes. Our dry fruits are carefully sourced from trusted farms and are completely free from artificial colors, added sugar, and harmful preservatives. We focus on delivering pure, natural, and healthy products.",
    },
    {
      icon: <FaCheckCircle />,
      q: "How do you ensure quality and freshness?",
      a: "Every batch goes through strict quality checks before packaging. We use airtight, food-grade packaging to preserve freshness, aroma, and nutritional value for a longer period.",
    },
    {
      icon: <FaTruck />,
      q: "How long does delivery take?",
      a: "Orders are usually delivered within 2–5 business days depending on your city and courier service availability. You will receive tracking details once your order is dispatched.",
    },
    {
      icon: <FaLock />,
      q: "What payment methods do you accept?",
      a: "We accept Debit/Credit Cards, Bank Transfers, and Cash on Delivery. All online transactions are secured using industry-standard encryption.",
    },
    {
      icon: <FaUndoAlt />,
      q: "What is your return and refund policy?",
      a: "If you receive a damaged or incorrect product, please contact our support team within 24 hours of delivery. We will arrange a replacement or refund after verification.",
    },
  ];

  return (
    <section className="bg-[#fafafa] py-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
     {`       Clear answers to help you shop premium quality dry fruits with confidence`}
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-8">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                <div className="text-green-600 text-xl mt-1">
                  {item.icon}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.q}
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
