"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CheckCircle, PenTool, Clock } from "lucide-react";

const features = [
  {
    id: 1,
    icon: CheckCircle,
    title: "Kalite",
    description:
      "Polat Tekstil kaliteden ödün vermeden tüm standartlara uygun üretimi ve doğru çalışma prensibi ile sektörde yerini almıştır.",
  },
  {
    id: 2,
    icon: PenTool,
    title: "Tasarım",
    description:
      "Profesyonel ekibimizle talep edilen her ürün için en doğru tasarım ve dizayn uzmanlığımız ile taçlanmaktadır.",
  },
  {
    id: 3,
    icon: Clock,
    title: "Termin",
    description:
      "Başlangıçtan itibaren aynı özenle çalışan kadromuz, termin konusundada müşteri hassasiyetini düşünerek ilerlemektedir.",
  },
];

// Sağdaki slider resimleri
const sliderImages = [
  "/img/hero/slider1.jpg",
  "/img/hero/slider2.jpg",
  "/img/hero/slider3.jpg",
];

const slideVariants = {
  enter: { opacity: 0, x: 50 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

export default function AboutSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 bg-gradient-to-r from-white via-gray-50 to-white rounded-lg shadow-lg">
      {/* Başlık ve alt çizgi */}
      <div className="max-w-xl mx-auto text-center mb-16">
        <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
          Biz Kimiz?
        </h2>
        <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mb-6"></div>
        <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
          Polat Tekstil olarak, sektöründe öncü, yenilikçi ve kaliteli üretim
          yapan bir firmayız.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* Sol Metin */}
        <div>
          <div className="space-y-12">
            {features.map(({ id, icon: Icon, title, description }) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: id * 0.3 }}
                className="flex items-start space-x-6 group cursor-default"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-red-100 group-hover:bg-red-200 transition-colors">
                  <Icon className="text-red-600 w-7 h-7 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                    {title}
                  </h3>
                  <p className="mt-2 text-gray-600 leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Buton */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: features.length * 0.3 + 0.3 }}
            className="mt-12"
          >
            <a
              href="/hakkimizda"
              className="inline-block bg-red-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-red-700 transition"
            >
              Daha Fazla Bilgi
            </a>
          </motion.div>
        </div>

        {/* Sağdaki slider */}
        <div className="relative w-full h-80 md:h-[28rem] rounded-xl overflow-hidden shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={sliderImages[current]}
                alt={`Biz Kimiz Slider ${current + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
                priority={current === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Hafif parıltı animasyonu */}
          <motion.div
            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </section>
  );
}
