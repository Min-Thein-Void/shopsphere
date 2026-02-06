<template>
    <div class="p-8">
        <h2 class="text-2xl font-bold text-orange-400 mb-6">Checkout</h2>

        <form @submit.prevent="orderNow" class="space-y-4">
            <div>
                <label class="block text-sm text-gray-300 mb-1">Name</label>
                <input type="text" v-model="fullname"
                    class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white opacity-70 cursor-not-allowed" disabled />
            </div>

            <div>
                <label class="block text-sm text-gray-300 mb-1">Email</label>
                <input type="email" v-model="email"
                    class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white opacity-70 cursor-not-allowed" disabled />
            </div>

            <div>
                <label class="block text-sm text-gray-300 mb-1">Shipping Address</label>
                <textarea v-model="shipping_address"
                    class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"></textarea>
            </div>

            <div>
                <label class="block text-sm text-gray-300 mb-1">Phone Number</label>
                <input type="text" v-model="phone" class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white" />
            </div>


            <button type="submit" class="mt-4 w-full py-3 rounded-lg text-white font-bold bg-gradient-to-r from-orange-500 to-yellow-400 
                 hover:from-yellow-400 hover:to-orange-500 transition-transform transform hover:scale-105 duration-200 
                 shadow-lg animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" class="inline h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H19M7 13l-2-8m0 0L5 4m14 0h-2" />
                </svg>
                Place Order
            </button>
        </form>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'
import { useProductStore } from '@/stores/useProductStore'
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

let router = useRouter();

const fullname = ref('')
const email = ref('')
const shipping_address = ref('')
const phone = ref('')

const userStore = useUserStore()

onMounted(() => {
    fullname.value = userStore.user?.name || ''
    email.value = userStore.user?.email || ''
})

const orderNow = async () => {
    const store = useProductStore();
    const items = store.cartProducts.map(p => ({
        product_id: p.id,
        quantity: p.qty
    }));

    if (!items.length) {
        Swal.fire({
            icon: 'info',
            title: 'Cart is empty',
            text: 'Please add some products before checkout.',
            background: "#1f2937",
            color: '#c7d2fe',
            confirmButtonColor: '#4f46e5'
        });
        return;
    }

    const payload = {
        fullname: fullname.value,
        email: email.value,
        shipping_address: shipping_address.value,
        phone: phone.value,
        items
    };

    const result = await Swal.fire({
        title: 'Confirm Order',
        text: 'Do you want to place this order?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, place order',
        cancelButtonText: 'Cancel',
        background: "#1f2937",
        color: "#e5e7eb",
        confirmButtonColor: '#4f46e5',
        cancelButtonColor: '#374151'
    });

    if (!result.isConfirmed) return;

    try {
        const res = await api.post('/api/auth/order', payload, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('auth_token')}`
            }
        });

        Swal.fire({
            title: 'Success!',
            text: 'Your order has been placed successfully.',
            icon: 'success',
            background: "#1f2937",
            color: "#e5e7eb",
            confirmButtonText: 'OK'
        }).then(() => {
            router.push({ name: 'OrderHistory' });
            store.clear();
        });

    } catch (err) {
        console.error('Order failed', err.response?.data || err);
        Swal.fire({
            title: 'Error!',
            text: err.response?.data?.message || 'Something went wrong.',
            icon: 'error',
            color: "#e5e7eb",
            background: "#1f2937",
            confirmButtonText: 'Try Again'
        });
    }
};
</script>
