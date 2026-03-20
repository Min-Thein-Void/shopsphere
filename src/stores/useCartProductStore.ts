import { defineStore } from "pinia";

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  original_price: number;
  image: string;
  qty: number;
}

export interface ProductInterface {
  cartProducts: CartProduct[];
}

type Product = Partial<CartProduct> & {
  id: number;
  name: string;
  price?: number;
  final_price?: number;
  image?: string;
};

export const useCartProductStore = defineStore("cartProduct", {
  state: (): ProductInterface => ({
    cartProducts: JSON.parse(
      localStorage.getItem("cart") || "[]",
    ) as CartProduct[],
  }),

  getters: {
    totalPrice: (state): number =>
      state.cartProducts.reduce((sum, item) => sum + item.price * item.qty, 0),

    count: (state): number =>
      state.cartProducts.reduce((sum, i) => sum + i.qty, 0),
  },

  actions: {
    saveCart(): void {
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    },

    addItem(product: Product, qty = 1): void {
      const existingProduct = this.cartProducts.find(
        (i) => i.id === product.id,
      );

      if (existingProduct) {
        existingProduct.qty += qty;
      } else {
        this.cartProducts.push({
          id: product.id,
          name: product.name,
          price: Number(product.final_price ?? product.price),
          original_price: Number(product.price ?? 0),
          image: product.image ?? "",
          qty,
        });
      }

      this.saveCart();
    },

    removeItem(id: number): void {
      this.cartProducts = this.cartProducts.filter((i) => i.id !== id);
      this.saveCart();
    },

    clear(): void {
      this.cartProducts = [];
      this.saveCart();
    },
  },
});
