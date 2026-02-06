import api from "@/plugins/axios";
import { ref } from "vue";

let singleproduct = ref(null);
let fetchSingleProduct = async (id) => {
  try {
    const res = await api.get("/api/product/" + id);
    console.log(res.data);

    if (res && res.data) {
      singleproduct.value = res.data;
    }
    return res;
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return null;
  }
};

export const getSingleProduct = () => {
  return { singleproduct, fetchSingleProduct };
};
