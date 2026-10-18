export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Cà phê sữa",
    price: 35000,
    imageUrl: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Americano",
    price: 40000,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Cappuccino",
    price: 45000,
    imageUrl: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
    name: "Trà đào",
    price: 39000,
    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80",
  },
];

