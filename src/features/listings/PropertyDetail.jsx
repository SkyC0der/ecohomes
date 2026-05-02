"use client";

import "@/app/sample-space/sample-space.css";
import "./PropertyDetail.css";

import { useState } from "react";

import BookingModal from "@/features/booking/BookingModal";
import MyBookingsPanel from "@/features/booking/MyBookingsPanel";
import NeighbourhoodInsightCard from "@/features/neighbourhoods/NeighbourhoodInsightCard";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Nav from "@/components/Nav/Nav";
import Copy from "@/components/Copy/Copy";
import { formatNaira } from "./propertyService";

const PropertyDetail = ({ property, neighbourhood }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [refreshBookings, setRefreshBookings] = useState(0);
  const specLabel =
    property.type === "Land"
      ? `${property.sqft.toLocaleString("en-NG")} sqm land parcel`
      : `${property.beds} Bedrooms / ${property.baths} Bathrooms / ${property.sqft.toLocaleString("en-NG")} SF`;

  return (
    <>
      <Nav />
      <div className="page sample-space property-detail-page">
        <section className="sample-space-hero">
          <div className="sample-space-hero-img">
            <img src={property.images[0]} alt={property.title} />
          </div>
          <div className="sample-space-hero-overlay"></div>
          <div className="container">
            <div className="sample-space-hero-header">
              <Copy delay={1} animateOnScroll={false}>
                <h1>{property.title}</h1>
              </Copy>
            </div>
            <div className="sample-space-content">
              <div className="sample-space-col">
                <Copy delay={1.05} animateOnScroll={false}>
                  <p>{property.area}, Lagos</p>
                </Copy>
              </div>
              <div className="sample-space-col">
                <div className="sample-space-content-wrapper">
                  <Copy delay={1.1} animateOnScroll={false}>
                    <p>{property.area}</p>
                  </Copy>
                </div>
                <div className="sample-space-content-wrapper">
                  <Copy delay={1.15} animateOnScroll={false}>
                    <h3>{property.description}</h3>
                    <h3>
                      Eco Homes can coordinate a discreet private viewing,
                      buyer context, and neighbourhood intelligence before you
                      commit time to the tour.
                    </h3>
                  </Copy>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>Guide Price</p>
                        <p>{formatNaira(property.price)}</p>
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.2}>
                        <p>Property Type</p>
                        <p>{property.type}</p>
                        <p>{property.available ? "Private tour available" : "Currently unavailable"}</p>
                      </Copy>
                    </div>
                  </div>
                </div>
                <div className="sample-space-content-wrapper sample-space-meta">
                  <div className="sample-space-hero-row">
                    <div className="sample-space-hero-sub-col">
                      <Copy delay={0.35}>
                        <p>Key Stats</p>
                        <p>{specLabel}</p>
                      </Copy>
                    </div>
                    <div className="sample-space-hero-sub-col property-detail-actions">
                      <button
                        type="button"
                        disabled={!property.available}
                        onClick={() => setIsBookingOpen(true)}
                      >
                        {property.available ? "Request Private Viewing" : "Viewing Unavailable"}
                      </button>
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
                <p>Property Context</p>
              </Copy>
            </div>
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <h3>
                  This Lagos neighbourhood has been selected for location quality,
                  lifestyle fit, and resale strength. The viewing process is
                  arranged privately and tailored to serious buyers.
                </h3>
              </Copy>
              <div className="sample-space-details-img">
                <img src={property.images[1] ?? property.images[0]} alt={`${property.title} interior`} />
              </div>
            </div>
          </div>
        </section>
        <section className="sample-space-details sample-space-details-2 property-location-section">
          <div className="container">
            <div className="sample-space-col">
              <Copy delay={0.1}>
                <p>Location and Neighbourhood</p>
              </Copy>
            </div>
            <div className="sample-space-col">
              <div className="property-location-panel">
                <div>
                  <p>Area context</p>
                  <h3>{property.area}, Lagos</h3>
                </div>
                <p className="property-location-note">
                  Exact address shared after buyer verification.
                </p>
              </div>
              <NeighbourhoodInsightCard data={neighbourhood} />
              <div className="sample-space-details-img">
                <img src={property.images[2] ?? property.images[0]} alt={`${property.title} additional view`} />
              </div>
            </div>
          </div>
        </section>
        <CTAWindow
          img={property.images[0]}
          header="Request Tour"
          callout="A private Lagos viewing, arranged around your schedule"
          description="Speak with Eco Homes to verify availability, receive buyer context, and reserve a calm viewing window."
        />
      </div>
      <BookingModal
        property={property}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookingSaved={() => setRefreshBookings((value) => value + 1)}
      />
      <MyBookingsPanel refreshToken={refreshBookings} />
      <ConditionalFooter />
    </>
  );
};

export default PropertyDetail;
