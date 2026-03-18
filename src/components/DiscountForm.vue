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
import { useDiscount } from "@/composable/useDiscount";
import { getProducts } from "@/composable/getProducts";
export default {
    props: {
        productId: {
            type: [String, Number],
            required: true,
        },
    },
    setup(props) {
        const { products } = getProducts();
        const { submitDiscount, discountType, discountValue } = useDiscount();

        const handleSubmit = async () => {
            const updatedDiscountProduct = await submitDiscount(props.productId);
            products.value = products.value.map(p =>
                p.id === updatedDiscountProduct.id ? updatedDiscountProduct : p
            );
        };

        return { discountValue, discountType, handleSubmit };
    },
};
</script>
