<template>
  <div class="w-full max-w-4xl mx-auto px-2 mt-4 mb-8 glass-container">
    <div class="flex items-center gap-2">
      <!-- Prev Button -->
      <button @click="prevPage" :disabled="currentPage === 1 || loading"
        class="px-4 py-2 rounded-lg bg-neutral-900 text-cyan-300 font-semibold shadow-md backdrop-blur-md hover:bg-neutral-800 disabled:opacity-40 transition">
        Previous
      </button>

      <!-- Categories Scroll Container -->
      <div class="flex-1 overflow-x-auto custom-scrollbar">
        <div class="flex gap-2 w-max">
          <!-- Skeleton Loading -->
          <template v-if="loading">
            <div v-for="n in 5" :key="n" class="h-8 w-24 rounded-full bg-neutral-800 animate-pulse"></div>
          </template>

          <!-- Real Categories -->
          <template v-else>
            <button v-for="cat in categories" :key="cat.id" @click="selectCategory(cat.name)" :class="[
              'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition backdrop-blur-md',
              activeCategory === cat.name
                ? 'bg-neutral-800 text-cyan-300 shadow-md'
                : 'bg-neutral-900 text-cyan-300 hover:bg-neutral-800',
            ]">
              {{ cat.name }}
            </button>

            <!-- Clear -->
            <button v-if="activeCategory" @click="clearCategory"
              class="px-4 py-1.5 rounded-full bg-neutral-900 text-cyan-300 text-sm font-medium hover:bg-neutral-800 backdrop-blur-md">
              All
            </button>
          </template>
        </div>
      </div>

      <!-- Next Button -->
      <button @click="nextPage" :disabled="currentPage === lastPage || loading"
        class="px-4 py-2 rounded-lg bg-neutral-900 text-cyan-300 font-semibold shadow-md backdrop-blur-md hover:bg-neutral-800 disabled:opacity-40 transition">
        Next
      </button>
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
    const { selectedCategory: activeCategory, loading: storeLoading } =
      storeToRefs(searchCategoryStore);

    const selectCategory = (categoryName) => {
      searchCategoryStore.searchByProductCategory(categoryName);
    };

    const clearCategory = () => {
      searchCategoryStore.clearCategory();
    };

    return {
      categories,
      currentPage,
      lastPage,
      prevPage,
      nextPage,
      activeCategory,
      selectCategory,
      clearCategory,
      loading
    };
  },
};
</script>


<style scoped>
/* Glass effect container */
.glass-container {
  border-radius: 12px;
  backdrop-filter: blur(12px);
}

/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(69, 71, 74, 0.6);
  /* neutral-900 translucent */
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #042126, #06333b);
  /* cyan-300 tones */
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #06b6d4, #0891b2);
}
</style>