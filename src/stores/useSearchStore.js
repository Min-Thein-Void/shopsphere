import api from "@/plugins/axios";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

export const useSearchStore = defineStore("search", {
  state: () => ({
    searchTerm: "",
    searchResults: [],
    loading: false,
  }),
  actions: {
    async searchProducts() {
      if (!this.searchTerm) {
        this.searchResults = [];
        return;
      }

      this.loading = true;
      try {
        const res = await api.post("/api/products/search", {
          q: this.searchTerm,
        });
        this.searchResults = res.data;
        if (this.searchResults.length === 0) {
          Swal.fire({
            icon: "info",
            title: "No Results Found",
            text: `We couldn’t find any products matching "${this.searchTerm}". Please try another search.`,
            confirmButtonColor: "#4f46e5",
            background: "#1f2937",
            color: "#e5e7eb",
          });
        }
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        this.loading = false;
      }
    },
  },
});
