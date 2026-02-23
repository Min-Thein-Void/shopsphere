<template>
  <div class="min-h-screen bg-neutral-950 font-sans font-semibold">
    <main class="pt-24 px-4 pb-10 w-full">
      <!-- Search and Categories -->
      <SearchInput />
      <CategoriesList />

      <!-- Skeleton Loader -->
      <div v-if="loading || searchStore.loading || searchCategoryStore.loading"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        <!-- Skeleton Card -->
        <div v-for="n in 6" :key="n"
          class="w-full max-w-sm bg-transparent rounded-2xl border-t-2 border-gray-600/50 ml-0 shadow-lg shadow-gray-600 p-6 h-[420px] flex flex-col animate-pulse">

          <!-- Image Placeholder -->
          <div class="w-full h-52 bg-gray-700 rounded-lg mb-5"></div>

          <!-- Category + Stock Placeholder -->
          <div class="flex items-center mb-4 gap-2">
            <div class="w-20 h-5 bg-gray-700 rounded-md"></div>
            <div class="w-24 h-5 bg-gray-700 rounded-md"></div>
          </div>

          <!-- Product Name Placeholder -->
          <div class="w-3/4 h-6 bg-gray-600 rounded mb-3"></div>

          <!-- Price + Button Placeholder -->
          <div class="flex items-center justify-between mt-auto">
            <div class="w-16 h-6 bg-gray-600 rounded"></div>
            <div class="w-24 h-8 bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Product v-for="product in displayedProducts" :key="product.id" :product="product" />
      </div>
    </main>
  </div>
</template>


<script>
import { ref, onMounted, computed } from "vue";
import Product from "./Product.vue";
import SearchInput from "./SearchInput.vue";
import CategoriesList from "./CategoriesList.vue";
import { getProducts } from "@/composable/getProducts";
import { useSearchStore } from "@/stores/useSearchStore";
import { useSearchCategoryStore } from "@/stores/searchCategoryStore";

export default {
  components: { Product, SearchInput, CategoriesList },
  setup() {
    const loading = ref(true);
    const { products, fetchProducts } = getProducts();

    const searchStore = useSearchStore();
    const searchCategoryStore = useSearchCategoryStore();

    // Fetch products on mount
    onMounted(async () => {
      await fetchProducts();
      loading.value = false;
    });

    // Compute displayed products based on search and category
    const displayedProducts = computed(() => {
      if (searchStore.searchResults.length)
        return searchStore.searchResults;
      if (searchCategoryStore.searchCategoryResult.length)
        return searchCategoryStore.searchCategoryResult;
      return products.value;
    });

    return {
      loading,
      searchStore,
      searchCategoryStore,
      displayedProducts,
    };
  },
};
</script>
