<template>
  <div class="min-h-screen bg-gray-900 font-sans font-semibold">
    <main class="pt-24 px-4 pb-10 w-full">
      <!-- Search and Categories -->
      <SearchInput />
      <CategoriesList />

      <!-- Skeleton Loader -->
      <div v-if="loading || searchStore.loading || searchCategoryStore.loading"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="n in 6" :key="n" class="rounded-lg shadow-md bg-gray-800 p-4 animate-pulse">
          <div class="h-48 bg-gray-700 rounded mb-4"></div>
          <div class="h-6 bg-gray-600 rounded mb-2 w-3/4"></div>
          <div class="h-5 bg-gray-600 rounded mb-2 w-1/4"></div>
          <div class="h-4 bg-gray-700 rounded mb-2 w-full"></div>
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
