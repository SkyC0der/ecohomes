import neighbourhoods from "@/data/neighbourhoods.json";

const requiredKeys = [
  "area",
  "safetyScore",
  "vibeTag",
  "amenities",
  "commuteTimes",
  "floodRisk",
  "powerSupply",
  "internet",
  "priceDirection",
  "bestFor",
];

const normalize = (value) => String(value ?? "").trim().toLowerCase();

export const getNeighbourhoods = () => [...neighbourhoods];

export const getNeighbourhoodData = (area) => {
  const normalizedArea = normalize(area);
  return (
    neighbourhoods.find((neighbourhood) => normalize(neighbourhood.area) === normalizedArea) ??
    null
  );
};

export const hasValidNeighbourhoodShape = (data) => {
  if (!data || typeof data !== "object") return false;
  if (!requiredKeys.every((key) => Object.hasOwn(data, key))) return false;

  return (
    typeof data.area === "string" &&
    typeof data.safetyScore === "number" &&
    data.safetyScore >= 0 &&
    data.safetyScore <= 10 &&
    typeof data.vibeTag === "string" &&
    Array.isArray(data.amenities) &&
    data.amenities.length > 0 &&
    data.commuteTimes &&
    typeof data.commuteTimes === "object" &&
    Object.keys(data.commuteTimes).length >= 3 &&
    typeof data.floodRisk === "string" &&
    typeof data.powerSupply === "string" &&
    typeof data.internet === "string" &&
    typeof data.priceDirection === "string" &&
    Array.isArray(data.bestFor) &&
    data.bestFor.length > 0
  );
};
