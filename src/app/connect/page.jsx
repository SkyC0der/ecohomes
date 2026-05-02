"use client";
import "./contact.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page contact">
        <section className="contact-hero">
          <div className="container">
            <div className="contact-col">
              <div className="contact-hero-header">
                <Copy delay={0.85}>
                  <h1>Begin with a private Lagos consultation</h1>
                </Copy>
              </div>
              <div className="contact-copy-year">
                <Copy delay={0.1}>
                  <h1>&copy;26</h1>
                </Copy>
              </div>
            </div>
            <div className="contact-col">
              <div className="contact-info">
                <div className="contact-info-block">
                  <Copy delay={0.85}>
                    <p>Private Desk</p>
                    <p>hello@studioeco.co</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1}>
                    <p>Buyer and Seller Advisory</p>
                    <p>advisory@studioeco.co</p>
                    <p>+234 915 000 4210</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.15}>
                    <p>Office Location</p>
                    <p>12A Akin Adesola Street</p>
                    <p>Victoria Island, Lagos</p>
                  </Copy>
                </div>
                <div className="contact-info-block">
                  <Copy delay={1.3}>
                    <p>Consultation Windows</p>
                    <p>Tuesday 10:00 AM</p>
                    <p>Thursday 2:30 PM</p>
                    <p>Confidential by default</p>
                  </Copy>
                </div>
              </div>
              <div className="contact-img">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=85"
                  alt="Private luxury real estate consultation"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
