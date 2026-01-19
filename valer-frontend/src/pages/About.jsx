import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div className="border-t">
      {/* ABOUT HEADER */}
      <div className="text-center pt-12 pb-8">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* ABOUT CONTENT */}
      <div className="my-16 flex flex-col md:flex-row gap-16 items-center">
        <img
          className="w-full md:max-w-[420px] object-cover"
          src={assets.about_img}
          alt="About Valér"
        />

        <div className="flex flex-col gap-6 md:w-1/2 text-gray-600 leading-relaxed">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            molestias quasi ea? Odit, quis? Explicabo cumque dignissimos tempora
            voluptates quaerat commodi quis sint incidunt blanditiis.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum
            ducimus iste a esse minus? Dicta aliquam dignissimos eum dolor alias
            numquam quae maxime facilis omnis.
          </p>

          <h3 className="text-lg text-gray-900 font-medium pt-4">
            Our Mission
          </h3>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            consequatur facilis quasi rerum similique ullam repellendus hic
            voluptatibus, exercitationem earum. Ducimus nam sequi quibusdam non.
          </p>
        </div>
      </div>

      {/* WHY VALÉR */}
      <div className="text-center py-10">
        <Title text1="WHY" text2="VALÉR" />
      </div>

      {/* VALUES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24 text-sm">
        <div className="flex flex-col gap-4">
          <h4 className="text-gray-900 font-medium">
            Quality Assurance
          </h4>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente,
            similique. Unde, soluta molestias eligendi nesciunt rem dolores eos
            minus, enim facere.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-gray-900 font-medium">
            Convenience
          </h4>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
            similique sunt exercitationem omnis debitis porro, culpa iure
            consequatur est.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-gray-900 font-medium">
            Exceptional Customer Service
          </h4>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
            hic iusto labore omnis et. Fuga, maiores nemo.
          </p>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
