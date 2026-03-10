"use client";
import { useState, useEffect } from "react";

const images = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
  "/images/hero-4.jpg",
  "/images/hero-5.jpg",
];

const ImageSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
      <div className="relative w-[60%] md:w-[35%] aspect-square">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-contain"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              transition: "opacity 2s ease-in-out",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlideshow;
