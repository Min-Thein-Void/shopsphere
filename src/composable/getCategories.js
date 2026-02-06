import api from "@/plugins/axios";
import { ref, onMounted } from "vue";

export default function useCategories() {
  const categories = ref([]);
  const loading = ref(true);
  let lastPage = ref(1);
  let currentPage = ref(1);

  const getCategories = async (page = 1) => {
    try {
      const res = await api.get(`/api/categories?page=${page}`);
      if (res?.status === 200) {
        categories.value = res.data.data;
        currentPage.value = res.data.current_page;
        lastPage.value = res.data.last_page;
      }
    } finally {
      loading.value = false;
    }
  };

  const nextPage = () => {
    if (currentPage.value < lastPage.value) {
      getCategories(currentPage.value + 1);
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      getCategories(currentPage.value - 1);
    }
  };

  onMounted(getCategories);

  return {
    categories,
    loading,
    getCategories,
    nextPage,
    prevPage,
    currentPage,
    lastPage
  };
}
