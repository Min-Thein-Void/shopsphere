<template>
  <div class="flex flex-col items-center w-full max-w-4xl mx-auto px-2">
    <!-- Categories + Pagination -->
    <div class="mt-4 mb-8 w-full flex flex-wrap justify-center items-center gap-2 sm:gap-3">

      <!-- Prev Button -->
      <button @click="prevPage" :disabled="currentPage === 1"
        class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-neutral-800 text-cyan-200 shadow hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
        ◀
      </button>

      <!-- Category Buttons -->
      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="selectCategory(cat.name)"
        :class="[
          'px-2 sm:px-3 py-1 sm:py-2 rounded-full shadow-md text-xs sm:text-sm font-medium whitespace-nowrap',
          activeCategory === cat.name
            ? 'text-cyan-500 bg-gray-800'
            : 'bg-neutral-800 text-cyan-300 hover:bg-gray-700'
        ]"
      >
        {{ cat.name }}
      </button>

      <!-- Clear Button -->
      <button v-if="activeCategory !== null"
        @click="clearCategory"
        :disabled="loading"
        class="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-pink-600 text-white text-xs sm:text-sm font-medium shadow hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed">
        Clear Filter
      </button>

      <!-- Next Button -->
      <button @click="nextPage" :disabled="currentPage === lastPage"
        class="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-neutral-800 text-cyan-200 shadow hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">
        ▶
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
import { storeToRefs } from "pinia";

export default {
  setup() {
    const { categories, loading, currentPage, lastPage, prevPage, nextPage } =
      useCategories();

    const searchCategoryStore = useSearchCategoryStore();
    const { selectedCategory: activeCategory, loading: storeLoading } = storeToRefs(searchCategoryStore);

    const selectCategory = (categoryName) => {
      searchCategoryStore.searchByProductCategory(categoryName);
    };

    const clearCategory = () => {
      searchCategoryStore.clearCategory();
    };

    return {
      categories,
      loading: storeLoading,
      currentPage,
      lastPage,
      prevPage,
      nextPage,
      activeCategory,
      selectCategory,
      clearCategory,
    };
  },
};
</script>