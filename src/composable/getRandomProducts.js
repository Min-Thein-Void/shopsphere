import api from "@/plugins/axios";
import { ref } from "vue";

export const getRandomProducts = () => {
  const randomProducts = ref([]);
  const fetchRandomProducts = async () => {
    try {
      const res = await api.get("/api/random-products");
      if (res.status === 200) {
        randomProducts.value = res.data.products;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    fetchRandomProducts,
    randomProducts,
  };
};
