<template>
  <div class="min-h-screen mt-12 bg-neutral-950 text-cyan-300 py-12 px-4 md:px-8">
    <!-- Product Container -->
    <div
      class="max-w-7xl mx-auto bg-neutral-900/70 backdrop-blur border border-neutral-800 shadow-2xl rounded-2xl overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Product Image -->
        <div class="relative w-full h-87.5 md:h-125 lg:h-full bg-neutral-950 flex items-center justify-center">
          <div v-if="loading" class="animate-pulse w-full h-full bg-neutral-800"></div>

          <img v-else class="w-full h-full object-contain p-8" :src="singleproduct?.image
            ? `http://localhost:8000/storage/${singleproduct.image}`
            : '/favicon.ico'
            " alt="Product Image" />
        </div>

        <!-- Product Info -->
        <div class="flex flex-col p-6 md:p-10 space-y-8">
          <!-- Title -->
          <div class="space-y-4">
            <h1 class="text-3xl md:text-4xl font-bold tracking-tight text-cyan-300">
              {{ singleproduct?.name }}
            </h1>

            <p class="text-neutral-400 leading-relaxed text-sm md:text-base">
              {{ singleproduct?.description }}
            </p>
          </div>

          <!-- Price + Stock -->
          <!-- Price + Stock -->
          <div class="flex flex-wrap items-center gap-4">
            <!-- Show original price only if discount_type exists -->
            <span v-if="singleproduct?.discount_type" class="text-3xl font-semibold text-gray-400 line-through">
              ${{ singleproduct?.price }}
            </span>

            <!-- Always show final price -->
            <span class="text-3xl font-semibold text-cyan-400">
              ${{ singleproduct?.final_price }}
            </span>

            <span class="text-sm px-3 py-1 rounded-full" :class="singleproduct?.stock > 0
              ? 'bg-cyan-900/40 text-cyan-300'
              : 'bg-red-900/40 text-red-300'
              ">
              {{
                singleproduct?.stock > 0
                  ? `Stock : ${singleproduct.stock}`
                  : "Out of stock"
              }}
            </span>
          </div>

          <!-- Admin Discount -->
          <div v-if="user?.is_admin === 1" class="space-y-4">
            <DiscountForm v-if="!singleproduct?.discount_type" :productId="singleproduct?.id" />
            <button @click="handleDelete" v-else
              class="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-neutral-100 font-semibold transition shadow-lg hover:shadow-red-500/30">
              Remove Discount
            </button>
          </div>

          <!-- Rating -->
          <div class="space-y-3">
            <p class="text-sm text-neutral-400">Rate this product</p>

            <div class="flex gap-2">
              <svg v-for="n in 5" :key="n" @click="setRating(n)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                fill="currentColor" class="w-7 h-7 cursor-pointer transition hover:scale-110"
                :class="n <= userRating ? 'text-cyan-400' : 'text-neutral-600'">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0
                1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755
                1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.176 0l-3.385 2.46c-.785.57-1.84-.196-1.54-1.118l1.287-3.966a1
                1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1
                1 0 00.95-.69l1.286-3.967z" />
              </svg>
            </div>

            <button @click="submitRating(singleproduct.id)"
              class="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-neutral-900 font-semibold transition">
              Submit Rating
            </button>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6 border-t border-neutral-800">
            <button @click="addToCart" :disabled="singleproduct?.stock === 0"
              class="flex-1 px-7 py-3 rounded-xl bg-cyan-500 text-neutral-900 font-semibold shadow-lg hover:shadow-cyan-500/30 hover:bg-cyan-400 transition disabled:opacity-40">
              Add to Cart
            </button>

            <router-link :to="{ name: 'Shop' }"
              class="flex-1 text-center px-6 py-3 border border-neutral-700 rounded-xl hover:bg-neutral-800 transition text-neutral-300">
              Back to Shop
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Random Products -->
    <div class="mt-16 w-full max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-cyan-300 mb-8 text-center tracking-tight">
        You may also like
      </h2>
      <p class="text-center text-neutral-400 mb-10">
        Explore more products that might interest you
      </p>
      <div class="flex flex-wrap justify-center gap-6">
        <RandomProducts v-for="randomProduct in randomProducts" :key="randomProduct.id"
          :randomProduct="randomProduct" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

import { useCartProductStore } from "@/stores/useCartProductStore";
import { useProductStore } from "@/stores/useProductStore";

import RandomProducts from "./RandomProducts.vue";
import DiscountForm from "./DiscountForm.vue";

import { postRatings } from "@/composable/postRatings";
import { getRandomProducts } from "@/composable/getRandomProducts";

// props
const props = defineProps({
  id: [String, Number],
});

// stores
const productStore = useProductStore();
const cartStore = useCartProductStore();

// state
const loading = ref(true);

// computed
const singleproduct = computed(() => productStore.singleProduct);

// composables
const { fetchRandomProducts, randomProducts } = getRandomProducts();
const { setRating, submitRating, userRating } = postRatings();

// router
const router = useRouter();

// user
const user = ref(
  localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null
);

// lifecycle
onMounted(async () => {
  loading.value = true;
  await Promise.all([
    productStore.fetchSingleProduct(props.id),
    fetchRandomProducts(),
  ]);
  loading.value = false;
});

// actions
const addToCart = async () => {
  const confirm = await Swal.fire({
    title: "Add to Cart?",
    icon: "question",
    showCancelButton: true,
  });

  if (!confirm.isConfirmed) return;

  try {
    cartStore.addItem(singleproduct.value, 1);

    await Swal.fire("Added!", "Product added to cart", "success");

    router.push({ name: "CheckOut" });
  } catch {
    Swal.fire("Error", "Failed to add", "error");
  }
};

const handleDelete = async () => {
  const result = await Swal.fire({
    title: "Remove Discount?",
    text: "This action will remove the discount from this product.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, remove it",
    background: "#1a1a1a",
    color: "#22d3ee",
  });

  if (!result.isConfirmed) return;

  try {
    Swal.fire({
      title: "Processing...",
      text: "Removing discount...",
      allowOutsideClick: false,
      showConfirmButton: false,
      background: "#1a1a1a",
      color: "#22d3ee",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    await productStore.removeDiscount(props.id);

    Swal.fire({
      icon: "success",
      title: "Removed!",
      text: "Discount has been removed successfully.",
      confirmButtonColor: "#22d3ee",
      background: "#1a1a1a",
      color: "#22d3ee",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed!",
      text: "Something went wrong while removing discount.",
      confirmButtonColor: "#ef4444",
      background: "#1a1a1a",
      color: "#22d3ee",
    });
  }
};
</script>
