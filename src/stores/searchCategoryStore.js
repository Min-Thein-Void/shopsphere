import api from "@/plugins/axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useSearchCategoryStore = defineStore("categorySearch", {
  state: () => ({
    searchCategoryResult: [],
    loading: false,
    selectedCategory: null, // now stores category name
  }),

  actions: {
    async searchByProductCategory(categoryName) {
      if (!categoryName || typeof categoryName !== "string") return;

      const term = categoryName.trim();
      if (!term) {
        await this.fetchAllProducts();
        return;
      }

      this.loading = true;
      this.selectedCategory = term;

      try {
        const res = await api.post("/api/category/search", { c: term });
        this.searchCategoryResult = res.data;

        if (!res.data.length) {
          Swal.fire({
            icon: "info",
            title: "No Products Available",
            text: `There are currently no products listed under "${term}".`,
            confirmButtonColor: "#4f46e5",
            background: "#1f2937",
            color: "#e5e7eb",
          });
        }
      } catch (err) {
        console.error("CategorySearch failed:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while fetching category products.",
          confirmButtonColor: "#ef4444",
        });
      } finally {
        this.loading = false;
      }
    },

    async fetchAllProducts() {
      this.loading = true;
      try {
        const res = await api.get("/api/products");
        this.searchCategoryResult = res.data;
        this.selectedCategory = null;
      } catch (err) {
        console.error("Fetch all products failed:", err);
      } finally {
        this.loading = false;
      }
    },

    async clearCategory() {
      if (!this.selectedCategory) return;

      this.selectedCategory = null;
      await this.fetchAllProducts();
    },
  },
});