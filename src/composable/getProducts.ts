import { Ref, ref } from "vue";
import api from "@/plugins/axios";

export interface Product {
  id: number;
  name: string;
  image?: string | null;
  description?: string | null;
  price: number;
  stock: number;
  category_id?: number | null;
  created_at: string;
  updated_at: string;
}

const products: Ref<Product[]> = ref([]);
const loaded: Ref<boolean> = ref(false);

const fetchProducts = async (): Promise<void> => {
  if (loaded.value) {
    return;
  }
  try {
    if (products.value.length) {
      return;
    }
    const res = await api.get<Product[]>("/api/products");

    if (res.status === 200) {
      products.value = res.data;
      loaded.value = true;
    }
  } catch (error: unknown) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export const getProducts = (): {
  products: Ref<Product[]>;
  fetchProducts: () => Promise<void>;
} => {
  return { products, fetchProducts };
};
