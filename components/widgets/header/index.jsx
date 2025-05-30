"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import menuItems from "@/data/menuItems";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileDropdowns, setOpenMobileDropdowns] = useState([]);

  const toggleMenu = (label) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  const toggleMobileDropdown = (label) => {
    if (openMobileDropdowns.includes(label)) {
      setOpenMobileDropdowns(
        openMobileDropdowns.filter((item) => item !== label)
      );
    } else {
      setOpenMobileDropdowns([...openMobileDropdowns, label]);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] text-[#222222] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href={"/"} className="text-2xl font-bold text-[#B71C1C]">
          Tekstil Firma
        </Link>

        {/* Mobil Menü Butonu */}
        <button
          className="md:hidden text-[#222222] focus:outline-none transition-transform duration-300 hover:text-[#B71C1C]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Mobil menüyü aç/kapa"
          style={{ rotate: mobileOpen ? "90deg" : "0deg" }}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Masaüstü Menü */}
        <nav className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => item.subItems && toggleMenu(item.label)}
              onMouseLeave={() => item.subItems && toggleMenu(null)}
            >
              <button
                onClick={() => item.subItems && toggleMenu(item.label)}
                className="hover:text-[#B71C1C] text-[#555555] transition-colors duration-300 flex items-center gap-1"
              >
                {item.label}
                {item.subItems && (
                  <svg
                    className="w-4 h-4 stroke-[#555555] group-hover:stroke-[#B71C1C] transition-colors duration-300"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </button>
              <AnimatePresence>
                {item.subItems && openMenu === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 bg-[#F5F5F5] text-[#555555] text-sm mt-2 rounded-md shadow-lg overflow-hidden z-50 min-w-[180px]"
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 hover:bg-[#B71C1C] hover:text-[#FFFFFF] transition-colors duration-300"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </div>

      {/* Mobil Menü */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden overflow-hidden bg-[#F5F5F5] px-4 pb-4 text-[#555555]"
          >
            {menuItems.map((item) => (
              <div key={item.label} className="mb-2">
                <button
                  onClick={() => toggleMobileDropdown(item.label)}
                  className="w-full flex justify-between items-center py-2 border-b border-[#E0E0E0] text-left text-base hover:text-[#B71C1C] transition-colors duration-300"
                >
                  <span>{item.label}</span>
                  {item.subItems && (
                    <svg
                      className={`w-4 h-4 ml-2 stroke-[#555555] transition-transform duration-300 ${
                        openMobileDropdowns.includes(item.label)
                          ? "rotate-180"
                          : ""
                      }`}
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </button>
                {item.subItems && openMobileDropdowns.includes(item.label) && (
                  <div className="pl-4 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block text-sm hover:text-[#B71C1C] transition-colors duration-300"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
