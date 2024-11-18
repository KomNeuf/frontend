export const brandContent = [
  {
    id: 1,
    name: "adidas",
    imgSrc: "/brand-logo-img/adidas.webp",
  },
  {
    id: 2,
    name: "zara",
    imgSrc: "/brand-logo-img/zara.webp",
  },
  {
    id: 3,
    name: "mango",
    imgSrc: "/brand-logo-img/mango.webp",
  },
  {
    id: 8,
    name: "tommy",
    imgSrc: "/brand-logo-img/tommy.svg",
  },
  {
    id: 4,
    name: "shein",
    imgSrc: "/brand-logo-img/shine.png",
  },

  {
    id: 5,
    name: "nike",
    imgSrc: "/brand-logo-img/nike.jpg",
  },
  {
    id: 6,
    name: "puma",
    imgSrc: "/brand-logo-img/puma.webp",
  },

  {
    id: 7,
    name: "Ralph",
    imgSrc: "/brand-logo-img/raplh.jpg",
  },
];

export const categoryLgContent = [
  {
    name: "digital",
    title: "digitalCategoryTitle",
    description: "digitalCategoryDescription",
    styles: {
      backgroundColor: "var(--digital-category-bgc)",
      flexDirection: "row",
      paddingBlock: "2rem",
      paddingInline: "1rem",
      gridRow: "span 6 / span 6",
      gridColumn: "span 3 / span 3",
    },
    mobileStyles: {
      backgroundColor: "var(--digital-category-bgc)",
      flexDirection: "column",
      padding: "1rem",
      gridRow: "auto",
      gridColumn: "auto",
    },
    href: "/digital",
    imgSrc: "/category-img/accessories.png",
    imgWidth: 200,
    imgHeight: 220,
  },
  {
    name: "fashion",
    title: "fashionCategoryTitle",
    description: "fashionCategoryDescription",
    styles: {
      backgroundColor: "var(--fashion-category-bgc)",
      flexDirection: "row",
      paddingInline: "1rem",
      paddingBlock: "unset",
      gridRow: "span 6 / span 6",
      gridColumn: "span 3 / span 3",
    },
    mobileStyles: {
      backgroundColor: "var(--fashion-category-bgc)",
      flexDirection: "column",
      padding: "1rem",
      gridRow: "auto",
      gridColumn: "auto",
    },
    href: "/fashion",
    imgSrc: "/category-img/fashion-category.webp",
    imgWidth: 220,
    imgHeight: 230,
  },
  {
    name: "beauty",
    title: "beautyCategoryTitle",
    description: "beautyCategoryDescription",
    styles: {
      backgroundColor: "var(--beauty-category-bgc)",
      flexDirection: "row",
      paddingInline: "1rem",
      paddingBlock: "0.5rem",
      gridRow: "span 3 / span 3",
      gridColumn: "span 3 / span 3",
    },
    mobileStyles: {
      backgroundColor: "var(--beauty-category-bgc)",
      flexDirection: "column",
      padding: "1rem",
      gridRow: "auto",
      gridColumn: "auto",
    },
    href: "/beauty",
    imgSrc: "/category-img/beauty-category.webp",
    imgWidth: 170,
    imgHeight: 150,
  },
  {
    name: "sport",
    title: "sportCategoryTitle",
    description: "sportCategoryDescription",
    styles: {
      backgroundColor: "var(--sport-category-bgc)",
      flexDirection: "row-reverse",
      paddingInline: "unset",
      paddingBlock: "0.5rem",
      gridRow: "span 3 / span 3",
      gridColumn: "span 3 / span 3",
    },
    mobileStyles: {
      backgroundColor: "var(--sport-category-bgc)",
      flexDirection: "column",
      gridRow: "auto",
      padding: "1rem",
      gridColumn: "auto",
    },
    href: "/sport",
    imgSrc: "/category-img/sport-category.webp",
    imgWidth: 130,

    imgHeight: 150,
  },
  {
    name: "house",
    title: "houseCategoryTitle",
    description: "houseCategoryDescription",
    styles: {
      backgroundColor: "var(--house-category-bgc)",
      flexDirection: "row",
      paddingInline: "1rem",
      paddingBlock: "unset",
      gridRow: "span 2 / span 2",
      gridColumn: "span 5 / span 5",
    },
    mobileStyles: {
      backgroundColor: "var(--house-category-bgc)",
      flexDirection: "column",
      padding: "1rem",
      gridRow: "auto",
      gridColumn: "auto",
    },
    href: "/house",
    imgSrc: "/category-img/baby-care.png",
    imgWidth: 320,
    imgHeight: 240,
  },
  {
    name: "toy",
    title: "toyCategoryTitle",
    description: "toyCategoryDescription",
    styles: {
      backgroundColor: "var(--toy-category-bgc)",
      flexDirection: "column",
      paddingInline: "0.5rem",
      paddingBlock: "0.5rem",
      textAlign: "center",
      gridRow: "span 2 / span 2",
      gridColumn: "span 2 / span 2",
    },
    mobileStyles: {
      backgroundColor: "var(--toy-category-bgc)",
      flexDirection: "column",
      gridRow: "auto",
      padding: "1rem",
      gridColumn: "auto",
    },
    href: "/toy",
    imgSrc: "/category-img/toy-category.webp",
    imgWidth: 130,
    imgHeight: 110,
  },
  {
    name: "stationery",
    title: "stationeryCategoryTitle",
    description: "stationeryCategoryDescription",
    styles: {
      backgroundColor: "var(--stationery-category-bgc)",
      flexDirection: "row",
      paddingInline: "0.75rem",
      paddingBlock: "unset",
      gridRow: "span 2 / span 2",
      gridColumn: "span 2 / span 2",
    },
    mobileStyles: {
      backgroundColor: "var(--stationery-category-bgc)",
      flexDirection: "column",
      padding: "1rem",
      gridRow: "auto",
      gridColumn: "auto",
    },
    href: "/stationery",
    imgSrc: "/category-img/stationery-category.webp",
    imgWidth: 130,
    imgHeight: 150,
  },
];

export const sliderContent = [
  {
    ID: 1,
    title: "digitalBT",
    description: "digitalBD",
    bgImg: "url('/slider-img/digital-banner.webp')",
    url: "/",
  },
  {
    ID: 2,
    title: "stationeryBT",
    description: "stationeryBD",
    bgImg: "url('/slider-img/stationery-banner.webp')",
    url: "/",
  },
  {
    ID: 3,
    title: "toyBT",
    description: "toyBD",
    bgImg: "url('/slider-img/toy-banner.webp')",
    url: "/",
  },
  {
    ID: 4,
    title: "houseBT",
    description: "houseBD",
    bgImg: "url('/slider-img/house-banner.webp')",
    url: "/",
  },
  {
    ID: 5,
    title: "fashionBT",
    description: "fashionBD",
    bgImg: "url('/slider-img/fashion-banner.webp')",
    url: "/",
  },
  {
    ID: 6,
    title: "beautyBT",
    description: "beautyBD",
    bgImg: "url('/slider-img/beauty-banner.webp')",
    url: "/",
  },
];

export const brands = [
  "Other brands",
  "Zara",
  "H&M",
  "Nike",
  "Adidas",
  "Uniqlo",
  "Louis Vuitton",
  "Gucci",
  "Chanel",
  "Prada",
  "Burberry",
  "Ralph Lauren",
  "Hermès",
  "Versace",
  "Dolce & Gabbana",
  "Calvin Klein",
  "Tommy Hilfiger",
  "Under Armour",
  "Levi's",
  "Supreme",
  "Balenciaga",
  "Fendi",
  "Valentino",
  "Off-White",
  "Givenchy",
  "Michael Kors",
  "Puma",
  "Lacoste",
  "The North Face",
  "Moncler",
  "Patagonia",
  "Diesel",
  "Saint Laurent",
  "Armani",
  "Lululemon",
  "Vans",
  "Reebok",
  "Converse",
  "ASOS",
  "Mango",
  "Massimo Dutti",
  "Abercrombie & Fitch",
  "Hollister",
  "Gap",
  "Old Navy",
  "J.Crew",
  "Forever 21",
  "Urban Outfitters",
  "Boohoo",
  "River Island",
  "Banana Republic",
  "Topshop",
  "Victoria's Secret",
  "Kate Spade",
  "Coach",
  "Alexander McQueen",
  "Balmain",
  "Ted Baker",
  "Brooks Brothers",
  "True Religion",
  "American Eagle",
  "A.P.C.",
  "Bape",
  "Loro Piana",
  "Tory Burch",
  "Reiss",
  "Brioni",
  "Hugo Boss",
  "Ermenegildo Zegna",
  "Stone Island",
  "Champion",
  "Carhartt",
  "Stüssy",
  "Levi Strauss & Co.",
  "Guess",
  "Diesel Black Gold",
  "Rains",
  "New Balance",
  "Skechers",
  "Quiksilver",
  "Billabong",
  "O'Neill",
  "Jack & Jones",
  "AllSaints",
  "UGG",
  "Timberland",
  "Dockers",
  "Wrangler",
  "Lee",
  "Columbia Sportswear",
  "Canada Goose",
  "Helly Hansen",
  "Salomon",
  "Ecco",
  "Gant",
  "Superdry",
  "Paul Smith",
  "Abercrombie",
  "Juicy Couture",
  "Rag & Bone",
  "Fear of God",
  "Kith",
  "A Bathing Ape",
  "Maison Margiela",
  "Jacquemus",
  "Pull & Bear",
  "Shein",
  "Marwa",
];
