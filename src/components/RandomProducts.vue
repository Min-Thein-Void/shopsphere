<template>
    <div
        class="relative w-full max-w-sm bg-transparent rounded-2xl border-t-2 border-gray-600/50 shadow-lg shadow-gray-600 hover:shadow-gray-500 transition p-6 h-125 flex flex-col">
        <div v-if="randomProduct.discount_label" class="absolute left-0 top-0 h-16 w-16">
            <div
                class="absolute transform bg-fuchsia-600 text-center text-white font-semibold py-1 -right-6.5 top-0 w-22.5 rounded-tl-2xl rounded-br-2xl">
                {{ randomProduct.discount_label }}
            </div>
        </div>
        <!-- Product Image -->
        <router-link :to="randomProduct?.id ? { name: 'Detail', params: { id: randomProduct.id } } : {}">
            <img class="w-full h-52 object-contain rounded-lg mb-5 transition hover:scale-[1.03]"
                :src="randomProduct?.image ? `http://localhost:8000/storage/${randomProduct.image}` : '/favicon.ico'"
                :alt="randomProduct?.name" />
        </router-link>

        <!-- Category + Stock -->
        <div class="flex items-center mb-4 gap-2">
            <span class="bg-gray-800 text-cyan-300 text-xs font-medium px-2 py-1 rounded-md">
                {{ randomProduct.category?.name }}
            </span>
            <span class="text-xs font-medium px-2 py-1 rounded-md" :class="randomProduct.stock < 3
                ? 'text-red-400 bg-gray-700'
                : 'text-emerald-300 bg-gray-700'
                ">
                Available: {{ randomProduct.stock }}
            </span>
        </div>

        <!-- Product Name -->
        <h5 class="text-lg font-semibold text-cyan-400 mt-2 line-clamp-2 capitalize">
            {{ randomProduct.name }}
        </h5>

        <!-- Rating Stars -->
        <div class="flex items-center mt-1">
            <!-- If avgRatings exists -->
            <template v-if="randomProduct.ratings_avg_rating">
                <svg v-for="n in 5" :key="n" class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" :class="n <= randomProduct.ratings_avg_rating ? 'text-amber-400' : 'text-gray-500'
                        ">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 
        3.967a1 1 0 00.95.69h4.178c.969 0 
        1.371 1.24.588 1.81l-3.385 2.46a1 
        1 0 00-.364 1.118l1.287 3.966c.3.922-.755 
        1.688-1.54 1.118l-3.385-2.46a1 1 0 
        00-1.176 0l-3.385 2.46c-.785.57-1.84-.196-1.54-1.118l1.287-3.966a1 
        1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 
        1 0 00.95-.69l1.286-3.967z" />
                </svg>
                <span class="ml-2 text-xs text-gray-400">
                    ({{ Number(randomProduct.ratings_avg_rating).toFixed(1) }})
                </span>

            </template>

            <!-- If avgRatings does not exist -->
            <template v-else>
                <svg v-for="n in 5" :key="n" class="w-4 h-4 text-gray-500 fill-current"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 
        3.967a1 1 0 00.95.69h4.178c.969 0 
        1.371 1.24.588 1.81l-3.385 2.46a1 
        1 0 00-.364 1.118l1.287 3.966c.3.922-.755 
        1.688-1.54 1.118l-3.385-2.46a1 1 0 
        00-1.176 0l-3.385 2.46c-.785.57-1.84-.196-1.54-1.118l1.287-3.966a1 
        1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 
        1 0 00.95-.69l1.286-3.967z" />
                </svg>
                <span class="ml-2 text-xs text-gray-400">(No ratings yet)</span>
            </template>
        </div>

        <!-- Price + Add to Cart -->
        <div class="flex items-center justify-between mt-auto">
            <div class="flex flex-col">
                <span v-if="randomProduct.discount_type" class="text-lg text-gray-400 line-through">
                    ${{ randomProduct.price }}
                </span>
                <!-- Final Price -->
                <span class="text-2xl font-bold text-white">
                    <span class="text-amber-500">$</span>{{ randomProduct.final_price }}
                </span>
            </div>

            <div class="flex gap-2">
                <!-- Add to Cart -->
                <button @click="addToCart(randomProduct)" type="button"
                    class="inline-flex items-center gap-1 hover:bg-neutral-800 rounded-lg text-cyan-300 text-xs font-medium px-2.5 py-1.5 shadow-sm transition duration-200 focus:outline-none">
                    🛒 Cart
                </button>

                <!-- Add to Wishlist -->
                <button @click="addToWishlist(product.id)" type="button"
                    class="inline-flex items-center gap-1 hover:bg-neutral-800 rounded-lg text-pink-400 text-xs font-medium px-2.5 py-1.5 shadow-sm transition duration-200 focus:outline-none">
                    ❤️ Wishlist
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { useCartProductStore } from "@/stores/useCartProductStore";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/useProductStore"

export default {
    props: {
        randomProduct: {
            type: Object,
            required: true,
            default: () => ({}),
        },
    },
    setup() {
        const route = useRoute();
        const loading = ref(true);
        const productStore = useProductStore();
        const singleproduct = computed(() => productStore.singleProduct);

        const loadProduct = async (id) => {
            loading.value = true;
            await productStore.fetchSingleProduct(id);
            loading.value = false;
        };

        onMounted(() => {
            loadProduct(route.params.id);
        });

        watch(
            () => route.params.id,
            (newId) => {
                loadProduct(newId);
            },
        );

        const scrollTop = () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        onMounted(() => {
            scrollTop();
        });

        watch(
            () => route.params.id,
            () => {
                scrollTop();
            }
        );

        const cart = useCartProductStore();
        const addToCart = (product) => {
            cart.addItem(product, 1);
        };

        return { singleproduct, loading, addToCart };
    },
};
</script>
