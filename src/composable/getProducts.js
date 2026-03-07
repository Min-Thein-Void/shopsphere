import { ref } from "vue";
import api from "@/plugins/axios";

const products = ref([]);
const loaded = ref(false);

const fetchProducts = async () => {
  if (loaded.value) {
    return;
  }
  try {
    if (products.value.length) {
      return;
    }
    const res = await api.get("/api/products");

    if (res.status === 200) {
      products.value = res.data;
      loaded.value = true;
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
