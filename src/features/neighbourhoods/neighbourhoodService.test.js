import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import {
  getNeighbourhoodData,
  getNeighbourhoods,
  hasValidNeighbourhoodShape,
} from "./neighbourhoodService";
import NeighbourhoodInsightCard from "./NeighbourhoodInsightCard";

describe("neighbourhoodService", () => {
  it("getNeighbourhoodData returns object with all required keys", () => {
    const data = getNeighbourhoodData("Ikoyi");

    expect(hasValidNeighbourhoodShape(data)).toBe(true);
  });

  it("safetyScore is a number between 0 and 10", () => {
    expect(
      getNeighbourhoods().every(
        (item) => typeof item.safetyScore === "number" && item.safetyScore >= 0 && item.safetyScore <= 10
      )
    ).toBe(true);
  });

  it("amenities array is non-empty", () => {
    expect(getNeighbourhoodData("Yaba").amenities.length).toBeGreaterThan(0);
  });

  it("commute times object has at least 3 destination keys", () => {
    expect(Object.keys(getNeighbourhoodData("Magodo").commuteTimes).length)
      .toBeGreaterThanOrEqual(3);
  });

  it("renderInsightCard renders without throwing", () => {
    render(
      React.createElement(NeighbourhoodInsightCard, {
        data: getNeighbourhoodData("Lekki Phase 1"),
      })
    );

    expect(screen.getByText("Lekki Phase 1")).toBeInTheDocument();
    expect(screen.getByText(/Family-friendly/i)).toBeInTheDocument();
  });
});
