const menuItems = [
  {
    label: "Kurumsal",
    labelEn: "Corporate",
    subItems: [
      { label: "Hakkımızda", labelEn: "About Us", href: "/about" },
      { label: "Vizyonumuz", labelEn: "Our Vision", href: "/vision" },
      {
        label: "Kalite Politikamız",
        labelEn: "Quality Policy",
        href: "/quality",
      },
    ],
  },
  {
    label: "Ürünler",
    labelEn: "Products",
    subItems: [
      {
        label: "Dokuma Kumaşlar",
        labelEn: "Woven Fabrics",
        href: "/products/woven",
      },
      {
        label: "Örme Kumaşlar",
        labelEn: "Knitted Fabrics",
        href: "/products/knit",
      },
    ],
  },
  {
    label: "Hizmetler",
    labelEn: "Services",
    href: "/services",
  },
  {
    label: "Sürdürülebilirlik",
    labelEn: "Sustainability",
    href: "/sustainability",
  },
  {
    label: "İletişim",
    labelEn: "Contact",
    href: "/contact",
  },
];

export default menuItems;
