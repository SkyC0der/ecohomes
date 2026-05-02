"use client";

import "./NeighbourhoodsPage.css";

import { useMemo, useState } from "react";

import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Nav from "@/components/Nav/Nav";
import Copy from "@/components/Copy/Copy";
import NeighbourhoodInsightCard from "./NeighbourhoodInsightCard";
import { getNeighbourhoods } from "./neighbourhoodService";

const NeighbourhoodsPage = () => {
  const neighbourhoods = useMemo(() => getNeighbourhoods(), []);
  const [leftArea, setLeftArea] = useState("Lekki Phase 1");
  const [rightArea, setRightArea] = useState("Ikoyi");

  const left = neighbourhoods.find((item) => item.area === leftArea);
  const right = neighbourhoods.find((item) => item.area === rightArea);

  return (
    <>
      <Nav />
      <div className="page neighbourhoods-page">
        <section className="neighbourhoods-hero">
          <div className="container">
            <div className="neighbourhoods-col"></div>
            <div className="neighbourhoods-col">
              <Copy delay={0.85}>
                <h1>Lagos Neighbourhoods</h1>
              </Copy>
              <Copy delay={1}>
                <p className="lg">
                  Compare lifestyle signals, commute realities, and buyer fit
                  before shortlisting a private viewing.
                </p>
              </Copy>
            </div>
          </div>
        </section>
        <section className="neighbourhoods-compare">
          <div className="container">
            <div className="neighbourhood-selectors">
              <label>
                First area
                <select value={leftArea} onChange={(event) => setLeftArea(event.target.value)}>
                  {neighbourhoods.map((item) => (
                    <option key={item.area} value={item.area}>
                      {item.area}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Second area
                <select value={rightArea} onChange={(event) => setRightArea(event.target.value)}>
                  {neighbourhoods.map((item) => (
                    <option key={item.area} value={item.area}>
                      {item.area}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="neighbourhood-comparison-grid">
              <NeighbourhoodInsightCard data={left} />
              <NeighbourhoodInsightCard data={right} />
            </div>
          </div>
        </section>
      </div>
      <ConditionalFooter />
    </>
  );
};

export default NeighbourhoodsPage;
