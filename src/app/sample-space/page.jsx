"use client";
import "./sample-space.css";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

const page = () => {
  return (
    <>
      <Nav />
      <div className="page sample-space">
        <section className="sample-space-hero">
          <div className="sample-space-hero-img">
            <img
              src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2600&q=85"
              alt="Carbon Beach Residence in Malibu"
            />
          </div>
          <div className="sample-space-hero-overlay"></div>
          <div className="container">
            <div className="sample-space-hero-header">
              <Copy delay={1} animateOnScroll={false}>
                <h1>Carbon Beach Residence</h1>
              </Copy>
            </div>
            <div className="sample-space-content">
              <div className="sample-space-col">
                <Copy delay={1.05} animateOnScroll={false}>
                  <p>Malibu, California</p>
                </Copy>
              </div>
              <div className="sample-space-col">
                <div className="sample-space-content-wrapper">
                  <Copy delay={1.1} animateOnScroll={false}>
                    <p>Pacific Coast</p>
                  </Copy>
                </div>
                <div className="sample-space-content-wrapper">
                  <Copy delay={1.15} animateOnScroll={false}>
                    <h3>
                      A rare oceanfront estate designed for privacy, scale, and
                      effortless entertaining along one of Malibu&apos;s most
                      protected stretches of sand.
                    </h3>
                    <h3>
                      Floor-to-ceiling glass, warm stone, and wide terraces
                      create a quiet resort sensibility while keeping the focus
                      on horizon views and discreet daily living.
                    </h3>
                  </Copy>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>Guide Price</p>
                        <p>$28.5M</p>
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>Property Type</p>
                        <p>Oceanfront Estate</p>
                        <p>Private Tour Available</p>
                      </Copy>
                    </div>
                  </div>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.35}>
                        <p>Key Stats</p>
                        <p>6 Bedrooms</p>
                        <p>8 Bathrooms</p>
                        <p>9,200 Interior SF</p>
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.35}>
                        <p>Highlights</p>
                        <p>Beach Access</p>
                        <p>Wellness Suite</p>
                      </Copy>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sample-space-details sample-space-details-1">
          <div className="container">
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <p>Architectural Overview</p>
              </Copy>
            </div>
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <h3>
                  The residence is organized around a broad entertaining level
                  that opens directly to the Pacific. Formal and informal rooms
                  are separated by subtle level changes, allowing large
                  gatherings without compromising intimacy.
                </h3>

                <h3>
                  A private primary wing, guest suites, wellness rooms, and
                  service circulation give the property the operational logic of
                  a boutique hotel while preserving the atmosphere of a personal
                  retreat.
                </h3>
              </Copy>
              <div className="sample-space-details-img">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85"
                  alt="Carbon Beach Residence living area"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="sample-space-details sample-space-details-2">
          <div className="container">
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <p>Amenities and Lifestyle</p>
              </Copy>
            </div>
            <div className="sample-space-col">
              <div className="sample-space-content-wrapper sample-space-meta">
                <div className="sample-space-hero-row">
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.1}>
                      <p>Amenities</p>
                      <p>Infinity Pool</p>
                      <p>Fitness Studio</p>
                      <p>Screening Lounge</p>
                    </Copy>
                  </div>
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.1}>
                      <p>Outdoor Living</p>
                      <p>Ocean Terrace</p>
                      <p>Fire Lounge</p>
                      <p>Direct Beach Gate</p>
                    </Copy>
                  </div>
                </div>
              </div>
              <div className="sample-space-content-wrapper sample-space-meta">
                <div className="sample-space-hero-row">
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.2}>
                      <p>Interior Finish</p>
                      <p>Natural Stone</p>
                      <p>Custom Millwork</p>
                      <p>Gallery Lighting</p>
                    </Copy>
                  </div>
                  <div className="sample-space-hero-sub-col">
                    <Copy delay={0.2}>
                      <p>Neighborhood</p>
                      <p>Carbon Beach</p>
                      <p>Nobu Nearby</p>
                      <p>Private Aviation Access</p>
                    </Copy>
                  </div>
                </div>
              </div>
              <div className="sample-space-details-img">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85"
                  alt="Carbon Beach Residence kitchen and dining"
                />
              </div>
              <Copy delay={0.2}>
                <h3>
                  For qualified buyers, Eco Homes provides a private digital
                  dossier with floor plan preview, comparable sales context,
                  ownership considerations, and a curated tour schedule.
                </h3>
              </Copy>
            </div>
          </div>
        </section>
        <CTAWindow
          img="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=85"
          header="Request Tour"
          callout="A private showing, arranged around your schedule"
          description="Speak with an Eco Homes advisor to verify availability, receive the full property packet, and reserve a confidential viewing window."
        />
      </div>
      <ConditionalFooter />
    </>
  );
};

export default page;
