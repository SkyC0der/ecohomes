"use client";
import "./index.css";
import "./preloader.css";
import { useRef, useState, useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

import Nav from "@/components/Nav/Nav";
import ConditionalFooter from "@/components/ConditionalFooter/ConditionalFooter";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import FeaturedProjects from "@/components/FeaturedProjects/FeaturedProjects";
import ClientReviews from "@/components/ClientReviews/ClientReviews";
import CTAWindow from "@/components/CTAWindow/CTAWindow";
import Copy from "@/components/Copy/Copy";

let isInitialLoad = true;
const HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2600&q=85";
gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

export default function Home() {
  const tagsRef = useRef(null);
  const [showPreloader] = useState(isInitialLoad);
  const [loaderAnimating, setLoaderAnimating] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  useEffect(() => {
    if (lenis) {
      if (loaderAnimating) {
        lenis.stop();
      } else {
        lenis.start();
      }
    }
  }, [lenis, loaderAnimating]);

  useGSAP(() => {
    if (!showPreloader) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setLoaderAnimating(true);

    if (reduceMotion) {
      gsap.set(".loader", { autoAlpha: 0, pointerEvents: "none" });
      setLoaderAnimating(false);
      return;
    }

    const loader = document.querySelector(".loader");
    const loaderBrand = document.querySelector(".loader-brand");
    const loaderMedia = document.querySelector(".loader-media");
    const loaderMediaImg = document.querySelector(".loader-media img");
    const loaderScrim = document.querySelector(".loader-media-scrim");
    const heroImg = document.querySelector(".hero .hero-bg img");

    if (
      !loader ||
      !loaderBrand ||
      !loaderMedia ||
      !loaderMediaImg ||
      !loaderScrim ||
      !heroImg
    ) {
      setLoaderAnimating(false);
      return;
    }

    const tileRect = loaderMedia.getBoundingClientRect();
    const tileWidth = tileRect.width;
    const tileHeight = tileRect.height;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.visualViewport?.height || window.innerHeight;
    const morphScale =
      Math.max(viewportWidth / tileWidth, viewportHeight / tileHeight) * 1.05;
    const morphOffsetX =
      viewportWidth / 2 - (tileRect.left + tileWidth / 2);
    const morphOffsetY =
      viewportHeight / 2 - (tileRect.top + tileHeight / 2);

    gsap.set(".loader-brand-word span", { yPercent: 115 });
    gsap.set(loaderMedia, {
      width: "3px",
      height: tileHeight,
      autoAlpha: 1,
      scale: 1,
      borderRadius: 0,
      transformOrigin: "center center",
    });
    gsap.set(loaderMediaImg, {
      scale: 1.24,
      transformOrigin: "center center",
    });
    gsap.set(heroImg, { scale: 1.08 });

    const tl = gsap.timeline({
      delay: 0.2,
      defaults: {
        ease: "hop",
      },
      onComplete: () => {
        gsap.set(loader, { autoAlpha: 0, pointerEvents: "none" });
        setLoaderAnimating(false);
      },
    });

    tl.to(".loader-brand-word span", {
      yPercent: 0,
      duration: 1.4,
      stagger: 0.12,
    })
      .to(
        loaderMedia,
        {
          width: tileWidth,
          duration: 1.05,
          ease: "power4.inOut",
          autoRound: false,
        },
        "<+=0.55"
      )
      .to(
        loaderMediaImg,
        {
          scale: 1.12,
          duration: 1.15,
          ease: "power3.out",
        },
        "<"
      )
      .to(
        ".loader-brand-word span",
        {
          yPercent: -115,
          duration: 1.0,
          stagger: {
            each: 0.06,
            from: "edges",
          },
        },
        "+=0.35"
      )
      .to(
        loaderMedia,
        {
          scale: morphScale,
          x: morphOffsetX,
          y: morphOffsetY,
          duration: 1.4,
          ease: "power4.inOut",
        },
        "<+=0.18"
      )
      .to(
        loaderMediaImg,
        {
          scale: 1,
          duration: 1.4,
          ease: "power3.inOut",
        },
        "<"
      )
      .to(
        loaderScrim,
        {
          opacity: 1,
          duration: 1.0,
          ease: "power2.inOut",
        },
        "<+=0.4"
      )
      .to(
        loader,
        {
          backgroundColor: "rgba(244, 243, 241, 0)",
          duration: 0.6,
          ease: "power2.out",
        },
        ">-0.05"
      )
      .to(
        loader,
        {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power1.out",
        },
        ">-0.1"
      )
      .to(
        heroImg,
        {
          scale: 1,
          duration: 1.8,
          ease: "power3.out",
        },
        "<"
      );
  }, [showPreloader]);

  useGSAP(
    () => {
      if (!tagsRef.current) return;

      const tags = tagsRef.current.querySelectorAll(".what-we-do-tag");
      gsap.set(tags, { opacity: 0, x: -40 });

      ScrollTrigger.create({
        trigger: tagsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(tags, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: tagsRef }
  );

  return (
    <>
      {showPreloader && (
        <div className="loader">
          <div className="loader-brand" aria-label="Eco Homes">
            <div className="loader-brand-word">
              <span>Eco</span>
            </div>
            <div className="loader-media">
              <img src={HERO_IMAGE_SRC} alt="" />
              <div className="loader-media-scrim" />
            </div>
            <div className="loader-brand-word">
              <span>Homes</span>
            </div>
          </div>
        </div>
      )}
      <Nav />
      <section className="hero">
        <div className="hero-bg">
          <img
            src={HERO_IMAGE_SRC}
            alt="Cinematic luxury estate at golden hour"
          />
        </div>
        <div className="hero-scrim"></div>
        <div className="hero-gradient"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-header">
              <Copy animateOnScroll={false} delay={showPreloader ? 4.15 : 0.85}>
                <h1>Private access to America&apos;s most exceptional homes</h1>
              </Copy>
            </div>
            <div className="hero-tagline">
              <Copy animateOnScroll={false} delay={showPreloader ? 4.3 : 1}>
                <p>
                  Eco Homes advises discerning buyers, sellers, and developers
                  through confidential luxury property acquisitions across
                  premier US markets.
                </p>
              </Copy>
            </div>
            <AnimatedButton
              label="View Private Listings"
              route="/spaces"
              animateOnScroll={false}
              delay={showPreloader ? 4.45 : 1.15}
            />
          </div>
        </div>
        <div className="hero-stats">
          <div className="container">
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.1}>
                  <h2>18</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.15}>
                  <p>Years advising luxury clients</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.2}>
                  <h2>$4.8B</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.25}>
                  <p>Closed and advised sales volume</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.3}>
                  <h2>640+</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.35}>
                  <p>Private residences represented</p>
                </Copy>
              </div>
            </div>
            <div className="stat">
              <div className="stat-count">
                <Copy delay={0.4}>
                  <h2>98%</h2>
                </Copy>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-info">
                <Copy delay={0.45}>
                  <p>Client satisfaction after closing</p>
                </Copy>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="what-we-do">
        <div className="container">
          <div className="what-we-do-header">
            <Copy delay={0.1}>
              <h1>
                <span className="spacer">&nbsp;</span>
                Eco Homes curates prime residences with the discretion of
                private banking, the eye of an architectural editor, and the
                urgency of a deal team.
              </h1>
            </Copy>
          </div>
          <div className="what-we-do-content">
            <div className="what-we-do-col">
              <Copy delay={0.1}>
                <p>Signature advisory</p>
              </Copy>

              <Copy delay={0.15}>
                <p className="lg">
                  Every mandate begins with a confidential brief, market
                  intelligence, and a clear acquisition or sale strategy. The
                  experience is highly edited, calm, and built around serious
                  decisions.
                </p>
              </Copy>
            </div>
            <div className="what-we-do-col">
              <div className="what-we-do-tags" ref={tagsRef}>
                <div className="what-we-do-tag">
                  <h3>Off-market</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Waterfront</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>New development</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Private tours</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Investor ready</h3>
                </div>
                <div className="what-we-do-tag">
                  <h3>Discreet sale</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="featured-projects-container">
        <div className="container">
          <div className="featured-projects-header-callout">
            <Copy delay={0.1}>
              <p>Featured private listings</p>
            </Copy>
          </div>
          <div className="featured-projects-header">
            <Copy delay={0.15}>
              <h2>Architectural homes selected for privacy, provenance, and long-term value</h2>
            </Copy>
          </div>
        </div>
        <FeaturedProjects />
      </section>
      <section className="client-reviews-container">
        <div className="container">
          <div className="client-reviews-header-callout">
            <p>Client confidence</p>
          </div>
          <ClientReviews />
        </div>
      </section>
      <section className="gallery-callout">
        <div className="container">
          <div className="gallery-callout-col">
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-1">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                  alt="Refined living room in a luxury residence"
                />
              </div>
              <div className="gallery-callout-img gallery-callout-img-2">
                <img
                  src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85"
                  alt="Modern estate exterior with manicured grounds"
                />
                <div className="gallery-callout-img-content">
                  <h3>120+</h3>
                  <p>Private Media Rooms</p>
                </div>
              </div>
            </div>
            <div className="gallery-callout-row">
              <div className="gallery-callout-img gallery-callout-img-3">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                  alt="Luxury kitchen and entertaining space"
                />
              </div>
              <div className="gallery-callout-img gallery-callout-img-4">
                <img
                  src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=85"
                  alt="Premium primary suite interior"
                />
              </div>
            </div>
          </div>
          <div className="gallery-callout-col">
            <div className="gallery-callout-copy">
              <Copy delay={0.1}>
                <h3>
                  Explore a curated visual archive of estates, penthouses, and
                  developer residences selected for architectural quality,
                  privacy, and lifestyle value.
                </h3>
              </Copy>
              <AnimatedButton label="Explore Gallery" route="blueprints" />
            </div>
          </div>
        </div>
      </section>
      <CTAWindow
        img="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=2200&q=85"
        header="Eco Homes"
        callout="Your next address should never feel public"
        description="Book a private consultation for confidential search, seller representation, or developer positioning across the luxury US market."
      />
      <ConditionalFooter />
    </>
  );
}
