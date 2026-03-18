import api from "@/plugins/axios";
import Swal from "sweetalert2";
import { ref } from "vue";

export function useDiscount() {
  let discountType = ref("");
  let discountValue = ref(0);

  const submitDiscount = async (id) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the discount for this product?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22d3ee",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
      background: "#1a1a1a",
      color: "#22d3ee",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    Swal.fire({
      title: "Updating Discount...",
      text: "Please wait while we apply the changes.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      background: "#1a1a1a",
      color: "#22d3ee",
    });

    try {
      const res = await api.patch(
        `/api/products/${id}/discount`,
        {
          discount_type: discountType.value,
          discount_value: discountValue.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        },
      );

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Discount Updated",
          text: res.data.message,
          confirmButtonColor: "#22d3ee",
          background: "#1a1a1a",
          color: "#22d3ee",
        });
        return res.data.product;
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        confirmButtonColor: "#ef4444",
        background: "#1a1a1a",
        color: "#22d3ee",
      });
    }
  };

  return {
    submitDiscount,
    discountType,
    discountValue,
  };
}
