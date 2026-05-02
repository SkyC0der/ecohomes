import properties from "@/data/properties.json";
import { applyPropertyFilters } from "@/features/search/usePropertyFilter";

export const PROPERTY_TYPES = [
  "Apartment",
  "Detached House",
  "Semi-detached",
  "Duplex",
  "Bungalow",
  "Land",
];

export const PROPERTY_AREAS = [
  "Lekki Phase 1",
  "Ikoyi",
  "Victoria Island",
  "Ajah",
  "Yaba",
  "Ikeja GRA",
  "Magodo",
];

const requiredKeys = [
  "id",
  "title",
  "type",
  "price",
  "beds",
  "baths",
  "sqft",
  "location",
  "area",
  "images",
  "description",
  "available",
  "coordinates",
];

export const formatNaira = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);

export const isValidPropertyListing = (listing) => {
  if (!listing || typeof listing !== "object") return false;
  if (!requiredKeys.every((key) => Object.hasOwn(listing, key))) return false;

  return (
    typeof listing.id === "string" &&
    typeof listing.title === "string" &&
    PROPERTY_TYPES.includes(listing.type) &&
    typeof listing.price === "number" &&
    typeof listing.beds === "number" &&
    typeof listing.baths === "number" &&
    typeof listing.sqft === "number" &&
    typeof listing.location === "string" &&
    typeof listing.area === "string" &&
    Array.isArray(listing.images) &&
    listing.images.length > 0 &&
    typeof listing.description === "string" &&
    typeof listing.available === "boolean" &&
    typeof listing.coordinates?.lat === "number" &&
    typeof listing.coordinates?.lng === "number"
  );
};

export const normalizePropertyFilters = (params = {}) => ({
  query: params.query ?? params.q ?? "",
  type: params.type ?? "",
  area: params.area ?? "",
  beds: params.beds ?? "",
  minPrice: params.minPrice ?? params.min ?? "",
  maxPrice: params.maxPrice ?? params.max ?? "",
});

export const getAllProperties = () => [...properties];

export const getPropertyById = (id) =>
  properties.find((property) => property.id === id) ?? null;

export const getFilteredProperties = (params = {}) =>
  applyPropertyFilters(getAllProperties(), normalizePropertyFilters(params));

const parseResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Property request failed with ${response.status}`);
  }

  return response.json();
};

export const getAll = async ({ fetcher = fetch } = {}) =>
  parseResponse(await fetcher("/api/properties"));

export const getById = async (id, { fetcher = fetch } = {}) =>
  parseResponse(await fetcher(`/api/properties/${id}`));

export const getFiltered = async (params = {}, { fetcher = fetch } = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(normalizePropertyFilters(params)).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });

  const query = searchParams.toString();
  return parseResponse(await fetcher(`/api/properties${query ? `?${query}` : ""}`));
};

export const propertyService = {
  getAll,
  getById,
  getFiltered,
};
