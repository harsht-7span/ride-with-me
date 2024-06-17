import React from "react";

function Help() {
  return (
    <>
      <div className="container max-w-96 mx-auto p-6 rounded-lg">
        <div className="flex justify-start mb-4">
          <h1 className="font-poppins text-black font-bold text-4xl">
            Help and Support
          </h1>
        </div>
        <hr className="mb-4 border-rose border" />

        <p className="text-lg leading-relaxed text-gray-700 text-justify">
          Welcome to the{" "}
          <span className="font-semibold">EasyGo Help and Support</span> page.
          We are here to assist you with any issues or questions you may have
          about our services. Your health and safety are our top priorities, and
          we are committed to providing reliable support whenever you need it.
        </p>

        <p className="text-lg leading-relaxed text-gray-700 text-justify mt-8">
          <strong>Contact Support:</strong> If you need personalized assistance,
          our support team is available 24/7. You can reach us via email at
          support@easygo.com or call us at 1-800-EASYGO (1-800-327-9464).
        </p>

        <p className="text-lg leading-relaxed text-gray-700 text-justify mt-8">
          <strong>Feedback and Suggestions:</strong> We value your feedback and
          are always looking to improve our services. Please share your thoughts
          and suggestions with us at feedback@easygo.com.
        </p>

        <p className="text-lg leading-relaxed text-gray-700 text-justify mt-8">
          Thank you for choosing EasyGo. We are dedicated to providing you with
          the best travel experience and are always here to support you.
        </p>
      </div>
    </>
  );
}

export default Help;
