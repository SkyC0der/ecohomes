"use client";

import "./PropertyCard.css";

import { formatNaira } from "./propertyService";
import { useViewTransition } from "@/hooks/useViewTransition";

const PropertyCard = ({ property, onRequestViewing }) => {
  const { navigateWithTransition } = useViewTransition();
  const detailRoute = `/properties/${property.id}`;
  const specText =
    property.type === "Land"
      ? `${property.sqft.toLocaleString("en-NG")} sqm land parcel`
      : `${property.beds} BD / ${property.baths} BA / ${property.sqft.toLocaleString("en-NG")} SF`;

  return (
    <article className={`space property-card ${property.available ? "" : "unavailable"}`}>
      <a
        href={detailRoute}
        className="property-card-link"
        aria-label={`${property.title} in ${property.area}`}
        onClick={(event) => {
          event.preventDefault();
          navigateWithTransition(detailRoute);
        }}
      >
        <div className="space-img">
          <img src={property.images[0]} alt={property.title} />
          {!property.available ? <span>Unavailable</span> : null}
        </div>
        <div className="space-info">
          <div className="prop-info-col">
            <div className="prop-date">
              <p>{formatNaira(property.price)}</p>
            </div>
          </div>
          <div className="prop-info-col">
            <div className="prop-info-sub-col">
              <div className="prop-name">
                <h3>{property.title}</h3>
                <p className="lg">{property.area}, Lagos</p>
              </div>
            </div>
            <div className="prop-info-sub-col">
              <div className="property-specs">
                <p>{property.type}</p>
                <p>{specText}</p>
              </div>
            </div>
          </div>
        </div>
      </a>
      <div className="property-card-actions">
        <button
          type="button"
          disabled={!property.available}
          onClick={() => onRequestViewing(property)}
        >
          {property.available ? "Request Private Viewing" : "Viewing Unavailable"}
        </button>
      </div>
    </article>
  );
};

export default PropertyCard;
