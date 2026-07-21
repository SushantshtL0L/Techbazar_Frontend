export type ShowcaseProduct = {
  id: string;
  brand: string;
  name: string;
  specs: string;
  price: string;
  condition: string;
  conditionColor: string;
  img: string;
  category: string;
};

export const CATEGORY_LABELS: Record<string, string> = {
  phones: "Phones",
  "used-iphones": "Used iPhones",
  tablets: "Tablets",
  "new-drops": "New Drops",
  laptops: "Laptops",
  gaming: "Gaming",
  accessories: "Accessories",
  watches: "Watches",
  audio: "Audio Gear",
};

export const showcaseProducts: ShowcaseProduct[] = [
  {
    id: "showcase-1",
    brand: "APPLE",
    name: "iPhone 15 Pro Max",
    specs: "256GB • Natural Titanium",
    price: "1,85,000",
    condition: "Brand New",
    conditionColor: "bg-emerald-500",
    img: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?q=80&w=400&auto=format&fit=crop",
    category: "phones",
  },
  {
    id: "showcase-2",
    brand: "APPLE",
    name: "iPhone 14 Pro",
    specs: "128GB • Space Black",
    price: "1,20,000",
    condition: "Like New",
    conditionColor: "bg-blue-500",
    img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=400&auto=format&fit=crop",
    category: "used-iphones",
  },
  {
    id: "showcase-3",
    brand: "SAMSUNG",
    name: "Galaxy S24 Ultra",
    specs: "256GB • Titanium Gray",
    price: "1,45,000",
    condition: "Brand New",
    conditionColor: "bg-emerald-500",
    img: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=400&auto=format&fit=crop",
    category: "phones",
  },
  {
    id: "showcase-4",
    brand: "APPLE",
    name: "iPhone 13 Pro Max",
    specs: "256GB • Sierra Blue",
    price: "95,000",
    condition: "Good",
    conditionColor: "bg-gray-500",
    img: "https://images.unsplash.com/photo-1581795669633-91ef7c9699a8?q=80&w=400&auto=format&fit=crop",
    category: "used-iphones",
  },
  {
    id: "showcase-5",
    brand: "APPLE",
    name: "iPhone 12",
    specs: "64GB • Black",
    price: "65,000",
    condition: "Fair",
    conditionColor: "bg-yellow-500",
    img: "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?q=80&w=400&auto=format&fit=crop",
    category: "used-iphones",
  },
  {
    id: "showcase-6",
    brand: "SAMSUNG",
    name: "Galaxy A55",
    specs: "128GB • Awesome Ice Blue",
    price: "55,000",
    condition: "Brand New",
    conditionColor: "bg-emerald-500",
    img: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=400&auto=format&fit=crop",
    category: "phones",
  },
  {
    id: "showcase-7",
    brand: "APPLE",
    name: "iPad Pro 12.9",
    specs: "256GB • Wi-Fi + Cellular",
    price: "1,35,000",
    condition: "Like New",
    conditionColor: "bg-blue-500",
    img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=400&auto=format&fit=crop",
    category: "tablets",
  },
  {
    id: "showcase-8",
    brand: "SAMSUNG",
    name: "Galaxy Tab S9",
    specs: "128GB • Graphite",
    price: "85,000",
    condition: "Brand New",
    conditionColor: "bg-emerald-500",
    img: "https://images.unsplash.com/photo-1561154464-3d2b1e2f2b1b?q=80&w=400&auto=format&fit=crop",
    category: "tablets",
  },
  {
    id: "showcase-9",
    brand: "APPLE",
    name: "MacBook Air M3",
    specs: "16GB • 512GB SSD",
    price: "1,65,000",
    condition: "Brand New",
    conditionColor: "bg-emerald-500",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop",
    category: "laptops",
  },
  {
    id: "showcase-10",
    brand: "ASUS",
    name: "ROG Zephyrus G14",
    specs: "RTX 4060 • 16GB RAM",
    price: "1,95,000",
    condition: "Brand New",
    conditionColor: "bg-emerald-500",
    img: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=400&auto=format&fit=crop",
    category: "gaming",
  },
  {
    id: "showcase-11",
    brand: "APPLE",
    name: "AirPods Pro 2",
    specs: "USB-C • Active Noise Cancel",
    price: "38,000",
    condition: "Brand New",
    conditionColor: "bg-emerald-500",
    img: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=400&auto=format&fit=crop",
    category: "accessories",
  },
  {
    id: "showcase-12",
    brand: "APPLE",
    name: "Apple Watch Ultra 2",
    specs: "49mm • Titanium",
    price: "1,10,000",
    condition: "Like New",
    conditionColor: "bg-blue-500",
    img: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=400&auto=format&fit=crop",
    category: "watches",
  },
];

export function getShowcaseByCategory(category: string, condition?: string, sort?: string) {
  let items = category
    ? showcaseProducts.filter((p) => p.category === category || (category === "phones" && p.category === "used-iphones"))
    : [...showcaseProducts];

  if (condition === "used") {
    items = items.filter((p) => p.condition !== "Brand New");
  }

  if (sort === "new") {
    items = [...items].reverse();
  }

  return items;
}

export function getProductImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return path;
  return `/item_photos/${path.replace(/^\/+/, "")}`;
}
