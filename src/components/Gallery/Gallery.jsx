"use client";

import "./Gallery.css";
import mediaRooms from "./items";

import { useState } from "react";
import { FiGrid, FiList } from "react-icons/fi";

export default function Gallery() {
  const [viewMode, setViewMode] = useState("grid");
  const isGrid = viewMode === "grid";

  return (
    <section className="media-rooms-page" aria-labelledby="media-rooms-title">
      <div className="media-rooms-shell">
        <header className="media-rooms-header">
          <div className="media-rooms-header-copy">
            <p>Verified buyer access</p>
            <h1 id="media-rooms-title">Private Media Rooms</h1>
            <span>
              A calmer preview archive for residence details, material studies,
              and lifestyle references. Address-specific media is shared only
              after consultation.
            </span>
          </div>
          <div className="media-rooms-controls" aria-label="Gallery view mode">
            <button
              type="button"
              className={isGrid ? "active" : ""}
              aria-pressed={isGrid}
              onClick={() => setViewMode("grid")}
            >
              <FiGrid aria-hidden="true" />
              Grid
            </button>
            <button
              type="button"
              className={!isGrid ? "active" : ""}
              aria-pressed={!isGrid}
              onClick={() => setViewMode("list")}
            >
              <FiList aria-hidden="true" />
              List
            </button>
          </div>
        </header>

        <div className={`media-rooms-${viewMode}`}>
          {mediaRooms.map((room) => (
            <article className="media-room" key={room.id}>
              <div className="media-room-image">
                <img src={room.image} alt={room.alt} />
              </div>
              <div className="media-room-content">
                <div>
                  <p>{room.category}</p>
                  <h2>{room.title}</h2>
                </div>
                <p className="media-room-description">{room.description}</p>
                <div className="media-room-meta">
                  <span>{room.area}</span>
                  <span>{room.access}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
