"use client";

import "./SearchControls.css";

import { useEffect, useState } from "react";

const SearchBar = ({ value, onChange }) => {
  const [draft, setDraft] = useState(value ?? "");

  useEffect(() => {
    setDraft(value ?? "");
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (draft !== value) {
        console.info("[search] updating debounced query", draft);
        onChange(draft);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [draft, onChange, value]);

  return (
    <div className="property-search-bar">
      <label htmlFor="property-search">Search by area, title, or type</label>
      <input
        id="property-search"
        type="search"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder="Try Ikoyi, duplex, waterfront"
      />
    </div>
  );
};

export default SearchBar;
