"use client";
import "./studio.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import HowWeWork from "@/components/HowWeWork/HowWeWork";
import Spotlight from "@/components/Spotlight/Spotlight";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page studio">
        <section className="studio-hero">
          <div className="container">
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <p>
                  We advise private buyers, family offices, founders, and
                  developers who expect precision, discretion, and a calm path
                  through complex luxury real estate decisions.
                </p>
              </Copy>
            </div>
            <div className="studio-hero-col">
              <Copy delay={0.85}>
                <h2>
                  Eco Homes pairs editorial property presentation with
                  disciplined market intelligence, creating a brokerage
                  experience that feels more like private advisory than public
                  search.
                </h2>
              </Copy>
              <div className="studio-hero-hero-img">
                <img
                  src="https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1800&q=85"
                  alt="Editorial luxury residence interior"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="more-facts">
          <div className="container">
            <div className="more-facts-items">
              <div className="fact">
                <Copy delay={0.1}>
                  <p>Luxury markets covered</p>
                  <h2>14</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.2}>
                  <p>Closed and advised volume</p>
                  <h2>$4.8B</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.3}>
                  <p>Private listings sourced</p>
                  <h2>240+</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.4}>
                  <p>Average buyer shortlist</p>
                  <h2>7</h2>
                </Copy>
              </div>
              <div className="fact">
                <Copy delay={0.5}>
                  <p>Referral-led clients</p>
                  <h2>82%</h2>
                </Copy>
              </div>
            </div>
          </div>
        </section>
        <section className="how-we-work-container">
          <div className="container">
            <HowWeWork />
          </div>
        </section>
        <CTAWindow
          img="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=85"
          header="Private Advisory"
          callout="Representation for buyers, sellers, and developers"
          description="From quiet acquisitions to pre-market positioning, Eco Homes builds a bespoke plan around confidentiality, timing, and long-term value."
        />
        <Spotlight />
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
