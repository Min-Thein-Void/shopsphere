<template>
    <div class="bg-neutral-950 min-h-screen flex flex-col lg:flex-row justify-center p-6 mt-17.5 gap-6">

        <!-- Cart Section -->
        <div
            class="flex-1 lg:max-w-lg bg-neutral-900 rounded-xl shadow-2xl overflow-hidden border border-white/10 p-6 mb-6 lg:mb-0">
            <h2 class="text-2xl font-bold text-cyan-300 mb-6 flex items-center gap-2">
                🛒 Your Cart
            </h2>

            <!-- Cart empty state -->
            <div v-if="!cart.cartProducts.length" class="flex flex-col items-center justify-center mt-20 text-cyan-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 text-cyan-700" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H19M7 13l-2-8m0 0L5 4m14 0h-2" />
                </svg>
                <p class="text-lg font-semibold">Your cart is empty</p>
                <router-link :to="{ name: 'Shop' }"
                    class="mt-4 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Go Back To Shop
                </router-link>
            </div>

            <!-- Cart items -->
            <ul v-else class="space-y-4 max-h-100 overflow-y-auto custom-scrollbar">
                <li v-for="item in cartItemsInCheckOut" :key="item.id"
                    class="flex items-center gap-4 border-b border-white/10 p-3 transform transition hover:scale-[1.02] hover:shadow-lg rounded-lg bg-neutral-950">
                    <img :src="item.image ? `http://localhost:8000/storage/${item.image}` : '/favicon.ico'"
                        alt="Product" class="w-20 h-20 rounded-lg object-cover border border-white/10" />
                    <div class="flex-1">
                        <router-link class="font-semibold text-cyan-300 capitalize hover:text-cyan-200 transition"
                            :to="{ name: 'Detail', params: { id: item.id } }">
                            {{ item.name }}
                        </router-link>
                        <p class="text-sm text-cyan-500">Qty: {{ item.qty }}</p>
                        <button @click="remove(item.id)"
                            class="flex items-center gap-1 text-red-500 hover:text-red-600 transition text-sm mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Remove
                        </button>
                    </div>
                    <div class="font-semibold text-cyan-300 transition-all duration-300">${{ item.price }}</div>
                </li>
            </ul>

            <!-- Total + Actions -->
            <div v-if="cart.cartProducts.length" class="mt-6 border-t border-white/10 pt-4 flex flex-col gap-4">
                <div class="flex justify-between items-center text-cyan-300">
                    <span class="text-lg">Total:</span>
                    <span class="text-2xl font-bold text-cyan-300 transition-all duration-500">${{ total }}</span>
                </div>

                <div class="flex flex-col sm:flex-row gap-3">
                    <!-- Add More Button -->
                    <router-link :to="{ name: 'Shop' }"
                        class="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-cyan-800 hover:bg-cyan-700 text-cyan-300 font-semibold transition transform hover:scale-105 duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add More
                    </router-link>

                    <!-- Clear All Button -->
                    <button @click="removes"
                        class="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition transform hover:scale-105 duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Clear All
                    </button>
                </div>
            </div>
        </div>

        <!-- Checkout Form (Sticky on Desktop) -->
        <div v-if="cart.cartProducts.length"
            class="flex-1 lg:max-w-lg bg-neutral-900 rounded-xl shadow-2xl p-6 lg:ml-6 lg:sticky lg:top-24">
            <CheckOutForm />
        </div>

    </div>
</template>


<script>
import CheckOutForm from './CheckOutForm.vue'
import { useProductStore } from '@/stores/useProductStore';
import { computed } from 'vue';

export default {
    components: { CheckOutForm },
    setup() {
        const cart = useProductStore();
        const remove = (id) => cart.removeItem(id)
        const removes = () => cart.clear()
        const cartItemsInCheckOut = computed(() => cart.cartProducts)
        const total = computed(() => cart.totalPrice)
        return { cartItemsInCheckOut, total, remove, removes, cart }
    }
}
</script>

<style scoped>
/* Hide scrollbar for clean look */
.custom-scrollbar::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}

.custom-scrollbar {
    -ms-overflow-style: none;
    /* IE 10+ */
    scrollbar-width: none;
    /* Firefox */
}

/* Pulse animation (subtle) */
@keyframes pulse {

    0%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.02);
    }
}

.animate-pulse {
    animation: pulse 1.5s ease-in-out infinite;
}
</style>