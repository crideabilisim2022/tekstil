"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/language-context"; // Kendi dil yönetimini kullanıyorsan

// Sertifikalar listesi (her dilde farklı olabilir, burada örnek olarak aynısı)
const certificatesData = {
  tr: ["ISO 9001", "CE", "OEKO-TEX", "ISO 14001", "GOTS", "BSCI"],
  en: ["ISO 9001", "CE", "OEKO-TEX", "ISO 14001", "GOTS", "BSCI"],
};

// Dünya üzerindeki ülke noktaları sabit, değiştirmedik
const countryPoints = Array.from({ length: 41 }, (_, i) => ({
  id: i,
  cx: Math.random() * 780 + 10,
  cy: Math.random() * 380 + 10,
}));

function Carousel({ items }) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        }}
      >
        {duplicatedItems.map((item, i) => (
          <motion.div
            key={i}
            className="min-w-[160px] h-28 flex flex-col items-center justify-center p-4 border rounded-lg shadow-sm bg-white cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <ShieldCheck className="text-red-600 mb-2" />
            <span className="text-sm font-medium text-gray-800">{item}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function DotWorldMap() {
  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="dots"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="#cbd5e1" />
        </pattern>
      </defs>
      <rect width="800" height="400" fill="url(#dots)" />
      {countryPoints.map(({ id, cx, cy }) => (
        <motion.circle
          key={id}
          cx={cx}
          cy={cy}
          r={4}
          fill="#ef4444"
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: [0.5, 1, 0.5],
            transition: {
              repeat: Infinity,
              duration: 2,
              delay: id * 0.1,
            },
          }}
        />
      ))}
    </svg>
  );
}

export default function CertificatesExportSection() {
  const { language } = useLanguage();
  const certificates = certificatesData[language] || certificatesData.tr;
  const [count, setCount] = useState(0);
  const targetCount = 41;

  useEffect(() => {
    if (count < targetCount) {
      const timeout = setTimeout(() => setCount(count + 1), 10);
      return () => clearTimeout(timeout);
    }
  }, [count]);

  // Çok dilli metinler
  const texts = {
    tr: {
      title: "Kalite Belgelerimiz",
      description:
        "Üretimimiz, uluslararası standartlarda kalite belgeleriyle belgelenmiştir.",
      exportText: "+{count} Ülkeye İhracat",
      exportDescription:
        "Kaliteli üretimimiz ile global pazarlarda yer alıyoruz. Her geçen gün daha fazla ülkeye ulaşıyoruz.",
    },
    en: {
      title: "Our Quality Certificates",
      description:
        "Our production is certified with international quality standards.",
      exportText: "+{count} Countries Export",
      exportDescription:
        "With our quality production, we are present in global markets. We reach more countries every day.",
    },
  };

  const t = texts[language] || texts.tr;

  return (
    <section className="relative bg-white py-28 px-6 overflow-hidden">
      {/* Dünya Haritası Arka Plan */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <DotWorldMap />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Kalite Belgeleri Carousel */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.title}</h2>
          <p className="text-gray-600 mb-8">{t.description}</p>

          <Carousel items={certificates} />
        </div>

        {/* İhracat Kartı */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ rotateY: 12, rotateX: 6, scale: 1.06 }}
          style={{ perspective: "1000px" }}
          className="relative bg-transparent border border-gray-100 rounded-3xl p-10 text-center flex flex-col items-center justify-center space-y-6 cursor-pointer overflow-hidden"
        >
          {/* Parlak Gradient Arkaplan efekti */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-white to-red-50 opacity-30 rounded-3xl pointer-events-none" />

          {/* Parlayan Globe Icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            <Globe size={58} className="text-red-600 drop-shadow-md" />
          </motion.div>

          <h3 className="text-4xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
            {t.exportText.replace("{count}", count)}
          </h3>

          <p className="text-gray-700 max-w-xs text-base leading-relaxed">
            {t.exportDescription}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
