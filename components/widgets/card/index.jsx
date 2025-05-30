"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    id: 1,
    image: "/img/hero/slider2.jpg",
    alt: "Kart 1",
    title: "Kart 1",
  },
  {
    id: 2,
    image: "/img/hero/slider3.jpg",
    alt: "Kart 2",
    title: "Kart 2",
  },
  {
    id: 3,
    image: "/img/hero/slider2.jpg",
    alt: "Kart 3",
    title: "Kart 3",
  },
  {
    id: 4,
    image: "/img/hero/slider3.jpg",
    alt: "Kart 4",
    title: "Kart 4",
  },
];

export default function CardsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {cards.map(({ id, image, alt, title }) => (
        <motion.div
          key={id}
          className="relative cursor-pointer rounded-lg overflow-hidden shadow-lg group"
          initial="rest"
          whileHover="hover"
          animate="rest"
          style={{ height: "400px" }} // yüksekliği sabitledik
        >
          {/* Resim */}
          <img
            src={image}
            alt={alt}
            className="w-full h-full object-cover"
            draggable={false}
          />

          {/* Başlangıçta hafif siyah overlay */}
          <motion.div
            className="absolute inset-0 bg-black"
            variants={{
              rest: { opacity: 0.5 },
              hover: { opacity: 0 },
            }}
            transition={{ duration: 0.4 }}
          />

          {/* Hover'da alttan çıkan yarı saydam kırmızı overlay (50% height) */}
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-red-700"
            style={{ height: "30%", mixBlendMode: "multiply" }}
            variants={{
              rest: { y: "100%", opacity: 0 },
              hover: { y: "0%", opacity: 0.5 },
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Sol altta başlık */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold drop-shadow-md z-20 pointer-events-none">
            {title}
          </div>

          {/* Ok ikonu sağ üstte */}
          <motion.div
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-red-700 flex items-center justify-center z-20 opacity-80"
            variants={{
              rest: { rotate: 45, x: 0 },
              hover: { rotate: 0, x: 6 },
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ArrowRight className="text-white w-6 h-6" />
          </motion.div>
        </motion.div>
      ))}
    </section>
  );
}
