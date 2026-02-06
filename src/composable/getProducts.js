import { ref } from "vue";
import api from "@/plugins/axios";

const products = ref([]);

const fetchProducts = async () => {
  try {
    const res = await api.get("/api/products");

    if (res.status === 200) {
      products.value = res.data;
    }

    return res;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const getProducts = () => {
  return { products, fetchProducts };
};
