type MenuItems = {
  title: string;
  items: string[];
}[];

type MenuData = { [key: string]: { title: string; items: MenuItems } };

export const menuData: MenuData = {
  newAndFeatured: {
    title: "Featured",
    items: [
      {
        title: "Featured",
        items: [
          "Shop All New Arrivals",
          "New Shoes",
          "New Clothing",
          "SNKRS Launch Calendar",
          "Buy 2, Get 25% Off",
          "Bestsellers",
        ],
      },
      {
        title: "Shop Icons",
        items: [
          "Air Force 1",
          "Air Jordan 1",
          "Air Max",
          "Dunk",
          "Blazer",
          "Pegasus",
          "Mercurial",
        ],
      },
      {
        title: "Best Reads",
        items: [
          ".Swoosh",
          "Jordan Collection",
          "Nike SB - The Vault",
          "Sustainability",
          "Trained Podcast - Body Positivity",
          "Never Done Making History - Tigerbelles",
          "Bust Through Any Mental Blocks",
        ],
      },
      {
        title: "Nike Stories",
        items: [
          "All Stories",
          "Athletes*",
          "Department of Nike Archives (DNA)",
          "Coaching",
          "Culture",
          "Innovation",
          "Community",
        ],
      },
    ],
  },
  men: {
    title: "Men",
    items: [
      {
        title: "Featured",
        items: [
          "New Releases",
          "SNKRS Launch Calendar",
          "Fleece Shop",
          "Buy 2, Get 25% Off",
          "Bestsellers",
        ],
      },
      {
        title: "Shoes",
        items: [
          "All Shoes",
          "Lifestyle",
          "Jordan",
          "Running",
          "Football",
          "Basketball",
          "Training and Gym",
          "Skateboarding",
          "Nike By You",
        ],
      },
      {
        title: "Clothing",
        items: [
          "All Clothing",
          "Hoodies and Sweatshirts",
          "Tracksuits",
          "Jackets",
          "Tops and T-Shirts",
          "Trousers and Tights",
          "Shorts",
          "Kits and Jerseys",
        ],
      },
      {
        title: "Shop By Sport",
        items: [
          "All Sports",
          "Running",
          "Football",
          "Basketball",
          "Training and Gym",
          "Tennis",
          "Golf",
        ],
      },
      {
        title: "Accessories and Equipment",
        items: ["All Accessories and Equipment", `Bags and Backpacks Socks`],
      },
    ],
  },
  women: {
    title: "Women",
    items: [
      {
        title: "Featured",
        items: [
          "New Releases",
          "SNKRS Launch Calendar",
          "Fleece Shop",
          "Buy 2, Get 25% Off",
          "Bestsellers",
        ],
      },
      {
        title: "Shoes",
        items: [
          "All Shoes",
          "Lifestyle",
          "Jordan",
          "Running",
          "Training and Gym",
          "Nike By You",
        ],
      },
      {
        title: "Clothing",
        items: [
          "All Clothing",
          "Hoodies and Sweatshirts",
          "Jackets",
          "Trousers",
          "Leggings",
          "Matching Sets",
          "Tops and T-Shirts",
          "Shorts",
          "Sports Bras",
          "Skirts and Dresses",
        ],
      },
      {
        title: "Shop By Sport",
        items: [
          "All Sports",
          "Running",
          "Training and Gym",
          "Tennis",
          "Football",
          "Yoga",
          "Dance",
        ],
      },
      {
        title: "Accessories and Equipment",
        items: ["All Accessories and Equipment", "Bags and Backpacks", "Socks"],
      },
    ],
  },
  kids: {
    title: "Kids",
    items: [
      {
        title: "Featured",
        items: [
          "New Releases",
          "Fleece Shop",
          "Buy 2, Get 25% Off",
          "Bestsellers",
        ],
      },
      {
        title: "Shoes",
        items: [
          "All Shoes",
          "Lifestyle",
          "Jordan",
          "Football",
          "Running",
          "Basketball",
        ],
      },
      {
        title: "Clothing",
        items: [
          "All Clothing",
          "Hoodies and Sweatshirts",
          "Tracksuits",
          "Trousers and Leggings",
          "Jackets",
          "Tops and T-Shirts",
          "Kits and Jerseys",
          "Sport Clothing",
          "Shorts",
          "Sports Bras",
          "Skirts and Dresses",
        ],
      },
      {
        title: "Kids by age",
        items: [
          "Older Kids (7 - 15 years)",
          "Younger Kids (3 - 7 years)",
          "Baby & Toddler (0-3 years)",
          "Accessories and Equipment",
          "All Accessories and Equipment",
          "Bags and Backpacks",
          "Hats",
        ],
      },
    ],
  },
  sale: {
    title: "Sale",
    items: [
      {
        title: "Sale & Offers",
        items: ["Shop All Sale", "Buy 2, Get 25% Off", "Bestsellers"],
      },
      {
        title: "Sale For Men",
        items: [
          "Shop All Sale Men's",
          "Shoes",
          "Clothing",
          "Accessories and Equipment",
        ],
      },
      {
        title: "Sale For Women",
        items: [
          "Shop All Sale Women's",
          "Shoes",
          "Clothing",
          "Accessories and Equipment",
          "Sale For Kids",
        ],
      },
      {
        title: "Sale For Kids",
        items: [
          "Shop All Sale Kids'",
          "Shoes",
          "Clothing",
          "Accessories and Equipment",
        ],
      },
      {
        title: "Sale By Sport",
        items: [
          "Running",
          "Football",
          "Gym and Training",
          "Basketball",
          "Tennis",
          "Golf",
          "Yoga",
        ],
      },
    ],
  },
};

type SearchResultData = {
  [key: string]: {
    image: string;
    title: string;
    category: string;
    price: string;
  }[];
};

export const searchResultData: SearchResultData = {
  "air force 1": [
    {
      image:
        "https://static.nike.com/a/images/t_default/dcc2e077-016b-49ec-aa6d-146f0704447a/air-force-1-tiffany-co-shoes.png",
      title: "Nike Air Force 1 x Tiffany & Co.",
      category: "Men's Shoes",
      price: "£359.95",
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-GjGXSP.png",
      title: `Nike Air Force 1 '07`,
      category: `Men's Shoe`,
      price: `£89.95`,
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/837bc402-8f0f-45b0-a06e-85bcf63e3a09/force-1-low-se-shoes-qQvsD6.png",
      title: `Nike Force 1 Low SE`,
      category: `Baby/Toddler Shoes`,
      price: `£54.95`,
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/bcb2b6ba-d1ca-4d89-bb4e-e03b086fc237/air-force-1-impact-next-nature-older-shoes-dHQR0C.png",
      title: `Nike Air Force 1 Impact Next Nature`,
      category: `Older Kids' Shoes`,
      price: `£79.95`,
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/f094af40-f82f-4fb9-a246-e031bf6fc411/air-force-1-07-shoe-QxRXZV.png",
      title: `Nike Air Force 1 '07`,
      category: `Women's Shoe`,
      price: `£109.95`,
    },
  ],
  "air max": [
    {
      image:
        "https://static.nike.com/a/images/t_default/17193449-e3dd-4ab7-a642-c5c6d1f2e866/air-max-90-ltr-shoes-jCCvpl.png",
      title: `Nike Air Max 90 LTR`,
      category: `Baby/Toddler Shoes`,
      price: `£49.95`,
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/06b754f8-09d3-4a15-a459-e37e955d6d08/air-max-tw-shoes-vzFVNk.png",
      title: `Nike Air Max TW`,
      category: `Men's Shoes`,
      price: `£144.95`,
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/awjogtdnqxniqqk0wpgf/air-max-270-shoes-Kqzbp7.png",
      title: `Nike Air Max 270`,
      category: `Men's Shoes`,
      price: `£144.95`,
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/pyyixbczj6u5kiwhpjik/air-max-270-shoes-P0j2DN.png",
      title: `Nike Air Max 270`,
      category: `Women's Shoes`,
      price: `£144.95`,
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/670ea51c-7684-4977-982f-8650148a83d4/air-max-95-shoes-FjSCcc.png",
      title: `Nike Air Max 95`,
      category: `Men's Shoes`,
      price: `£169.95`,
    },
  ],
  "air max 90": [
    {
      image:
        "https://static.nike.com/a/images/t_default/dcc2e077-016b-49ec-aa6d-146f0704447a/air-force-1-tiffany-co-shoes.png",
      title: "Nike Air Force 1 x Tiffany & Co.",
      category: "Men's Shoes",
      price: "£359.95",
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/b7d9211c-26e7-431a-ac24-b0540fb3c00f/air-force-1-07-shoes-GjGXSP.png",
      title: `Nike Air Force 1 '07`,
      category: `Men's Shoe`,
      price: `£89.95`,
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/837bc402-8f0f-45b0-a06e-85bcf63e3a09/force-1-low-se-shoes-qQvsD6.png",
      title: `Nike Force 1 Low SE`,
      category: `Baby/Toddler Shoes`,
      price: `£54.95`,
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/bcb2b6ba-d1ca-4d89-bb4e-e03b086fc237/air-force-1-impact-next-nature-older-shoes-dHQR0C.png",
      title: `Nike Air Force 1 Impact Next Nature`,
      category: `Older Kids' Shoes`,
      price: `£79.95`,
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/f094af40-f82f-4fb9-a246-e031bf6fc411/air-force-1-07-shoe-QxRXZV.png",
      title: `Nike Air Force 1 '07`,
      category: `Women's Shoe`,
      price: `£109.95`,
    },
  ],
  "air max 95": [
    {
      image:
        "https://static.nike.com/a/images/t_default/17193449-e3dd-4ab7-a642-c5c6d1f2e866/air-max-90-ltr-shoes-jCCvpl.png",
      title: `Nike Air Max 90 LTR`,
      category: `Baby/Toddler Shoes`,
      price: `£49.95`,
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/06b754f8-09d3-4a15-a459-e37e955d6d08/air-max-tw-shoes-vzFVNk.png",
      title: `Nike Air Max TW`,
      category: `Men's Shoes`,
      price: `£144.95`,
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/awjogtdnqxniqqk0wpgf/air-max-270-shoes-Kqzbp7.png",
      title: `Nike Air Max 270`,
      category: `Men's Shoes`,
      price: `£144.95`,
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/pyyixbczj6u5kiwhpjik/air-max-270-shoes-P0j2DN.png",
      title: `Nike Air Max 270`,
      category: `Women's Shoes`,
      price: `£144.95`,
    },
    {
      image:
        "https://static.nike.com/a/images/t_default/670ea51c-7684-4977-982f-8650148a83d4/air-max-95-shoes-FjSCcc.png",
      title: `Nike Air Max 95`,
      category: `Men's Shoes`,
      price: `£169.95`,
    },
  ],
};
