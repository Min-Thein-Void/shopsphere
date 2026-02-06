<template>
    <div>
        <!-- Toggle Arrow -->
        <svg @click="isOpen = !isOpen" xmlns="http://www.w3.org/2000/svg" class="fixed top-[85px] left-0 w-6 h-6 cursor-pointer text-gray-800 hover:text-gray-600
         transition-all duration-300 ease-in-out z-50" :class="{ 'rotate-180 text-gray-600': !isOpen, 'left-[230px]': isOpen }"
            fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd"
                d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                clip-rule="evenodd" />
        </svg>
        <!-- Sidebar -->
        <aside
            class="fixed top-0 mt-[75px] z-40 left-0 h-screen w-64 bg-gray-800 text-gray-200 shadow-lg border-r border-gray-700 rounded-r-[25px] flex flex-col justify-between transition-transform duration-300"
            :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }">
            <!-- Menu Items -->
            <nav class="flex-1 px-4 py-6 space-y-2 text-sm font-medium">
                <!-- Profile Section -->
                <div v-if="store.user">
                    <button @click="showProfile = !showProfile"
                        class="flex items-center gap-3 w-full -mt-5 px-3 py-2 rounded-lg transition-colors group">
                        <UserIcon class="w-5 h-5 text-gray-300 group-hover:text-green-400" />
                        <span class="text-gray-200 group-hover:text-orange-600">Profile</span>
                    </button>
                    <transition name="slide-fade">
                        <Profile v-if="showProfile" class="mt-1" />
                    </transition>
                </div>

                <!-- Auth Links -->
                <div v-else class="flex flex-col gap-2">
                    <RouterLink :to="{ name: 'Login' }"
                        class="flex items-center gap-3 px-3 py-2 rounded-lg text-purple-400 hover:bg-gray-700 hover:text-green-400 transition-colors group">
                        <svg class="w-5 h-5 text-purple-400 group-hover:text-green-400" fill="none"
                            stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12H3m12 0l-4-4m4 4l-4 4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Sign In
                    </RouterLink>

                    <RouterLink :to="{ name: 'Register' }"
                        class="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-400 hover:bg-gray-700 hover:text-green-400 transition-colors group">
                        <svg class="w-5 h-5 text-blue-400 group-hover:text-green-400" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Sign Up
                    </RouterLink>
                </div>

                <RouterLink :to="{ name: 'Shop' }"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors group"
                    :class="{ 'bg-gray-700 text-green-400': $route.name === 'Shop' }">
                    <ShoppingBagIcon class="w-5 h-5 text-gray-300 group-hover:text-green-400" />
                    Shop
                </RouterLink>

                <RouterLink :to="{ name: 'OrderHistory' }"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors group"
                    :class="{ 'bg-gray-700 text-green-400': $route.name === 'OrderHistory' }">
                    <ClockIcon class="w-5 h-5 text-gray-300 group-hover:text-green-400" />
                    My Order Historys
                </RouterLink>

                <!-- Admin Links -->
                <RouterLink v-if="store.user?.is_admin" :to="{ name: 'OrderLists' }"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors group"
                    :class="{ 'bg-gray-700 text-green-400': $route.name === 'OrderLists' }">
                    <InboxIcon class="w-5 h-5 text-gray-300 group-hover:text-green-400" />
                    Orders List
                </RouterLink>

                <RouterLink v-if="store.user?.is_admin" :to="{ name: 'Create' }"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors group"
                    :class="{ 'bg-gray-700 text-green-400': $route.name === 'Create' }">
                    <SparklesIcon class="w-5 h-5 text-gray-300 group-hover:text-green-400" />
                    Create Product
                </RouterLink>
            </nav>
        </aside>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore';
import { InboxIcon, SparklesIcon, UserIcon, ShoppingBagIcon, ClockIcon } from '@heroicons/vue/24/solid';
import Profile from './Profile.vue';
import { ref } from 'vue';

const showProfile = ref(false);
const isOpen = ref(true);
const store = useUserStore();
</script>

<style>
/* Sidebar + Arrow slide-fade transition */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(-20px);
    /* slides in from left */
}
</style>
