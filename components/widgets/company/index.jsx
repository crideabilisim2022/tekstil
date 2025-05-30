"use client";

import { useEffect, useRef, useState } from "react";
import { Factory, Users, Loader2, Boxes } from "lucide-react";
import { motion } from "framer-motion";

const counters = [
  {
    id: 1,
    target: 400,
    suffix: " Adet",
    label: "Makina Parkuru",
    icon: Loader2,
  },
  {
    id: 2,
    target: 13000,
    suffix: " M2",
    label: "Fabrika Alanı",
    icon: Factory,
  },
  {
    id: 3,
    target: 600,
    suffix: " Kişi",
    label: "Profesyonel Ekip",
    icon: Users,
  },
  {
    id: 4,
    target: 1500000,
    suffix: " Adet",
    label: "Üretim Kapasitesi",
    icon: Boxes,
  },
];

export default function CounterSection() {
  const [values, setValues] = useState(counters.map(() => 0));
  const [isRunning, setIsRunning] = useState(false);

  const startCounting = () => {
    setIsRunning(true);
    counters.forEach((counter, index) => {
      let current = 0;
      const end = counter.target;
      const duration = 2000;
      const stepTime = 20;
      const step = Math.ceil(end / (duration / stepTime));

      const interval = setInterval(() => {
        current += step;
        if (current >= end) {
          current = end;
          clearInterval(interval);

          // Eğer tüm sayaçlar bitmişse kontrol et
          setTimeout(() => {
            if (index === counters.length - 1 && current === end) {
              setIsRunning(false); // Sayaçlar bitti
            }
          }, 0);
        }

        setValues((prev) => {
          const updated = [...prev];
          updated[index] = current;
          return updated;
        });
      }, stepTime);
    });
  };

  useEffect(() => {
    if (!isRunning) {
      const timer = setTimeout(() => {
        setValues(counters.map(() => 0));
        startCounting();
      }, 3000); // 3 saniye bekle
      return () => clearTimeout(timer);
    }
  }, [isRunning]);

  useEffect(() => {
    startCounting(); // Sayfa yüklendiğinde başlat
  }, []);

  return (
    <section className="bg-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {counters.map(({ id, suffix, label, icon: Icon }, index) => (
          <div
            key={id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition group"
          >
            {/* Hover ile sadece ikon hareket eder */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="text-red-600 mb-4 transition-transform duration-300"
            >
              <Icon size={40} />
            </motion.div>

            {/* Sayı hover ile hafif hareketlenir */}
            <motion.h2
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold text-gray-900 mb-2 transition-transform duration-300"
            >
              {values[index].toLocaleString("tr-TR")}
              <span className="text-lg font-semibold text-gray-600">
                {suffix}
              </span>
            </motion.h2>

            <p className="text-gray-700 font-medium text-lg">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
