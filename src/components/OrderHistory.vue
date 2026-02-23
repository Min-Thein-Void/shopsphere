<template>
    <div class="min-h-screen bg-neutral-950 text-cyan-300 py-10 px-4 mt-15">
        <div class="max-w-300 mx-auto space-y-8">

            <!-- Page Title -->
            <h1 class="text-4xl font-bold text-center text-cyan-300 mb-6 flex justify-center items-center gap-2">
                🛒 Order History
            </h1>

            <!-- Orders List -->
            <div v-if="orders.length" class="space-y-6">
                <div v-for="order in orders" :key="order.id"
                    class="bg-neutral-900 rounded-2xl shadow-xl p-6 space-y-4 transition hover:shadow-cyan-500/40 hover:scale-[1.01] duration-300">

                    <!-- Order Header -->
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <p class="text-lg font-semibold text-cyan-300">Order #{{ order.id }}</p>
                            <p class="text-sm text-cyan-500">Placed on {{ formatDate(order.created_at) }}</p>
                        </div>
                        <div class="mt-2 md:mt-0">
                            <span class="inline-block px-3 py-1 rounded-full text-xs font-medium" :class="order.status === 'pending'
                                ? 'bg-yellow-600 text-neutral-950'
                                : 'bg-green-600 text-neutral-950'">
                                {{ order.status }}
                            </span>
                        </div>
                    </div>

                    <!-- Order Info -->
                    <div class="grid sm:grid-cols-2 gap-4 text-sm text-cyan-300">
                        <p><strong>Fullname:</strong> {{ order.fullname }}</p>
                        <p><strong>Email:</strong> {{ order.email }}</p>
                        <p><strong>Phone:</strong> {{ order.phone }}</p>
                        <p><strong>Address:</strong> {{ order.shipping_address }}</p>
                        <p><strong>Total:</strong> ${{ order.total }}</p>
                    </div>

                    <!-- Products -->
                    <div class="border-t border-cyan-700/30 pt-4">
                        <h2 class="text-md font-semibold mb-3 text-cyan-300">Products</h2>
                        <div class="space-y-3">
                            <div v-for="item in order.items" :key="item.id"
                                class="flex items-center gap-4 bg-neutral-950 rounded-xl p-3 transition hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/30">
                                <img :src="`http://localhost:8000/storage/${item.product.image}`" alt="Product image"
                                    class="w-16 h-16 object-cover rounded-lg border border-cyan-700/20" />
                                <div class="flex-1">
                                    <p class="font-medium text-cyan-300">{{ item.product.name }}</p>
                                    <p class="text-sm text-cyan-400">
                                        {{ item.quantity }} × ${{ item.product.final_price }}
                                    </p>
                                    <p v-if="item.product.discount_label" class="text-xs text-green-400">
                                        {{ item.product.discount_label }}
                                    </p>
                                </div>
                                <router-link :to="{ name: 'Detail', params: { id: item.product.id } }"
                                    class="text-cyan-400 hover:text-cyan-300 hover:underline text-sm font-medium">
                                    View
                                </router-link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center text-cyan-500 mt-20">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-cyan-700" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H19M7 13l-2-8m0 0L5 4m14 0h-2" />
                </svg>
                <p class="text-lg font-semibold">No orders found.</p>
            </div>

        </div>
    </div>
</template>


<script setup>
import api from '@/plugins/axios'
import { ref, onMounted } from 'vue'

const orders = ref([])

onMounted(async () => {
    const { data } = await api.get('/api/auth/orders/my', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('auth_token')}`
        }
    })
    orders.value = data
})

const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString()
}
</script>
