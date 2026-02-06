import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => ({
    cartProducts: JSON.parse(localStorage.getItem("cart") || "[]"),
  }),

  getters: {
    totalPrice: (state) =>
      state.cartProducts.reduce((sum, item) => sum + item.price * item.qty, 0),

    count: (state) => state.cartProducts.reduce((sum, i) => sum + i.qty, 0),
  },

  actions: {
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    },

    addItem(product, qty = 1) {
      const existingProduct = this.cartProducts.find(
        (i) => i.id === product.id,
      );

      if (existingProduct) {
        existingProduct.qty += qty;
      } else {
        this.cartProducts.push({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          image: product.image,
          qty,
        });
      }

      this.saveCart();
    },

    removeItem(id) {
      this.cartProducts = this.cartProducts.filter((i) => i.id !== id);
      this.saveCart();
    },

    clear() {
      this.cartProducts = [];
      this.saveCart();
    },
  },
});
