import { Product } from "@/types";

const getApiUrl = () => {
  if (typeof window !== "undefined") {
    return `http://${window.location.hostname}:3001`;
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
};

const mapProductFromApi = (p: any): Product => {
  const unitPrice = Number(p.basePrice ?? p.price ?? 0);

  return {
    id: String(p.id),
    name: p.name,
    description: p.description || "",
    price: unitPrice,       
    basePrice: unitPrice,  
    stock: Number(p.stock || 0),
    imageUrl: p.imageUrl || "/next.svg",
    isActive: p.isActive !== undefined ? Boolean(p.isActive) : true,

    sizes: (p.sizes || []).map((s: any) => {
      const sizePrice = Number(s.price ?? s.priceAdjustment ?? 0);
      return {
        id: String(s.id),
        name: s.name,
        price: sizePrice,
        priceAdjustment: sizePrice,
      };
    }),

    toppings: (p.toppings || []).map((t: any) => {
      const toppingPrice = Number(t.price ?? t.priceAdjustment ?? 0);
      return {
        id: String(t.id),
        name: t.name,
        price: toppingPrice,
        priceAdjustment: toppingPrice,
      };
    }),
  };
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`${getApiUrl()}/products`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Không thể tải danh sách sản phẩm");
    const data = await res.json();
    return Array.isArray(data) ? data.map(mapProductFromApi) : [];
  } catch (error) {
    console.error("Lỗi lấy sản phẩm từ Backend:", error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(`${getApiUrl()}/products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return mapProductFromApi(data);
  } catch (error) {
    console.error(`Lỗi lấy chi tiết sản phẩm #${id}:`, error);
    return null;
  }
};