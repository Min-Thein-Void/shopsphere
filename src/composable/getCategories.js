import api from "@/plugins/axios";
import { ref, onMounted } from "vue";

const categories = ref([]);
const loading = ref(false);
const lastPage = ref(1);
const currentPage = ref(1);

export default function useCategories() {
  const getCategories = async (page = 1) => {
    // prevent refetch same page
    if (page === currentPage.value && categories.value.length) return;

    loading.value = true;

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

  onMounted(() => {
    if (!categories.value.length) {
      getCategories();
    }
  });

  return {
    categories,
    loading,
    getCategories,
    nextPage,
    prevPage,
    currentPage,
    lastPage,
  };
}
