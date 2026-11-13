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
    imageUrl: "/images/cafesua.jpeg",
  },
  {
    id: 2,
    name: "Cà phê đen",
    price: 30000,
    imageUrl: "/images/cafeden.jpeg",
  },
  {
    id: 3,
    name: "Trà sữa",
    price: 38000,
    imageUrl: "/images/trasua.png",
  },
  {
    id: 4,
    name: "Trà đào",
    price: 39000,
    imageUrl: "/images/tradao.jpeg",
  },
];

