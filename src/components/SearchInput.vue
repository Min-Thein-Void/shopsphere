<template>
    <div class="flex justify-center mb-8 mt-6">
        <div class="relative w-full max-w-md">
            <!-- Search Icon -->
            <span class="absolute inset-y-0 left-3 flex items-center text-cyan-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
            </span>

            <!-- Input -->
            <input type="text" v-model="searchStore.searchTerm" @input="searchStore.searchProducts"
                placeholder="Search products..." class="w-full pl-10 pr-4 py-2 border-b border-cyan-500 bg-transparent text-cyan-300 placeholder-cyan-300
           focus:outline-none" />
        </div>
    </div>
</template>

<script>
import { useSearchStore } from '@/stores/useSearchStore';

export default {
    setup() {
        const searchStore = useSearchStore();

        return { searchStore }
    }
}
</script>
