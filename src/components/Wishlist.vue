<template>
    <div class="min-h-screen bg-neutral-950 text-cyan-300 py-12 px-6 mt-6">
        <div class="max-w-6xl mx-auto">
            <!-- Title -->
            <h1 class="text-3xl font-bold mb-8 text-center">My Wishlist</h1>

            <!-- Wishlist Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Skeleton Loading -->
                <template v-if="loading">
                    <div v-for="n in 3" :key="n"
                        class="bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
                        <div class="h-48 bg-neutral-800 flex items-center justify-center">
                            <div class="w-32 h-32 bg-gray-700 rounded-md"></div>
                        </div>
                        <div class="p-4 space-y-2">
                            <div class="h-4 bg-gray-700 rounded w-3/4"></div>
                            <div class="h-6 bg-gray-700 rounded w-1/2"></div>
                        </div>
                    </div>
                </template>

                <!-- Wishlist Products -->
                <template v-else>
                    <div v-for="product in wishlistProductArray" :key="product.id"
                        class="bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg overflow-hidden hover:shadow-cyan-500/30 transition">
                        <!-- Product Image -->
                        <div class="h-48 bg-neutral-800 flex items-center justify-center">
                            <img :src="`${baseUrl}/storage/${product.image}`" alt="Product Image" class="h-full w-full object-contain p-4" />
                        </div>

                        <!-- Product Info -->
                        <div class="p-4 space-y-2">
                            <router-link :to="{ name: 'Detail', params: { id: product.id } }"
                                class="text-lg font-semibold text-cyan-400 truncate">
                                {{ product.name }}
                            </router-link>
                            <p class="text-xl font-bold text-cyan-300">
                                ${{ product.price }}
                            </p>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/plugins/axios";
import { ref, onMounted } from "vue";

export default {
    setup() {
        const wishlistProductArray = ref([]);
        const loading = ref(true);

        const baseUrl = "http://localhost:8000"

        const fetchWishListProducts = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                const res = await api.get("/api/auth/wishlist", {
                    headers: { Authorization: `Bearer ${token}` },
                },);
                console.log(res.data);
                wishlistProductArray.value = res.data.wishlists.map(
                    (item) => item.product
                );
            } catch (error) {
                console.error("Failed to fetch wishlist:", error);
            } finally {
                loading.value = false;
            }
        };

        onMounted(() => {
            fetchWishListProducts();
        });

        return { wishlistProductArray, loading ,baseUrl};
    },
};
</script>
