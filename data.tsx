/* eslint-disable prettier/prettier */
interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

export const sampleProducts: Product[] = [
  {
    id: "1001",
    code: "P001",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    image: "https://heroui.com/images/hero-card-complete.jpeg",
    price: 99.99,
    category: "Electronics",
    quantity: 50,
    inventoryStatus: "INSTOCK",
    rating: 4.5,
  },
  {
    id: "1002",
    code: "P002",
    name: "Smartphone",
    description: "Latest 5G smartphone with an amazing camera.",
    image: "https://heroui.com/images/hero-card-complete.jpeg",
    price: 699.99,
    category: "Electronics",
    quantity: 20,
    inventoryStatus: "LOWSTOCK",
    rating: 4.8,
  },
  {
    id: "1003",
    code: "P003",
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with excellent sound quality.",
    image: "https://heroui.com/images/hero-card-complete.jpeg",
    price: 49.99,
    category: "Electronics",
    quantity: 0,
    inventoryStatus: "OUTOFSTOCK",
    rating: 4.2,
  },
  {
    id: "1004",
    code: "P004",
    name: "Fitness Tracker",
    description: "Track your daily activity and monitor your health.",
    image: "https://heroui.com/images/hero-card-complete.jpeg",
    price: 79.99,
    category: "Fitness",
    quantity: 30,
    inventoryStatus: "INSTOCK",
    rating: 4.3,
  },
  {
    id: "1005",
    code: "P005",
    name: "Laptop",
    description: "High-performance laptop for work and gaming.",
    image: "https://heroui.com/images/hero-card-complete.jpeg",
    price: 1099.99,
    category: "Electronics",
    quantity: 15,
    inventoryStatus: "LOWSTOCK",
    rating: 4.7,
  },
  {
    id: "1006",
    code: "P006",
    name: "Coffee Maker",
    description: "Automatic coffee maker for fresh coffee anytime.",
    image: "https://heroui.com/images/hero-card-complete.jpeg",
    price: 29.99,
    category: "Kitchen",
    quantity: 100,
    inventoryStatus: "INSTOCK",
    rating: 4.6,
  },
  {
    id: "1007",
    code: "P007",
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with customizable buttons.",
    image: "https://heroui.com/images/hero-card-complete.jpeg",
    price: 39.99,
    category: "Electronics",
    quantity: 60,
    inventoryStatus: "INSTOCK",
    rating: 4.4,
  },
  {
    id: "1008",
    code: "P008",
    name: "Backpack",
    description: "Durable and spacious backpack for travel or work.",
    image: "https://heroui.com/images/hero-card-complete.jpeg",
    price: 49.99,
    category: "Accessories",
    quantity: 10,
    inventoryStatus: "LOWSTOCK",
    rating: 4.1,
  },
  {
    id: "1009",
    code: "P009",
    name: "Desk Lamp",
    description: "Adjustable desk lamp with LED light.",
    image: "https://heroui.com/images/hero-card-complete.jpeg",
    price: 19.99,
    category: "Home",
    quantity: 0,
    inventoryStatus: "OUTOFSTOCK",
    rating: 4.0,
  },
];
