import api from "@/plugins/axios";
import debounce from "lodash.debounce";
import { defineStore } from "pinia";
import Swal from "sweetalert2";

interface SearchState {
  searchTerm: string;
  searchResults: any[];
  loading: boolean;
}

export const useSearchStore = defineStore("search", {
  state: (): SearchState => ({
    searchTerm: "",
    searchResults: [],
    loading: false,
  }),
  actions: {
    searchProducts: debounce(async function (this: SearchState) {
      this.loading = true;
      try {
        const term = this.searchTerm?.trim();

        if (!term) {
          const res = await api.get("/api/products");
          this.searchResults = res.data;
        } else {
          const res = await api.post("/api/products/search", { q: term });
          this.searchResults = res.data;

          if (this.searchResults.length === 0) {
            Swal.fire({
              icon: "info",
              title: "No Results Found",
              text: `We couldn’t find any products matching "${term}". Please try another search.`,
              confirmButtonColor: "#4f46e5",
              background: "#1f2937",
              color: "#e5e7eb",
            });
          }
        }
      } catch (err) {
        console.error("Search failed:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while searching products.",
          confirmButtonColor: "#ef4444",
        });
      } finally {
        this.loading = false;
      }
    }, 500) as unknown as () => Promise<void>,
  },
});
