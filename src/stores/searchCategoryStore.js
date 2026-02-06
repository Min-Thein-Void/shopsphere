import api from "@/plugins/axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useSearchCategoryStore = defineStore("categorySearch", {
  state: () => ({
    searchCategoryResult: [],
    loading: false,
    selectedCategory: null,
  }),
  actions: {
    async searchByProductCategory(categoryName) {
      this.loading = true;
      this.selectedCategory = categoryName;
      try {
        const res = await api.post("/api/category/search", { c: categoryName });
        this.searchCategoryResult = res.data;

        if (this.searchCategoryResult.length === 0) {
          Swal.fire({
            icon: "info",
            title: "No Products Available",
            text: `There are currently no products listed under "${categoryName}".`,
            confirmButtonColor: "#4f46e5",
            background: "#1f2937",
            color: "#e5e7eb",
          });
        }
      } catch (err) {
        console.error("CategorySearch failed:", err);
      } finally {
        this.loading = false;
      }
    },
    // Optional: clear the selected category
    clearCategory() {
      this.selectedCategory = null;
      this.searchCategoryResult = [];
    },
  },
});
