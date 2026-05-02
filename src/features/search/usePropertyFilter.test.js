import { describe, expect, it } from "vitest";

import {
  applyPropertyFilters,
  filterByBeds,
  filterByPrice,
  filterByType,
  searchByLocation,
} from "./usePropertyFilter";

const listings = [
  {
    id: "lekki-apartment",
    title: "Lekki Phase 1 Serviced Apartment",
    type: "Apartment",
    price: 45000000,
    beds: 2,
    location: "Lekki Phase 1, Lagos",
    area: "Lekki Phase 1",
  },
  {
    id: "ikoyi-duplex",
    title: "Ikoyi Waterfront Duplex",
    type: "Duplex",
    price: 320000000,
    beds: 5,
    location: "Ikoyi, Lagos",
    area: "Ikoyi",
  },
  {
    id: "ajah-land",
    title: "Ajah Development Plot",
    type: "Land",
    price: 25000000,
    beds: 0,
    location: "Sangotedo, Ajah",
    area: "Ajah",
  },
  {
    id: "yaba-bungalow",
    title: "Yaba Heritage Bungalow",
    type: "Bungalow",
    price: 85000000,
    beds: 3,
    location: "Yaba, Lagos",
    area: "Yaba",
  },
];

describe("property filtering", () => {
  it("filterByPrice returns only listings within range", () => {
    expect(filterByPrice(listings, 40000000, 90000000).map((item) => item.id))
      .toEqual(["lekki-apartment", "yaba-bungalow"]);
  });

  it("filterByType returns correct property types", () => {
    expect(filterByType(listings, "Duplex").map((item) => item.id)).toEqual([
      "ikoyi-duplex",
    ]);
  });

  it("filterByBeds returns listings with at least the requested bedrooms", () => {
    expect(filterByBeds(listings, 3).map((item) => item.id)).toEqual([
      "ikoyi-duplex",
      "yaba-bungalow",
    ]);
  });

  it("searchByLocation returns fuzzy-matched results", () => {
    expect(searchByLocation(listings, "leki").map((item) => item.id)).toEqual([
      "lekki-apartment",
    ]);
  });

  it("combines multiple filters as an intersection", () => {
    const filtered = applyPropertyFilters(listings, {
      minPrice: 50000000,
      maxPrice: 400000000,
      beds: 3,
      query: "ikyi",
      type: "Duplex",
    });

    expect(filtered.map((item) => item.id)).toEqual(["ikoyi-duplex"]);
  });
});
