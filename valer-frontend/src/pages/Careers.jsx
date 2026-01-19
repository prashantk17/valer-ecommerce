import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

const Careers = () => {
  return (
    <div className="border-t">
      {/* HEADER */}
      <div className="text-center pt-14 pb-10">
        <Title text1="CAREERS" text2="AT VALÉR" />
        <p className="mt-5 text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Valér is built by people who value restraint, craftsmanship, and
          thoughtful execution. We are always open to connecting with individuals
          who resonate with our philosophy and approach to design, technology,
          and operations.
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 mb-28 space-y-20">
        {/* SECTION 1 */}
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Life at Valér
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Working at Valér means being part of a team that values clarity over
            chaos and intention over excess. We operate with a long-term mindset,
            focusing on creating meaningful products and experiences rather than
            chasing trends.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Our teams collaborate across disciplines, blending creative thinking
            with technical precision. We encourage independent ownership while
            maintaining a strong sense of collective responsibility.
          </p>
        </section>

        {/* SECTION 2 */}
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            What We Look For
          </h3>
          <p className="text-gray-600 leading-relaxed">
            We are interested in individuals who demonstrate curiosity, integrity,
            and a strong sense of accountability. Titles and credentials matter
            less to us than mindset, adaptability, and respect for craft.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Whether your background is in design, engineering, operations,
            marketing, or customer experience, we value thoughtful problem-solvers
            who take pride in their work.
          </p>
        </section>

        {/* SECTION 3 */}
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Our Hiring Approach
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Valér does not maintain a public list of open roles at all times.
            Instead, we prefer a more intentional approach to hiring. This allows
            us to meet people organically and build relationships before formal
            roles are defined.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            If your profile aligns with our direction, our HR team will reach out
            to explore potential opportunities.
          </p>
        </section>

        {/* SECTION 4 */}
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Applying to Valér
          </h3>
          <p className="text-gray-600 leading-relaxed">
            If you would like to apply directly, please send an email introducing
            yourself along with your area of interest, relevant experience, and
            any supporting material such as a portfolio or work samples.
          </p>

          <p className="text-gray-600 leading-relaxed mt-4">
            Applications should be sent to:
          </p>

          <p className="mt-3 text-gray-900 text-sm">
            <a
              href="mailto:applications@valer.com"
              className="hover:underline"
            >
              applications@valer.com
            </a>
          </p>
        </section>

        {/* SECTION 5 */}
        <section className="border-t pt-10">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            HR & Career Inquiries
          </h3>
          <p className="text-gray-600 leading-relaxed">
            For questions related to hiring processes, career pathways, or general
            employment inquiries, our Human Resources team can be contacted
            directly.
          </p>

          <div className="mt-4 text-sm text-gray-700 leading-relaxed">
            <p>
              HR Email:{" "}
              <a
                href="mailto:hr@valer.com"
                className="text-gray-900 hover:underline"
              >
                hr@valer.com
              </a>
            </p>

            <p className="mt-3">
              Valér Studio <br />
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
          </div>
        </section>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Careers;
