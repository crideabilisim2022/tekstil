"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import menuColumnsData from "@/data/menuColumns";
import { useLanguage } from "@/context/language-context";

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
  const { language } = useLanguage();

  // Eğer language henüz gelmemişse hiçbir şey render etme
  if (!language || !menuColumnsData[language]) return null;

  const texts = {
    tr: {
      companyName: "Tekstil Firma",
      companyDescription:
        "Türkiye'nin lider tekstil firması. Kalite ve güvenle hizmet veriyoruz.",
      contactTitle: "İletişim",
      address: "Adres: Atatürk Cad. No:123, İstanbul, Türkiye",
      phoneLabel: "Telefon:",
      phoneNumber: "+90 212 345 67 89",
      emailLabel: "Email:",
      email: "info@tekstilfirma.com",
      privacyPolicy: "Gizlilik Politikası",
      copyright: "Tüm hakları saklıdır.",
    },
    en: {
      companyName: "Textile Company",
      companyDescription:
        "Turkey's leading textile company. We provide quality and reliable services.",
      contactTitle: "Contact",
      address: "Address: Atatürk St. No:123, Istanbul, Turkey",
      phoneLabel: "Phone:",
      phoneNumber: "+90 212 345 67 89",
      emailLabel: "Email:",
      email: "info@tekstilfirma.com",
      privacyPolicy: "Privacy Policy",
      copyright: "All rights reserved.",
    },
  };

  const t = texts[language] || texts.tr;
  const menuColumns = menuColumnsData[language] || [];

  return (
    <footer className="bg-white text-[#222222] pt-10 pb-6 select-none">
      <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
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
              {t.companyName}
            </h2>
            <p className="text-[#555555] max-w-sm mx-auto md:mx-0">
              {t.companyDescription}
            </p>
          </motion.div>

          {/* Menü Sütunları */}
          {menuColumns.length > 0 && (
            <motion.div
              key={language}
              className="flex justify-center md:justify-start gap-16 flex-wrap md:flex-nowrap md:flex-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
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
          )}

          {/* İletişim */}
          <motion.div
            className="mt-8 md:mt-0 md:flex-1 max-w-sm mx-auto md:mx-0"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold mb-4 text-[#222222]">
              {t.contactTitle}
            </h3>
            <address className="not-italic text-[#555555] space-y-2">
              <p>{t.address}</p>
              <p>
                {t.phoneLabel}{" "}
                <a
                  href={`tel:${t.phoneNumber.replace(/ /g, "")}`}
                  className="hover:text-[#B71C1C]"
                >
                  {t.phoneNumber}
                </a>
              </p>
              <p>
                {t.emailLabel}{" "}
                <a href={`mailto:${t.email}`} className="hover:text-[#B71C1C]">
                  {t.email}
                </a>
              </p>
            </address>

            {/* Sosyal Medya */}
            <div className="flex justify-center md:justify-start mt-6 gap-6">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#555555] hover:text-[#B71C1C] transition-colors duration-300"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.15, duration: 0.2 }}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Alt Kısım */}
      <div className="border-t border-[#E0E0E0] mt-10 pt-6 text-[#555555] text-center text-sm">
        © {new Date().getFullYear()} {t.companyName}. {t.copyright}{" "}
        <Link href="/privacy" className="hover:text-[#B71C1C]">
          {t.privacyPolicy}
        </Link>
      </div>
    </footer>
  );
}
