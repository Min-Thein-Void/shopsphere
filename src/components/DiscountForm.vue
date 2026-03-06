<template>
    <div class="mt-10 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg">
        <h3 class="text-xl font-bold text-cyan-300 mb-4">Set Discount</h3>

        <form @submit.prevent="submitDiscount" class="space-y-4">
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
import api from "@/plugins/axios";
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

        const submitDiscount = async () => {
            try {
                const res = await api.patch(
                    `/api/products/${props.productId}/discount`,
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
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response?.data?.message || "Something went wrong",
                });
            }
        };

        return { discountValue, discountType, submitDiscount };
    },
};
</script>
