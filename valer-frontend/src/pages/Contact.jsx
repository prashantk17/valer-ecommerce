import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div className="border-t">
      {/* HEADER */}
      <div className="text-center pt-12 pb-8">
        <Title text1="CONTACT" text2="US" />
        <p className="mt-4 text-sm text-gray-500 max-w-xl mx-auto">
          We’re here to help. Whether you have a question about an order,
          partnerships, or careers — reach out anytime.
        </p>
      </div>

      {/* CONTENT */}
      <div className="my-16 flex flex-col md:flex-row gap-16 items-center mb-28">
        {/* IMAGE */}
        <img
          className="w-full md:max-w-[360px] object-cover rounded-sm"
          src={assets.contact_img}
          alt="Valér Contact"
        />

        {/* INFO */}
        <div className="flex flex-col gap-8 md:w-1/2">
          {/* STORE */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-lg text-gray-900">Valér Studio</h3>
            <p className="text-gray-600 leading-relaxed">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
          </div>

          {/* CONTACT */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-lg text-gray-900">Get in Touch</h3>
            <p className="text-gray-600">
              Phone: <span className="text-gray-800">(415) 555-0132</span>
              <br />
              Email:{" "}
              <a
                href="mailto:contact@valer.com"
                className="text-gray-800 hover:underline"
              >
                contact@valer.com
              </a>
            </p>
          </div>

          {/* CAREERS */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-lg text-gray-900">
              Careers at Valér
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We’re always looking for curious minds and refined talent. Explore
              opportunities to grow with Valér.
            </p>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <button
              onClick={() => navigate("/Careers")}
              className="border border-black px-8 py-3 text-xs tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
              EXPLORE CAREERS
            </button>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
