// frontend/store/useCartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, delta: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Thêm món vào giỏ
      addItem: (newItem: CartItem) => {
        const { items } = get();
        // Kiểm tra xem món đó (cùng ID, cùng Size, cùng Topping) đã có trong giỏ chưa
        const existingIndex = items.findIndex(
          (i) =>
            i.productId === newItem.productId &&
            i.size.name === newItem.size.name &&
            JSON.stringify(i.toppings.map((t) => t.name).sort()) ===
              JSON.stringify(newItem.toppings.map((t) => t.name).sort())
        );

        if (existingIndex > -1) {
          // Nếu đã tồn tại đúng option đó: cộng dồn số lượng và cập nhật giá dòng
          const updatedItems = [...items];
          const existingItem = updatedItems[existingIndex];
          const newQty = existingItem.qty + newItem.qty;
          const unitPrice =
            existingItem.basePrice +
            existingItem.size.price +
            existingItem.toppings.reduce((sum, t) => sum + t.price, 0);

          updatedItems[existingIndex] = {
            ...existingItem,
            qty: newQty,
            lineTotal: unitPrice * newQty,
          };
          set({ items: updatedItems });
        } else {
          // Nếu món mới hoàn toàn: thêm vào mảng
          set({ items: [...items, newItem] });
        }
      },

      // Xóa món theo index
      removeItem: (index: number) => {
        set({ items: get().items.filter((_, i) => i !== index) });
      },

      // Tăng / giảm số lượng (+1 hoặc -1)
      updateQuantity: (index: number, delta: number) => {
        const { items } = get();
        const target = items[index];
        if (!target) return;

        const nextQty = target.qty + delta;
        if (nextQty <= 0) {
          get().removeItem(index);
          return;
        }

        const unitPrice =
          target.basePrice +
          target.size.price +
          target.toppings.reduce((sum, t) => sum + t.price, 0);

        const updatedItems = [...items];
        updatedItems[index] = {
          ...target,
          qty: nextQty,
          lineTotal: unitPrice * nextQty,
        };
        set({ items: updatedItems });
      },

      // Dọn sạch giỏ
      clearCart: () => set({ items: [] }),

      // Tính tổng tiền toàn bộ giỏ
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.lineTotal, 0);
      },

      // Tính tổng số lượng ly nước trong giỏ
      getTotalItems: () => {
        return get().items.reduce((count, item) => count + item.qty, 0);
      },
    }),
    {
      name: 'brewlite-cart-storage', // Lưu vào LocalStorage để F5 không bị mất giỏ hàng
      storage: createJSONStorage(() => localStorage),
    }
  )
);