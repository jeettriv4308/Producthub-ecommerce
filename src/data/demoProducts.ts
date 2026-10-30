
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
  stock: number;
};

export const demoProducts: Product[] = [
  {
    id: 1,
    title: "Wireless Headphones",
    description: "Comfortable wireless headphones with clear sound and a modern design.",
    price: 2499,
    category: "Accessories",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop",
    rating: 4.7,
    stock: 25,
  },
  {
    id: 2,
    title: "Smart Watch",
    description: "A stylish smartwatch for tracking daily activity and staying connected.",
    price: 3299,
    category: "Accessories",
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop",
    rating: 4.5,
    stock: 18,
  },
  {
    id: 3,
    title: "Minimal Backpack",
    description: "A practical everyday backpack with a clean, minimalist look.",
    price: 1899,
    category: "Accessories",
    thumbnail: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop",
    rating: 4.4,
    stock: 32,
  },
  {
    id: 4,
    title: "Running Shoes",
    description: "Lightweight shoes designed for comfortable everyday movement.",
    price: 2799,
    category: "Fashion",
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop",
    rating: 4.6,
    stock: 14,
  },
  {
    id: 5,
    title: "Classic Sunglasses",
    description: "Versatile sunglasses with a timeless frame and everyday style.",
    price: 999,
    category: "Fashion",
    thumbnail: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop",
    rating: 4.2,
    stock: 40,
  },
  {
    id: 6,
    title: "Desk Lamp",
    description: "A simple desk lamp to brighten up your workspace.",
    price: 1499,
    category: "Home",
    thumbnail: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop",
    rating: 4.3,
    stock: 21,
  },
  {
    id: 7,
    title: "Portable Speaker",
    description: "A compact speaker for music at home or on the go.",
    price: 2199,
    category: "Electronics",
    thumbnail: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop",
    rating: 4.5,
    stock: 16,
  },
  {
    id: 8,
    title: "Water Bottle",
    description: "A reusable bottle designed for your daily routine.",
    price: 599,
    category: "Lifestyle",
    thumbnail: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop",
    rating: 4.1,
    stock: 50,
  },
];
