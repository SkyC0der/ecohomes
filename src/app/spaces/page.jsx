"use client";
import "./spaces.css";
import { useCallback, useEffect, useMemo, useRef, useState, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import Copy from "@/components/Copy/Copy";
import BookingModal from "@/features/booking/BookingModal";
import MyBookingsPanel from "@/features/booking/MyBookingsPanel";
import PropertyCard from "@/features/listings/PropertyCard";
import {
  getAllProperties,
  getFilteredProperties,
} from "@/features/listings/propertyService";
import SearchBar from "@/features/search/SearchBar";
import FilterPanel from "@/features/search/FilterPanel";

gsap.registerPlugin(ScrollTrigger);

const getFiltersFromSearchParams = (searchParams) => ({
  query: searchParams.get("query") ?? "",
  type: searchParams.get("type") ?? "",
  area: searchParams.get("area") ?? "",
  beds: searchParams.get("beds") ?? "",
  minPrice: searchParams.get("minPrice") ?? "",
  maxPrice: searchParams.get("maxPrice") ?? "",
});

const SpacesContent = () => {
  const spacesRef = useRef(null);
  const scrollTriggerInstances = useRef([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [refreshBookings, setRefreshBookings] = useState(0);

  const allProperties = useMemo(() => getAllProperties(), []);
  const filters = useMemo(
    () => getFiltersFromSearchParams(searchParams),
    [searchParams]
  );
  const filteredProperties = useMemo(
    () => getFilteredProperties(filters),
    [filters]
  );

  const cleanupScrollTriggers = () => {
    scrollTriggerInstances.current.forEach((instance) => {
      if (instance) instance.kill();
    });
    scrollTriggerInstances.current = [];
  };

  const setupAnimations = () => {
    cleanupScrollTriggers();

    if (!spacesRef.current) return;

    const spaces = spacesRef.current.querySelectorAll(".space");
    if (spaces.length === 0) return;

    spaces.forEach((space, index) => {
      gsap.set(space, {
        opacity: 0,
        scale: 0.75,
        y: 150,
      });

      if (index === 0) {
        gsap.to(space, {
          duration: 0.75,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          delay: 1.4,
        });
      } else {
        const trigger = ScrollTrigger.create({
          trigger: space,
          start: "top 100%",
          onEnter: () => {
            gsap.to(space, {
              duration: 0.75,
              y: 0,
              scale: 1,
              opacity: 1,
              ease: "power3.out",
            });
          },
        });

        scrollTriggerInstances.current.push(trigger);
      }
    });

    ScrollTrigger.refresh();
  };

  useEffect(() => {
    setupAnimations();

    const handleResize = () => {
      setupAnimations();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanupScrollTriggers();
    };
  }, [filteredProperties.length]);

  const updateFilter = useCallback(
    (key, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      const query = params.toString();
      console.info("[filters] updated", key, value);
      router.replace(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const clearFilters = useCallback(() => {
    console.info("[filters] cleared");
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  return (
    <>
      <Nav />
      <div className="page spaces">
        <section className="spaces-header">
          <div className="container">
            <div className="prop-col"></div>
            <div className="prop-col">
              <Copy delay={1}>
                <h1>Private Listings</h1>
              </Copy>
              <div className="spaces-controls">
                <SearchBar
                  value={filters.query}
                  onChange={(value) => updateFilter("query", value)}
                />
                <FilterPanel
                  filters={filters}
                  onFilterChange={updateFilter}
                  onClear={clearFilters}
                  totalCount={allProperties.length}
                  resultCount={filteredProperties.length}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="spaces-list">
          <div className="container" ref={spacesRef}>
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onRequestViewing={setSelectedProperty}
                />
              ))
            ) : (
              <div className="spaces-empty">
                <h3>No Lagos properties match these filters.</h3>
                <button type="button" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
      <BookingModal
        property={selectedProperty}
        isOpen={Boolean(selectedProperty)}
        onClose={() => setSelectedProperty(null)}
        onBookingSaved={() => setRefreshBookings((value) => value + 1)}
      />
      <MyBookingsPanel refreshToken={refreshBookings} />
      <ConditionalFooter />
    </>
  );
};

const page = () => (
  <Suspense fallback={null}>
    <SpacesContent />
  </Suspense>
);

export default page;
