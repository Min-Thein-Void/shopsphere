<template>
    <div class="flex min-h-screen bg-neutral-950 mt-15 w-full text-cyan-300">
        <!-- Main Content -->
        <div class="flex-1 px-6 md:px-10 py-10 transition-all duration-300"
            :class="{ 'ml-64': isOpen, 'ml-0': !isOpen }">
            <div class="max-w-350 mx-auto space-y-10">

                <!-- Page Title -->
                <div class="flex items-center justify-between">
                    <h1 class="text-3xl font-bold">📦 Orders List</h1>
                </div>

                <!-- Summary Boxes -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div class="bg-neutral-900 rounded-lg shadow-md p-5 text-center hover:bg-neutral-800 transition">
                        <p class="text-sm text-gray-400">Orders</p>
                        <p class="text-2xl font-bold text-cyan-300">1,046</p>
                    </div>
                    <div class="bg-neutral-900 rounded-lg shadow-md p-5 text-center hover:bg-neutral-800 transition">
                        <p class="text-sm text-gray-400">Unpaid Orders</p>
                        <p class="text-2xl font-bold text-yellow-400">159</p>
                    </div>
                    <div class="bg-neutral-900 rounded-lg shadow-md p-5 text-center hover:bg-neutral-800 transition">
                        <p class="text-sm text-gray-400">Waiting for Shipment</p>
                        <p class="text-2xl font-bold text-orange-400">624</p>
                    </div>
                    <div class="bg-neutral-900 rounded-lg shadow-md p-5 text-center hover:bg-neutral-800 transition">
                        <p class="text-sm text-gray-400">Returns</p>
                        <p class="text-2xl font-bold text-red-400">263</p>
                    </div>
                </div>

                <!-- Filter Tabs -->
                <div class="flex flex-wrap gap-3 text-sm font-medium">
                    <button class="px-4 py-2 rounded-lg bg-cyan-600 text-white shadow hover:bg-cyan-500 transition">
                        All Orders
                    </button>
                    <button class="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition">
                        Active
                    </button>
                    <button class="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition">
                        Unpaid
                    </button>
                    <button class="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition">
                        Unfulfilled
                    </button>
                </div>

                <!-- Orders Table -->
                <div class="overflow-x-auto bg-neutral-900 rounded-xl shadow-lg">
                    <table class="min-w-full text-sm text-left">
                        <thead class="bg-neutral-800 text-gray-300 font-semibold">
                            <tr>
                                <th class="px-4 py-3">Buyer</th>
                                <th class="px-4 py-3">Email</th>
                                <th class="px-4 py-3">Phone</th>
                                <th class="px-4 py-3">Address</th>
                                <th class="px-4 py-3">Total</th>
                                <th class="px-4 py-3">Status</th>
                                <th class="px-4 py-3">Products</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="orderItem in orders" :key="orderItem.id"
                                class="border-t border-neutral-700 hover:bg-neutral-800 transition">
                                <td class="px-4 py-3">{{ orderItem.fullname }}</td>
                                <td class="px-4 py-3">{{ orderItem.email }}</td>
                                <td class="px-4 py-3">{{ orderItem.phone }}</td>
                                <td class="px-4 py-3">{{ orderItem.shipping_address }}</td>
                                <td class="px-4 py-3 font-semibold text-green-400">
                                    ${{ orderItem.total }}
                                </td>
                                <td class="px-4 py-3">
                                    <span class="inline-block px-2 py-1 rounded-full text-xs font-medium" :class="orderItem.status === 'Pending'
                                        ? 'bg-yellow-600 text-yellow-100'
                                        : 'bg-green-600 text-green-100'">
                                        {{ orderItem.status }}
                                    </span>
                                </td>
                                <td class="px-4 py-3 space-y-1">
                                    <div v-for="item in orderItem.items" :key="item.id">
                                        <router-link :to="{ name: 'Detail', params: { id: item.id } }"
                                            class="text-cyan-400 hover:underline">
                                            {{ item.product.name }} — ${{ item.price }} × {{ item.quantity }}
                                        </router-link>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import api from '@/plugins/axios';
import { onMounted, ref } from 'vue';

export default {
    setup() {
        const orders = ref([]);

        const token = localStorage.getItem("auth_token");

        const getOrders = async () => {
            try {
                const res = await api.get('/api/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (res.data && res.data.data) {
                    orders.value = res.data.data;
                }
            } catch (err) {
                console.log(err);
            }
        };

        onMounted(() => {
            getOrders();
        });

        return { orders };
    }
}
</script>
