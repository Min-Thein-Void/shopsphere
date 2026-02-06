<template>
    <div class="flex flex-col items-center w-full max-w-4xl mx-auto px-2">
        <!-- Categories + Pagination -->
        <div class="mt-4 mb-8 w-full flex flex-wrap justify-center items-center gap-2 sm:gap-3">
            <!-- Prev Button -->
            <button @click="prevPage" :disabled="currentPage === 1"
                class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-700 text-white shadow hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                <!-- Left Arrow SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <!-- Category Buttons -->
            <button v-for="cat in categories" :key="cat.id" @click="selectCategory(cat)" :class="[
                'px-2 sm:px-3 py-1 sm:py-2 rounded-full shadow-md text-xs sm:text-sm font-medium whitespace-nowrap',
                activeCategory?.id === cat.id
                    ? 'text-orange-600 bg-gray-800'
                    : 'bg-gray-800 text-gray-200 hover:bg-gray-700'
            ]">
                {{ cat.name }}
            </button>

            <!-- Next Button -->
            <button @click="nextPage" :disabled="currentPage === lastPage"
                class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-700 text-white shadow hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
                <!-- Right Arrow SVG -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>

        <!-- Loading Indicator -->
        <div v-if="loading" class="mt-6 text-gray-500 font-medium">
            Loading categories...
        </div>
    </div>
</template>


<script>
import useCategories from "@/composable/getCategories";
import { useSearchCategoryStore } from "@/stores/searchCategoryStore";
import { ref, watch } from "vue";

export default {
    setup() {
        const { categories, loading, currentPage, lastPage, prevPage, nextPage } =
            useCategories();

        const searchCategoryStore = useSearchCategoryStore();

        const activeCategory = ref(null);

        const selectCategory = (cat) => {
            activeCategory.value = cat;
            searchCategoryStore.searchByProductCategory(cat.name);
        };

        // Clear activeCategory if search result is empty
        watch(
            () => searchCategoryStore.searchCategoryResult,
            (newResults) => {
                if (activeCategory.value && newResults.length === 0) {
                    activeCategory.value = null;
                }
            }
        );

        return {
            categories,
            loading,
            currentPage,
            lastPage,
            prevPage,
            nextPage,
            activeCategory,
            selectCategory,
        };
    },
};
</script>

<style scoped>
button {
    transition: background-color 0.2s ease;
}
</style>
