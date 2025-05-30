"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Tekstil Sektöründe Lider",
    subtitle: "Kalite ve Güvenle Üretim Yapıyoruz",
    image: "/img/hero/slider1.jpg",
  },
  {
    id: 2,
    title: "Modern Tasarımlar",
    subtitle: "Yenilikçi ve Şık Koleksiyonlar",
    image: "/img/hero/slider2.jpg",
  },
  {
    id: 3,
    title: "Sürdürülebilir Üretim",
    subtitle: "Doğa Dostu Malzemeler ve Teknolojiler",
    image: "/img/hero/slider3.jpg",
  },
];

const variants = {
  enter: (direction) => ({
    rotateY: direction > 0 ? 90 : -90,
    rotateX: direction > 0 ? 20 : -20,
    opacity: 0,
  }),
  center: {
    rotateY: 0,
    rotateX: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    rotateY: direction < 0 ? 90 : -90,
    rotateX: direction < 0 ? 20 : -20,
    opacity: 0,
  }),
};

export default function HeroSlider() {
  const [[page, direction], setPage] = useState([0, 0]);
  const timeoutRef = useRef(null);

  const paginate = (newDirection) => {
    setPage(([currentPage]) => {
      let newPage = currentPage + newDirection;
      if (newPage < 0) newPage = slides.length - 1;
      else if (newPage >= slides.length) newPage = 0;
      return [newPage, newDirection];
    });
  };

  // Otomatik geçiş için useEffect
  useEffect(() => {
    // Önce eski timer varsa temizle
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      paginate(1);
    }, 5000); // 5 saniye

    // Cleanup
    return () => clearTimeout(timeoutRef.current);
  }, [page]);

  return (
    <section className="relative w-full h-screen overflow-hidden select-none perspective-[1500px]">
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={slides[page].id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.3, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[page].image}
              alt={slides[page].title}
              fill
              className="object-cover object-center"
              priority
              draggable={false}
            />
            <div className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-20 lg:px-40 text-white">
              <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg max-w-xl leading-tight">
                {slides[page].title}
              </h1>
              <p className="mt-4 text-lg md:text-2xl max-w-lg drop-shadow-md">
                {slides[page].subtitle}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Sol Ok */}
      <button
        onClick={() => paginate(-1)}
        aria-label="Previous Slide"
        className="absolute top-1/2 left-8 -translate-y-1/2 rounded-full bg-white bg-opacity-30 hover:bg-opacity-60 p-3 text-black transition cursor-pointer hover:scale-110"
      >
        <ChevronLeft size={32} />
      </button>

      {/* Sağ Ok */}
      <button
        onClick={() => paginate(1)}
        aria-label="Next Slide"
        className="absolute top-1/2 right-8 -translate-y-1/2 rounded-full bg-white bg-opacity-30 hover:bg-opacity-60 p-3 text-black transition cursor-pointer hover:scale-110"
      >
        <ChevronRight size={32} />
      </button>

      {/* Noktalar */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-4">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setPage([idx, idx > page ? 1 : -1])}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-4 h-4 rounded-full transition cursor-pointer ${
              idx === page ? "bg-red-600" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
