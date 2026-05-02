import { describe, expect, it } from "vitest";

import properties from "@/data/properties.json";
import {
  getAllProperties,
  getFilteredProperties,
  getPropertyById,
  isValidPropertyListing,
} from "./propertyService";
import { GET as getProperties } from "@/app/api/properties/route";
import { GET as getProperty } from "@/app/api/properties/[id]/route";

describe("propertyService", () => {
  it("GET /api/properties returns an array of at least 20 listings", async () => {
    const response = await getProperties(new Request("http://localhost/api/properties"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThanOrEqual(20);
  });

  it("GET /api/properties/:id returns one property with full details", async () => {
    const response = await getProperty(
      new Request("http://localhost/api/properties/ikoyi-waterfront-penthouse"),
      { params: Promise.resolve({ id: "ikoyi-waterfront-penthouse" }) }
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.id).toBe("ikoyi-waterfront-penthouse");
    expect(isValidPropertyListing(body)).toBe(true);
  });

  it("GET /api/properties?type=Apartment filters server-side", async () => {
    const response = await getProperties(
      new Request("http://localhost/api/properties?type=Apartment")
    );
    const body = await response.json();

    expect(body.length).toBeGreaterThan(0);
    expect(body.every((item) => item.type === "Apartment")).toBe(true);
  });

  it("each listing has the required shape", () => {
    expect(properties.every(isValidPropertyListing)).toBe(true);
  });

  it("getAll, getById, and getFiltered expose listing data", () => {
    expect(getAllProperties().length).toBeGreaterThanOrEqual(20);
    expect(getPropertyById("lekki-phase-1-serviced-apartment")?.area).toBe(
      "Lekki Phase 1"
    );
    expect(getFilteredProperties({ type: "Land" }).every((item) => item.type === "Land"))
      .toBe(true);
  });
});
