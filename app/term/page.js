import {
  FaFileContract,
  FaUserShield,
  FaShippingFast,
  FaMoneyCheckAlt,
  FaHeadset,
  FaExclamationCircle,
} from "react-icons/fa";

export const metadata = {
  title: "Terms & Conditions | Premium Dry Fruits",
  description:
    "Read our terms and conditions to understand your rights, responsibilities, and policies while shopping for premium dry fruits on our website.",
};

export default function TermsPage() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="mb-14">
          <h1 className="text-4xl mb-2 font-semibold text-gray-900 tracking-tight">
            Terms & Conditions
          </h1>
          <span className="mt-5 text-gray-600 leading-relaxed max-w-3xl">
            Welcome to our website. Please read these terms and conditions
            carefully before using our services. By accessing or using our site,
            you agree to be bound by these terms.
          </span>
        </header>

        {/* Content */}
        <div className="space-y-10 text-gray-700 leading-relaxed">
          <div className="flex gap-4">
            <FaFileContract className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Acceptance of Terms
              </h2>
              <span>
                By placing an order or using our website, you agree to comply
                with these Terms & Conditions, as well as our Privacy Policy,
                Shipping Policy, and Returns Policy. If you do not agree, please
                do not use our services.
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <FaUserShield className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                User Responsibilities
              </h2>
              <span>
                You are responsible for providing accurate information during
                registration, order placement, and checkout. Misuse of our
                website or fraudulent activity may result in termination of your
                account or legal action.
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <FaShippingFast className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Orders & Shipping
              </h2>
              <span>
                All orders are subject to product availability. We reserve the
                right to cancel or modify orders due to stock shortages or errors.
                Shipping will be processed according to our Shipping Policy.
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <FaMoneyCheckAlt className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Payment & Pricing
              </h2>
              <span>
                Prices are displayed in PKR and include applicable taxes. Payment
                must be completed using our available methods at checkout.
                We reserve the right to update prices without prior notice.
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <FaExclamationCircle className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Limitation of Liability
              </h2>
              <span>
                We are not liable for indirect or consequential losses arising
                from the use of our website or products. Liability for defective
                products will be handled according to our Returns & Refund Policy.
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <FaHeadset className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Contact & Support
              </h2>
              <span>
                For questions regarding these Terms & Conditions or any other
                matter, our customer support team is available to assist you.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-gray-600">
      {`    These Terms & Conditions may be updated periodically. Any changes
          will be effective immediately upon posting on this page. Please
          review them regularly to stay informed.`}
        </footer>
      </div>
    </section>
  );
}
