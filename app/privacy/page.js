import {
  FaShieldAlt,
  FaUserLock,
  FaServer,
  FaEnvelope,
  FaLock,
  FaHeadset,
} from "react-icons/fa";

export const metadata = {
  title: "Privacy Policy | Premium Dry Fruits",
  description:
    "Read our privacy policy to understand how we collect, use, and protect your personal information while shopping for premium dry fruits.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="mb-14">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-5 text-gray-600 leading-relaxed max-w-3xl">
     {`       Your privacy and trust are important to us. This policy explains how
            we collect, use, store, and protect your personal information when
            you shop with us.`}
          </p>
        </header>

        {/* Content */}
        <div className="space-y-10 text-gray-700 leading-relaxed">
          <div className="flex gap-4">
            <FaShieldAlt className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Information We Collect
              </h2>
              <p>
        {`        We may collect personal information such as your name, email
                address, phone number, and shipping address when you place an
                order, sign up for our newsletter, or contact our support team.`}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FaUserLock className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                How We Use Your Information
              </h2>
              <p>
            {`    Your information is used to process orders, provide customer
                support, send updates about promotions or products, and improve
                your shopping experience. We never sell your data to third
                parties.`}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FaServer className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Data Security
              </h2>
              <p>
             {`   We use industry-standard security measures, including encryption
                and secure servers, to protect your personal and payment
                information from unauthorized access.`}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FaEnvelope className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Email Communications
              </h2>
              <p>
          {`      If you subscribe to our newsletter or promotional emails, you
                can unsubscribe at any time. We respect your preferences and
                will not spam your inbox.`}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <FaLock className="text-green-600 mt-1 text-lg" />
            <div>
              <h2 className="font-semibold text-gray-900 mb-1">
                Cookies & Tracking
              </h2>
              <p>
            {`    Our website may use cookies to enhance user experience, analyze
                traffic, and improve our services. You can manage cookie
                preferences via your browser settings.`}
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
            {`    If you have any questions or concerns regarding your privacy, our
                support team is available to assist you promptly.`}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-gray-600">
  {`        We may update this Privacy Policy from time to time. Any changes will
          be posted on this page and are effective immediately upon posting.`}
        </footer>
      </div>
    </section>
  );
}
