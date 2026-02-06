<template>
    <div class="min-h-screen mt-[50px] bg-gray-900 flex items-center justify-center py-16 px-6">
        <div
            class="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full bg-gray-800 rounded-2xl shadow-xl overflow-hidden">

            <!-- Product Image -->
            <div class="relative w-full h-[600px] bg-gray-700 flex items-center justify-center">
                <div v-if="loading" class="animate-pulse w-full h-full bg-gray-700"></div>
                <div v-else>
                    <img class="w-full h-full object-cover rounded-l-2xl"
                        :src="singleproduct?.image ? `http://localhost:8000/storage/${singleproduct.image}` : '/favicon.ico'"
                        alt="Product Image" />
                </div>
            </div>

            <!-- Product Info -->
            <div class="flex flex-col justify-between space-y-6 p-8 text-white">

                <!-- Title -->
                <h2 class="text-4xl font-bold capitalize tracking-tight">
                    {{ singleproduct?.name }}
                </h2>

                <!-- Description -->
                <p class="text-gray-300 text-base leading-relaxed">
                    {{ singleproduct?.description }}
                </p>

                <!-- Price -->
                <p class="text-3xl font-semibold text-pink-500">
                    {{ singleproduct?.price }} <span class="text-gray-500">MMK</span>
                </p>

                <!-- Stock -->
                <p class="text-sm font-medium" :class="singleproduct?.stock > 0 ? 'text-green-400' : 'text-red-400'">
                    {{ singleproduct?.stock > 0 ? `In stock: ${singleproduct.stock}` : 'Out of stock' }}
                </p>

                <!-- Buttons -->
                <div class="flex items-center gap-4 mt-6">
                    <button @click="addToCart"
                        class="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-40 shadow-md"
                        :disabled="singleproduct?.stock === 0">
                        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H19m-12 0a2 2 0 104 0 2 2 0 00-4 0zm8 0a2 2 0 104 0 2 2 0 00-4 0z" />
                        </svg>
                        Add to Cart
                    </button>

                    <router-link :to="{ name: 'Shop' }"
                        class="flex items-center gap-2 text-gray-300 hover:text-white underline text-sm">
                        ⬅ Back to Shop
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getSingleProduct } from '@/composable/getSingleProduct';
import { useProductStore } from '@/stores/useProductStore';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    props: {
        id: {
            type: [String, Number],
            required: true
        }
    },
    setup(props) {
        const loading = ref(true);
        const { singleproduct, fetchSingleProduct } = getSingleProduct();
        let router = useRouter()

        let cart = useProductStore();

        onMounted(async () => {
            loading.value = true;
            await fetchSingleProduct(props.id);
            loading.value = false;
        });

        const addToCart = () => {
            cart.addItem(singleproduct.value, 1);
            router.push({ name: 'CheckOut' })
        }

        return { singleproduct, loading, addToCart };
    }
}
</script>
