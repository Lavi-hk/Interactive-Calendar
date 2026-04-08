"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

// Local hero images per month, uploaded to public/images
const MONTH_IMAGES: Record<number, { fileName: string; alt: string; credit: string }> = {
  0:  { fileName: "january.jpg", alt: "Snowy winter landscape", credit: "Snowy winter" },
  1:  { fileName: "february.jpg", alt: "Love blooms", credit: "Love blooms" },
  2:  { fileName: "march.jpg", alt: "Spring blossom branches", credit: "Spring blossom" },
  3:  { fileName: "april.jpg", alt: "April flowers", credit: "April flowers" },
  4:  { fileName: "may.jpg", alt: "May garden flowers", credit: "May garden" },
  5:  { fileName: "june.jpg", alt: "Summer beach", credit: "Sunny June" },
  6:  { fileName: "july.jpg", alt: "Sunny July", credit: "Summer beach" },
  7:  { fileName: "august.jpg", alt: "August mountains", credit: "August mountains" },
  8:  { fileName: "september.jpg", alt: "Autumn leaves", credit: "Autumn leaves" },
  9:  { fileName: "october.jpg", alt: "October fall colors", credit: "October fall colors" },
  10: { fileName: "november.jpg", alt: "November fog", credit: "November fog" },
  11: { fileName: "december.jpg", alt: "December snow", credit: "December snow" },
};

interface HeroImageProps {
  month: number;
  year: number;
}

export default function HeroImage({ month, year }: HeroImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const img = MONTH_IMAGES[month] ?? MONTH_IMAGES[0];
  const monthName = format(new Date(year, month, 1), "MMMM");
  const imageSrc = loadFailed ? "/images/placeholder.svg" : `/images/${img.fileName}`;

  useEffect(() => {
    setLoaded(false);
    setLoadFailed(false);
  }, [month, year]);

  return (
    <div className="hero-image-container">
      {/* Skeleton shimmer */}
      {!loaded && <div className="hero-skeleton" aria-hidden="true" />}

      <img
        src={imageSrc}
        alt={img.alt}
        className={`hero-img ${loaded ? "hero-img-loaded" : "hero-img-loading"}`}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!loadFailed) {
            setLoadFailed(true);
          }
          setLoaded(true);
        }}
        loading="eager"
      />

      {/* Gradient overlay with month label */}
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-label">
        <span className="hero-month">{monthName}</span>
        <span className="hero-year">{year}</span>
      </div>

      {/* Photo credit */}
      <p className="hero-credit">📷 {img.credit}</p>
    </div>
  );
}
