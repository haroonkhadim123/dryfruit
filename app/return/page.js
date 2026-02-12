import {
  FaUndoAlt,
  FaClock,
  FaBox,
  FaTimesCircle,
  FaMoneyCheckAlt,
  FaHeadset,
} from "react-icons/fa";

export const metadata = {
  title: "Returns & Refunds | Premium Dry Fruits",
  description:
    "Read our returns and refunds policy to understand eligibility, timelines, and the process for premium dry fruit orders.",
};

export default function ReturnsPage() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Page Header */}
        <header className="mb-14">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
            Returns & Refund Policy
          </h1>
          <p className="mt-5 text-gray-600 leading-relaxed max-w-3xl">
         {`   Customer satisfaction is important to us. This policy outlines the
            conditions under which returns, replacements, or refunds may be
            processed for orders placed on our website.`}
          </p>
        </header>

        {/* Policy Content */}
        <div className="space-y-10 text-gray-700 leading-relaxed">
          <div className="flex gap-4">
            <FaUndoAlt className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Eligibility for Returns
              </h2>
              <p>
            {`    Returns or replacements are accepted only if the product
                received is damaged, expired, or incorrect. Due to the nature
                of food products, we do not accept returns for change of mind.`}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FaClock className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Return Request Timeline
              </h2>
              <span>
                Any return or refund request must be reported within{" "}
                <strong>24 hours</strong> of delivery. Requests submitted after
                this time may not be eligible for review.
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <FaBox className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Product Condition Requirements
              </h2>
              <p>
         {`       The product must remain unopened, unused, and in its original
                packaging. We may request images or videos for verification
                before approving a return or replacement.`}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FaTimesCircle className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Non-Returnable Items
              </h2>
              <p>
          {`      For hygiene and safety reasons, opened products, used items, or
                orders placed incorrectly by the customer are not eligible for
                return or refund.`}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FaMoneyCheckAlt className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Refund Processing
              </h2>
              <p>
          {`      Once a return is approved, refunds will be processed to the
                original payment method within <strong>5–7 business days</strong>.
                Shipping charges are non-refundable unless the error was on our
                end.`}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FaHeadset className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Customer Support
              </h2>
              <p>
             {`   If you have any concerns regarding returns or refunds, our
                customer support team is always available to assist you and
                ensure a smooth resolution.`}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <footer className="mt-16 pt-8 border-t text-gray-600">
    {`      We reserve the right to update or modify this policy at any time
          without prior notice. Any changes will be effective immediately upon
          posting on this page.`}
        </footer>
      </div>
    </section>
  );
}
