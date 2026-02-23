import api from "@/plugins/axios";
import Swal from "sweetalert2";
import { ref } from "vue";

export const useAvgRatings = () => {
  const avgRatings = ref(null);
  const loading = ref(false);

  const fetchAvgRatings = async (productId) => {
    if (!productId) return;

    loading.value = true;
    try {
      const token = localStorage.getItem("auth_token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await api.get(`/api/auth/rating-average/${productId}`, {
        headers,
      });

      if (res.status === 200 && res.data?.average !== undefined) {
        avgRatings.value = res.data.average;
      } else {
        avgRatings.value = null;
      }
    } catch (error) {
      if (error.message === "Network Error") {
        console.warn(
          "Network issue while fetching rating. Check server or CORS.",
        );
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            error.response?.data?.message || "Failed to fetch average rating",
          confirmButtonColor: "#ef4444",
          background: "#1f2937",
          color: "#f3f4f6",
        });
      }
    } finally {
      loading.value = false;
    }
  };

  return { fetchAvgRatings, avgRatings, loading };
};
