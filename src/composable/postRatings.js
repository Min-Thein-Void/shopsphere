import { ref } from "vue";
import Swal from "sweetalert2";
import api from "@/plugins/axios";

export const postRatings = () => {
  const userRating = ref(0);

  function setRating(n) {
    userRating.value = n;
  }

  async function submitRating(singleProductId) {
    try {
      const res = await api.post(
        "/api/auth/rate",
        { product_id: singleProductId, rating: userRating.value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        },
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Thanks!",
          text: `You rated ${userRating.value} stars`,
          confirmButtonColor: "#22d3ee",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  }

  return {
    setRating,
    submitRating,
    userRating,
  };
};
