import { defineStore } from "pinia";
import api from "@/plugins/axios";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    singleProduct: null,
  }),

  actions: {
    async fetchProducts() {
      try {
        const res = await api.get("/api/products");
        this.products = res.data.products;
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    },

    async fetchSingleProduct(id) {
      try {
        const res = await api.get(`/api/product/${id}`);
        this.singleProduct = res.data.product;
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    },

    async submitDiscount(id, discountType, discountValue) {
      try {
        const res = await api.patch(
          `/api/products/${id}/discount`,
          {
            discount_type: discountType,
            discount_value: discountValue,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          },
        );

        if (res.status === 200) {
          const discountProduct = res.data.product;
          this.singleProduct = discountProduct;
          this.products = this.products.map((p) =>
            p.id === discountProduct.id ? discountProduct : p,
          );
          return discountProduct;
        }
      } catch (error) {
        console.error("Failed to submit discount", error);
      }
    },

    async removeDiscount(id) {
      try {
        const res = await api.delete(`/api/product/${id}/remove/discount`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });

        if (res.status === 200) {
          const updatedProduct = res.data.product;
          this.singleProduct = updatedProduct;
          this.products = this.products.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p,
          );
          return updatedProduct;
        }
      } catch (error) {
        console.error("Failed to remove discount", error);
      }
    },
  },
});
