// frontend/services/product.service.ts
import { Product } from "@/types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Cà phê sữa",
    price: 35000,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80",
    stock: 20,
    sizes: [
      { name: "S", price: 0 },
      { name: "M", price: 5000 },
      { name: "L", price: 10000 },
    ],
    toppings: [
      { name: "Trân châu trắng", price: 10000 },
      { name: "Thạch đào", price: 10000 },
    ],
  },
  {
    id: "2",
    name: "Americano",
    price: 40000,
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80",
    stock: 15,
    sizes: [
      { name: "S", price: 0 },
      { name: "M", price: 5000 },
      { name: "L", price: 10000 },
    ],
    toppings: [{ name: "Thạch cà phê", price: 8000 }],
  },
  {
    id: "3",
    name: "Cappuccino",
    price: 45000,
    imageUrl: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&q=80",
    stock: 10,
    sizes: [
      { name: "S", price: 0 },
      { name: "M", price: 5000 },
      { name: "L", price: 10000 },
    ],
    toppings: [{ name: "Bột cacao", price: 5000 }],
  },
  {
    id: "4",
    name: "Trà đào",
    price: 39000,
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80",
    stock: 25,
    sizes: [
      { name: "M", price: 0 },
      { name: "L", price: 6000 },
    ],
    toppings: [{ name: "Miếng đào ngâm", price: 12000 }],
  },
];

// Hàm lấy toàn bộ Menu
export const getProducts = (): Product[] => {
  return MOCK_PRODUCTS;
};

// Hàm lấy chi tiết món theo ID (Dùng cho dynamic route)
export const getProductById = (id: string): Product | undefined => {
  return MOCK_PRODUCTS.find((p) => p.id === id);
};