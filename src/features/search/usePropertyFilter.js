import { useMemo } from "react";

const toText = (value) => String(value ?? "").trim().toLowerCase();

const normalizeNumber = (value) => {
  if (value === undefined || value === null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const levenshteinDistance = (a, b) => {
  const source = toText(a);
  const target = toText(b);

  if (source === target) return 0;
  if (!source.length) return target.length;
  if (!target.length) return source.length;

  const previous = Array.from({ length: target.length + 1 }, (_, index) => index);
  const current = Array(target.length + 1).fill(0);

  for (let i = 1; i <= source.length; i += 1) {
    current[0] = i;

    for (let j = 1; j <= target.length; j += 1) {
      const cost = source[i - 1] === target[j - 1] ? 0 : 1;
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost
      );
    }

    for (let j = 0; j <= target.length; j += 1) {
      previous[j] = current[j];
    }
  }

  return previous[target.length];
};

export const isFuzzyMatch = (candidate, query) => {
  const normalizedQuery = toText(query);
  const normalizedCandidate = toText(candidate);

  if (!normalizedQuery) return true;
  if (!normalizedCandidate) return false;
  if (normalizedCandidate.includes(normalizedQuery)) return true;

  const words = normalizedCandidate.split(/[\s,.-]+/).filter(Boolean);
  return words.some((word) => {
    const distance = levenshteinDistance(word, normalizedQuery);
    const tolerance = normalizedQuery.length <= 4 ? 1 : 2;
    return distance <= tolerance;
  });
};

export const filterByPrice = (listings, min, max) => {
  const minPrice = normalizeNumber(min);
  const maxPrice = normalizeNumber(max);

  return listings.filter((listing) => {
    if (minPrice !== null && listing.price < minPrice) return false;
    if (maxPrice !== null && listing.price > maxPrice) return false;
    return true;
  });
};

export const filterByType = (listings, type) => {
  const normalizedType = toText(type);
  if (!normalizedType || normalizedType === "all") return listings;

  return listings.filter((listing) => toText(listing.type) === normalizedType);
};

export const filterByBeds = (listings, beds) => {
  const minimumBeds = normalizeNumber(beds);
  if (minimumBeds === null || minimumBeds <= 0) return listings;

  return listings.filter((listing) => listing.beds >= minimumBeds);
};

export const filterByArea = (listings, area) => {
  const normalizedArea = toText(area);
  if (!normalizedArea || normalizedArea === "all") return listings;

  return listings.filter((listing) => toText(listing.area) === normalizedArea);
};

export const searchByLocation = (listings, query) => {
  const normalizedQuery = toText(query);
  if (!normalizedQuery) return listings;

  return listings.filter((listing) =>
    [listing.location, listing.area].some((value) =>
      isFuzzyMatch(value, normalizedQuery)
    )
  );
};

export const searchListings = (listings, query) => {
  const normalizedQuery = toText(query);
  if (!normalizedQuery) return listings;

  return listings.filter((listing) =>
    [listing.title, listing.location, listing.area, listing.type, listing.description].some(
      (value) => isFuzzyMatch(value, normalizedQuery)
    )
  );
};

export const applyPropertyFilters = (listings, filters = {}) => {
  const filteredByType = filterByType(listings, filters.type);
  const filteredByArea = filterByArea(filteredByType, filters.area);
  const filteredByBeds = filterByBeds(filteredByArea, filters.beds);
  const filteredByPrice = filterByPrice(
    filteredByBeds,
    filters.minPrice,
    filters.maxPrice
  );

  return searchListings(filteredByPrice, filters.query);
};

export const usePropertyFilter = (listings, filters) =>
  useMemo(() => applyPropertyFilters(listings, filters), [listings, filters]);
