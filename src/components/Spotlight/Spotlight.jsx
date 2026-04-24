"use client";
import "./Spotlight.css";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Spotlight = () => {
  const spotlightRef = useRef(null);
  const titlesContainerRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const spotlightHeaderRef = useRef(null);
  const titlesContainerElementRef = useRef(null);
  const introTextElementsRef = useRef([]);
  const imageElementsRef = useRef([]);
  const titleElementsRef = useRef([]);
  const currentActiveIndexRef = useRef(0);
  const scrollTriggerRef = useRef(null);

  // NOTE: These values are interconnected - when speed changes, it affects when images finish their movement, which also affects the gap between images. When you change the number of items in spotlightItems array, you'll need to adjust these config settings together. Test different combinations until you find the right balance that looks good.
  const config = {
    gap: 0.08,
    speed: 0.3,
    arcRadius: 500,
  };

  const spotlightItems = [
    {
      name: "Malibu Oceanfront",
      img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1400&q=85",
    },
    {
      name: "Aspen Glass House",
      img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=85",
    },
    {
      name: "Hudson Penthouse",
      img: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1400&q=85",
    },
    {
      name: "Paradise Valley",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    },
    {
      name: "Lake Travis",
      img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
    },
    {
      name: "NoMad Loft",
      img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
    },
    {
      name: "Kiawah Preserve",
      img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1400&q=85",
    },
    {
      name: "Beverly Hills",
      img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=85",
    },
    {
      name: "Palm Beach",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
    },
    {
      name: "Napa Retreat",
      img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const initializeSpotlight = () => {
      const titlesContainer = titlesContainerRef.current;
      const imagesContainer = imagesContainerRef.current;
      const spotlightHeader = spotlightHeaderRef.current;
      const titlesContainerElement = titlesContainerElementRef.current;
      const introTextElements = introTextElementsRef.current;
      const imageElements = imageElementsRef.current;

      if (
        !titlesContainer ||
        !imagesContainer ||
        !spotlightHeader ||
        !titlesContainerElement
      ) {
        return false;
      }

      titlesContainer.innerHTML = "";
      imagesContainer.innerHTML = "";
      imageElements.length = 0;

      spotlightItems.forEach((item, index) => {
        const titleElement = document.createElement("h1");
        titleElement.textContent = item.name;
        if (index === 0) titleElement.style.opacity = "1";
        titlesContainer.appendChild(titleElement);

        const imgWrapper = document.createElement("div");
        imgWrapper.className = "spotlight-img";
        const imgElement = document.createElement("img");
        imgElement.src = item.img;
        imgElement.alt = "";
        imgWrapper.appendChild(imgElement);
        imagesContainer.appendChild(imgWrapper);
        imageElements.push(imgWrapper);
      });

      const titleElements = titlesContainer.querySelectorAll("h1");
      titleElementsRef.current = titleElements;

      if (titleElements.length === 0) {
        return false;
      }

      return true;
    };

    let initialized = initializeSpotlight();

    if (!initialized) {
      const initInterval = setInterval(() => {
        initialized = initializeSpotlight();
        if (initialized) {
          clearInterval(initInterval);
        }
      }, 10);

      setTimeout(() => {
        clearInterval(initInterval);
      }, 2000);
    }

    if (!initialized) {
      return;
    }

    const titlesContainer = titlesContainerRef.current;
    const imagesContainer = imagesContainerRef.current;
    const spotlightHeader = spotlightHeaderRef.current;
    const titlesContainerElement = titlesContainerElementRef.current;
    const introTextElements = introTextElementsRef.current;
    const imageElements = imageElementsRef.current;
    const titleElements = titleElementsRef.current;
    let currentActiveIndex = 0;

    const containerWidth = window.innerWidth * 0.3;
    const containerHeight = window.innerHeight;
    const arcStartX = containerWidth - 220;
    const arcStartY = -200;
    const arcEndY = containerHeight + 200;
    const arcControlPointX = arcStartX + config.arcRadius;
    const arcControlPointY = containerHeight / 2;

    function getBezierPosition(t) {
      const x =
        (1 - t) * (1 - t) * arcStartX +
        2 * (1 - t) * t * arcControlPointX +
        t * t * arcStartX;
      const y =
        (1 - t) * (1 - t) * arcStartY +
        2 * (1 - t) * t * arcControlPointY +
        t * t * arcEndY;
      return { x, y };
    }

    function getImgProgressState(index, overallProgress) {
      const startTime = index * config.gap;
      const endTime = startTime + config.speed;

      if (overallProgress < startTime) return -1;
      if (overallProgress > endTime) return 2;

      return (overallProgress - startTime) / config.speed;
    }

    imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: ".spotlight",
      start: "top top",
      end: `+=${window.innerHeight * 10}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress <= 0.2) {
          const animationProgress = progress / 0.2;

          const moveDistance = window.innerWidth * 0.6;
          gsap.set(introTextElements[0], {
            x: -animationProgress * moveDistance,
          });
          gsap.set(introTextElements[1], {
            x: animationProgress * moveDistance,
          });
          gsap.set(introTextElements[0], { opacity: 1 });
          gsap.set(introTextElements[1], { opacity: 1 });

          gsap.set(".spotlight-bg-img", {
            transform: `scale(${animationProgress})`,
          });
          gsap.set(".spotlight-bg-img img", {
            transform: `scale(${1.5 - animationProgress * 0.5})`,
          });

          imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
          spotlightHeader.style.opacity = "0";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        } else if (progress > 0.2 && progress <= 0.25) {
          gsap.set(".spotlight-bg-img", { transform: "scale(1)" });
          gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });

          gsap.set(introTextElements[0], { opacity: 0 });
          gsap.set(introTextElements[1], { opacity: 0 });

          imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
          spotlightHeader.style.opacity = "1";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });
        } else if (progress > 0.25 && progress <= 0.95) {
          gsap.set(".spotlight-bg-img", { transform: "scale(1)" });
          gsap.set(".spotlight-bg-img img", { transform: "scale(1)" });

          gsap.set(introTextElements[0], { opacity: 0 });
          gsap.set(introTextElements[1], { opacity: 0 });

          spotlightHeader.style.opacity = "1";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });

          const switchProgress = (progress - 0.25) / 0.7;
          const viewportHeight = window.innerHeight;
          const titlesContainerHeight = titlesContainer.scrollHeight;
          const startPosition = viewportHeight;
          const targetPosition = -titlesContainerHeight;
          const totalDistance = startPosition - targetPosition;
          const currentY = startPosition - switchProgress * totalDistance;

          gsap.set(".spotlight-titles", {
            transform: `translateY(${currentY}px)`,
          });

          imageElements.forEach((img, index) => {
            const imageProgress = getImgProgressState(index, switchProgress);

            if (imageProgress < 0 || imageProgress > 1) {
              gsap.set(img, { opacity: 0 });
            } else {
              const pos = getBezierPosition(imageProgress);
              gsap.set(img, {
                x: pos.x - 100,
                y: pos.y - 75,
                opacity: 1,
              });
            }
          });

          const viewportMiddle = viewportHeight / 2;
          let closestIndex = 0;
          let closestDistance = Infinity;

          titleElements.forEach((title, index) => {
            const titleRect = title.getBoundingClientRect();
            const titleCenter = titleRect.top + titleRect.height / 2;
            const distanceFromCenter = Math.abs(titleCenter - viewportMiddle);

            if (distanceFromCenter < closestDistance) {
              closestDistance = distanceFromCenter;
              closestIndex = index;
            }
          });

          if (closestIndex !== currentActiveIndex) {
            titleElements[currentActiveIndex].style.opacity = "0.35";
            titleElements[closestIndex].style.opacity = "1";
            document.querySelector(".spotlight-bg-img img").src =
              spotlightItems[closestIndex].img;
            currentActiveIndex = closestIndex;
          }
        } else if (progress > 0.95) {
          spotlightHeader.style.opacity = "0";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        }
      },
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, []);

  return (
    <section className="spotlight" ref={spotlightRef}>
      <div className="spotlight-inner">
        <div className="spotlight-intro-text-wrapper">
          <div
            className="spotlight-intro-text"
            ref={(el) => (introTextElementsRef.current[0] = el)}
          >
            <p>Private</p>
          </div>
          <div
            className="spotlight-intro-text"
            ref={(el) => (introTextElementsRef.current[1] = el)}
          >
            <p>Portfolio</p>
          </div>
        </div>
        <div className="spotlight-bg-img">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=85"
            alt=""
          />
        </div>
      </div>
      <div
        className="spotlight-titles-container"
        ref={titlesContainerElementRef}
      >
        <div className="spotlight-titles" ref={titlesContainerRef}></div>
      </div>
      <div className="spotlight-images" ref={imagesContainerRef}></div>
      <div className="spotlight-header" ref={spotlightHeaderRef}>
        <p>Markets</p>
      </div>
      <div className="spotlight-outline"></div>
    </section>
  );
};

export default Spotlight;
