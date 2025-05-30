"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import menuColumns from "@/data/menuColumns";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

export default function Footer() {
  const socialIcons = [
    { icon: <Facebook size={24} />, href: "https://facebook.com" },
    { icon: <Instagram size={24} />, href: "https://instagram.com" },
    { icon: <Twitter size={24} />, href: "https://twitter.com" },
    { icon: <Linkedin size={24} />, href: "https://linkedin.com" },
  ];

  return (
    <footer className="bg-white text-[#222222] pt-10 pb-6 select-none">
      <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
        {/* Üst Kısım */}
        <motion.div
          className="md:flex md:justify-between md:items-start gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Logo ve Kısa Açıklama */}
          <motion.div
            className="mb-8 md:mb-0 md:flex-1"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold text-[#B71C1C] mb-3">
              Tekstil Firma
            </h2>
            <p className="text-[#555555] max-w-sm mx-auto md:mx-0">
              Türkiye'nin lider tekstil firması. Kalite ve güvenle hizmet
              veriyoruz.
            </p>
          </motion.div>

          {/* Menü Sütunları */}
          <motion.div
            className="flex justify-center md:justify-start gap-16 flex-wrap md:flex-nowrap md:flex-1"
            variants={containerVariants}
          >
            {menuColumns.map(({ title, links }) => (
              <motion.div
                key={title}
                className="min-w-[120px]"
                variants={itemVariants}
              >
                <h3 className="text-lg font-semibold mb-4 text-[#222222]">
                  {title}
                </h3>
                <ul className="space-y-2">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-[#555555] hover:text-[#B71C1C] transition-colors duration-300"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* İletişim */}
          <motion.div
            className="mt-8 md:mt-0 md:flex-1 max-w-sm mx-auto md:mx-0"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold mb-4 text-[#222222]">
              İletişim
            </h3>
            <address className="not-italic text-[#555555] space-y-2">
              <p>Adres: Atatürk Cad. No:123, İstanbul, Türkiye</p>
              <p>
                Telefon:{" "}
                <a href="tel:+902123456789" className="hover:text-[#B71C1C]">
                  +90 212 345 67 89
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@tekstilfirma.com"
                  className="hover:text-[#B71C1C]"
                >
                  info@tekstilfirma.com
                </a>
              </p>
            </address>

            {/* Sosyal Medya */}
            <div className="flex justify-center md:justify-start mt-6 gap-6">
              {socialIcons.map(({ icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#555555] hover:text-[#B71C1C] transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.15, duration: 0.2 }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Alt Kısım */}
      <div className="border-t border-[#E0E0E0] mt-10 pt-6 text-[#555555] text-center text-sm">
        © {new Date().getFullYear()} Tekstil Firma. Tüm hakları saklıdır.{" "}
        <Link href="/privacy" className="hover:text-[#B71C1C]">
          Gizlilik Politikası
        </Link>
      </div>
    </footer>
  );
}
