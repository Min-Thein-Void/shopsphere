<template>
    <div class="min-h-screen bg-gray-800 text-gray-100 py-10 px-4 mt-[60px]">
        <div class="max-w-[1400px] mx-auto space-y-8">
            <!-- Page Title -->
            <h1 class="text-3xl font-bold text-center">🛒 Order History</h1>

            <!-- Orders List -->
            <div v-if="orders.length" class="space-y-6">
                <div v-for="order in orders" :key="order.id" class="bg-gray-700 rounded-xl shadow-md p-6 space-y-4">

                    <!-- Order Header -->
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                            <p class="text-lg font-semibold">Order #{{ order.id }}</p>
                            <p class="text-sm text-gray-400">Placed on {{ formatDate(order.created_at) }}</p>
                        </div>
                        <div class="mt-2 md:mt-0">
                            <span class="inline-block px-3 py-1 rounded-full text-xs font-medium" :class="order.status === 'pending'
                                ? 'bg-yellow-600 text-yellow-100'
                                : 'bg-green-600 text-green-100'">
                                {{ order.status }}
                            </span>
                        </div>
                    </div>

                    <!-- Order Info -->
                    <div class="grid sm:grid-cols-2 gap-4 text-sm">
                        <p><strong>Fullname:</strong> {{ order.fullname }}</p>
                        <p><strong>Email:</strong> {{ order.email }}</p>
                        <p><strong>Phone:</strong> {{ order.phone }}</p>
                        <p><strong>Address:</strong> {{ order.shipping_address }}</p>
                        <p><strong>Total:</strong> ${{ order.total }}</p>
                    </div>

                    <!-- Products -->
                    <div class="border-t border-gray-600 pt-4">
                        <h2 class="text-md font-semibold mb-3">Products</h2>
                        <div class="space-y-3">
                            <div v-for="item in order.items" :key="item.id"
                                class="flex items-center gap-4 bg-gray-800 rounded-lg p-3">
                                <img :src="`http://localhost:8000/storage/${item.product.image}`" alt="Product image"
                                    class="w-16 h-16 object-cover rounded-md" />
                                <div class="flex-1">
                                    <p class="font-medium">{{ item.product.name }}</p>
                                    <p class="text-sm text-gray-400">
                                        {{ item.quantity }} × ${{ item.product.final_price }}
                                    </p>
                                    <p v-if="item.product.discount_label" class="text-xs text-green-400">
                                        {{ item.product.discount_label }}
                                    </p>
                                </div>
                                <router-link :to="{ name: 'Detail', params: { id: item.product.id } }"
                                    class="text-blue-400 hover:underline text-sm">
                                    View
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center text-gray-400">
                No orders found.
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
