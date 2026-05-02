"use client";

import "./SearchControls.css";

import {
  PROPERTY_AREAS,
  PROPERTY_TYPES,
  formatNaira,
} from "@/features/listings/propertyService";

const bedroomOptions = [1, 2, 3, 4, 5];

const FilterPanel = ({
  filters,
  onFilterChange,
  onClear,
  totalCount,
  resultCount,
}) => {
  const activeType = filters.type || "All";
  const activeBeds = filters.beds ? Number(filters.beds) : 0;

  return (
    <div className="property-filter-panel">
      <div className="property-results-count">
        <p>
          Showing {resultCount} of {totalCount} properties
        </p>
        <button type="button" onClick={onClear}>
          Clear all filters
        </button>
      </div>

      <div className="property-filter-row property-filter-types" aria-label="Property type filters">
        {["All", ...PROPERTY_TYPES].map((type) => (
          <button
            key={type}
            type="button"
            className={activeType === type ? "active" : ""}
            onClick={() => onFilterChange("type", type === "All" ? "" : type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="property-filter-grid">
        <div className="property-filter-field">
          <label htmlFor="min-price">Min price</label>
          <input
            id="min-price"
            type="number"
            min="0"
            step="5000000"
            value={filters.minPrice ?? ""}
            onChange={(event) => onFilterChange("minPrice", event.target.value)}
            placeholder="15000000"
          />
          {filters.minPrice ? <span>{formatNaira(Number(filters.minPrice))}</span> : null}
        </div>
        <div className="property-filter-field">
          <label htmlFor="max-price">Max price</label>
          <input
            id="max-price"
            type="number"
            min="0"
            step="5000000"
            value={filters.maxPrice ?? ""}
            onChange={(event) => onFilterChange("maxPrice", event.target.value)}
            placeholder="850000000"
          />
          {filters.maxPrice ? <span>{formatNaira(Number(filters.maxPrice))}</span> : null}
        </div>
        <div className="property-filter-field">
          <label htmlFor="area-filter">Area</label>
          <select
            id="area-filter"
            value={filters.area ?? ""}
            onChange={(event) => onFilterChange("area", event.target.value)}
          >
            <option value="">All Lagos areas</option>
            {PROPERTY_AREAS.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="property-filter-row property-filter-beds" aria-label="Bedroom filters">
        <span>Bedrooms</span>
        <button
          type="button"
          className={!activeBeds ? "active" : ""}
          onClick={() => onFilterChange("beds", "")}
        >
          Any
        </button>
        {bedroomOptions.map((beds) => (
          <button
            key={beds}
            type="button"
            className={activeBeds === beds ? "active" : ""}
            onClick={() => onFilterChange("beds", String(beds))}
          >
            {beds === 5 ? "5+" : beds}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
