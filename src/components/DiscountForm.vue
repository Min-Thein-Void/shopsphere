<template>
  <div class="mt-10 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg">
    <h3 class="text-xl font-bold text-cyan-300 mb-4">Set Discount</h3>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Discount Type -->
      <div>
        <label class="block text-sm text-neutral-400 mb-2">Discount Type</label>
        <select v-model="discountType"
          class="w-full px-3 py-2 rounded-lg bg-neutral-800 text-cyan-300 border border-neutral-700">
          <option value="">None</option>
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed Amount</option>
        </select>
      </div>

      <!-- Discount Value -->
      <div v-if="discountType">
        <label class="block text-sm text-neutral-400 mb-2">Discount Value</label>
        <input type="number" v-model="discountValue"
          class="w-full px-3 py-2 rounded-lg bg-neutral-800 text-cyan-300 border border-neutral-700"
          placeholder="Enter discount value" />
      </div>

      <!-- Submit Button -->
      <button type="submit"
        class="px-6 py-2 rounded-lg bg-cyan-500 text-neutral-900 font-semibold hover:bg-cyan-400 transition">
        Save Discount
      </button>
    </form>
  </div>
</template>

<script>
import { useProductStore } from "@/stores/useProductStore";
import Swal from "sweetalert2";
import { ref } from "vue";
export default {
  props: {
    productId: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props) {
    let discountType = ref("");
    let discountValue = ref(0);
    const discountProductStore = useProductStore();
    const handleSubmit = async () => {
      if (!discountType.value) {
        return Swal.fire({
          icon: "warning",
          title: "Select Discount Type",
          text: "Please choose a discount type first.",
          confirmButtonColor: "#f59e0b",
          background: "#1a1a1a",
          color: "#22d3ee",
        });
      }

      if (!discountValue.value || discountValue.value <= 0) {
        return Swal.fire({
          icon: "warning",
          title: "Invalid Value",
          text: "Discount value must be greater than 0.",
          confirmButtonColor: "#f59e0b",
          background: "#1a1a1a",
          color: "#22d3ee",
        });
      }

      const result = await Swal.fire({
        title: "Apply Discount?",
        text: "This will update the product price.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#22d3ee",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, apply it",
        background: "#1a1a1a",
        color: "#22d3ee",
      });

      if (!result.isConfirmed) return;

      try {
        Swal.fire({
          title: "Processing...",
          text: "Applying discount...",
          allowOutsideClick: false,
          showConfirmButton: false,
          background: "#1a1a1a",
          color: "#22d3ee",
          didOpen: () => {
            Swal.showLoading();
          },
        });

        await discountProductStore.submitDiscount(
          props.productId,
          discountType.value,
          discountValue.value
        );

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Discount applied successfully.",
          confirmButtonColor: "#22d3ee",
          background: "#1a1a1a",
          color: "#22d3ee",
        });

        discountType.value = "";
        discountValue.value = 0;

      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Something went wrong while applying discount.",
          confirmButtonColor: "#ef4444",
          background: "#1a1a1a",
          color: "#22d3ee",
        });
      }
    };
    return { discountValue, discountType, handleSubmit };
  },
};
</script>
