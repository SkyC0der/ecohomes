"use client";

import "./NeighbourhoodInsightCard.css";

const NeighbourhoodInsightCard = ({ data }) => {
  if (!data) return null;

  return (
    <article className="neighbourhood-card">
      <div className="neighbourhood-card-header">
        <div>
          <p>Neighbourhood insight</p>
          <h3>{data.area}</h3>
        </div>
        <div className="neighbourhood-score">
          <span>{data.safetyScore.toFixed(1)}</span>
          <p>Safety</p>
        </div>
      </div>
      <p className="neighbourhood-vibe">{data.vibeTag}</p>
      <div className="neighbourhood-grid">
        <div>
          <p>Amenities</p>
          <ul>
            {data.amenities.slice(0, 4).map((amenity) => (
              <li key={amenity}>{amenity}</li>
            ))}
          </ul>
        </div>
        <div>
          <p>Commute</p>
          <ul>
            {Object.entries(data.commuteTimes).map(([destination, time]) => (
              <li key={destination}>
                <span>{destination}</span>
                <span>{time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="neighbourhood-meta">
        <span>{data.floodRisk} flood risk</span>
        <span>{data.powerSupply}</span>
        <span>{data.internet}</span>
        <span>{data.priceDirection}</span>
      </div>
      <div className="neighbourhood-best-for">
        {data.bestFor.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </article>
  );
};

export default NeighbourhoodInsightCard;
