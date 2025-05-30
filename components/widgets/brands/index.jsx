"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const brands = [
  { src: "/img/brands/asos-logo.jpg", alt: "Nike" },
  { src: "/img/brands/disney-logo.jpg", alt: "Disney" },
  { src: "/img/brands/george-logo.jpg", alt: "George" },
  { src: "/img/brands/hm-logo.jpg", alt: "HM" },
  { src: "/img/brands/river-island_logo.jpg", alt: "River Island" },
  { src: "/img/brands/zara-logo.jpg", alt: "Zara" },
];

export default function BrandCarousel() {
  const duplicated = [...brands, ...brands]; // Sonsuz döngü efekti için

  return (
    <div className="overflow-hidden w-full bg-white py-10">
      <motion.div
        className="flex gap-16 animate-slide"
        initial={{ x: 0 }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        onHoverStart={(e) => e.stopPropagation()}
      >
        {duplicated.map((brand, index) => (
          <div
            key={index}
            className="min-w-[120px] flex items-center justify-center"
          >
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-24 h-24"
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                width={100}
                height={100}
                className="object-contain cursor-pointer"
              />
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
