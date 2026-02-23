<template>
    <div>
        <!-- Toggle Arrow -->
        <svg @click="isOpen = !isOpen" xmlns="http://www.w3.org/2000/svg" class="fixed top-[85px] left-0 w-6 h-6 cursor-pointer text-cyan-400 hover:text-cyan-500
             transition-all duration-300 ease-in-out z-50"
            :class="{ 'rotate-180 text-cyan-300': !isOpen, 'left-[230px] text-neutral-900': isOpen }" fill="currentColor"
            viewBox="0 0 24 24" aria-hidden="true">
            <path fill-rule="evenodd"
                d="M10.271 5.575C8.967 4.501 7 5.43 7 7.12v9.762c0 1.69 1.967 2.618 3.271 1.544l5.927-4.881a2 2 0 0 0 0-3.088l-5.927-4.88Z"
                clip-rule="evenodd" />
        </svg>

        <!-- Sidebar -->
        <aside
            class="fixed top-0 mt-18 z-40 left-0 h-screen w-64 bg-neutral-900 text-cyan-500 shadow-lg flex flex-col justify-between transition-transform duration-300"
            :class="{ '-translate-x-full': !isOpen, 'translate-x-0': isOpen }">
            <!-- Menu Items -->
            <nav class="flex-1 px-4 py-6 space-y-2 text-sm font-medium">
                <!-- Profile Section -->
                <div v-if="store.user">
                    <button @click="showProfile = !showProfile"
                        class="flex items-center gap-3 w-full -mt-5 px-3 py-2 rounded-lg transition-all duration-300 hover:text-cyan-400 hover:shadow-modern group">
                        <UserIcon class="w-5 h-5 text-cyan-400 group-hover:text-cyan-500" />
                        <span class="group-hover:text-cyan-500">Profile</span>
                    </button>
                    <transition name="slide-fade">
                        <Profile v-if="showProfile" class="mt-1" />
                    </transition>
                </div>

                <!-- Auth Links -->
                <div v-else class="flex flex-col gap-2">
                    <RouterLink :to="{ name: 'Login' }"
                        class="flex items-center gap-3 px-3 py-2 rounded-lg text-cyan-400 hover:text-white hover:bg-cyan-400 transition-all duration-300 group">
                        <svg class="w-5 h-5 text-cyan-400 group-hover:text-white" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 12H3m12 0l-4-4m4 4l-4 4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Sign In
                    </RouterLink>

                    <RouterLink :to="{ name: 'Register' }"
                        class="flex items-center gap-3 px-3 py-2 rounded-lg text-cyan-400 hover:text-white hover:bg-cyan-400 transition-all duration-300 group">
                        <svg class="w-5 h-5 text-cyan-400 group-hover:text-white" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Sign Up
                    </RouterLink>
                </div>

                <!-- Navigation Links -->
                <RouterLink :to="{ name: 'Shop' }"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:text-white hover:bg-cyan-400 group"
                    :class="{ 'bg-cyan-400 text-white shadow-modern': $route.name === 'Shop' }">
                    <ShoppingBagIcon class="w-5 h-5 text-cyan-400 group-hover:text-white" />
                    Shop
                </RouterLink>

                <RouterLink :to="{ name: 'OrderHistory' }"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:text-white hover:bg-cyan-400 group"
                    :class="{ 'bg-cyan-400 text-white shadow-modern': $route.name === 'OrderHistory' }">
                    <ClockIcon class="w-5 h-5 text-cyan-400 group-hover:text-white" />
                    My Orders
                </RouterLink>

                <!-- Admin Links -->
                <RouterLink v-if="store.user?.is_admin" :to="{ name: 'OrderLists' }"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:text-white hover:bg-cyan-400 group"
                    :class="{ 'bg-cyan-400 text-white shadow-modern': $route.name === 'OrderLists' }">
                    <InboxIcon class="w-5 h-5 text-cyan-400 group-hover:text-white" />
                    Orders List
                </RouterLink>

                <RouterLink v-if="store.user?.is_admin" :to="{ name: 'Create' }"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 hover:text-white hover:bg-cyan-400 group"
                    :class="{ 'bg-cyan-400 text-white shadow-modern': $route.name === 'Create' }">
                    <SparklesIcon class="w-5 h-5 text-cyan-400 group-hover:text-white" />
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
