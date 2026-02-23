<template>
  <div
    class="w-full max-w-sm bg-transparent rounded-2xl border-t-2 border-gray-600/50 ml-8 sm:ml-0 shadow-lg shadow-gray-600 hover:shadow-gray-500 transition p-6 h-[420px] flex flex-col">
    <!-- Product Image -->
    <router-link :to="{ name: 'Detail', params: { id: product.id } }">
      <img class="w-full h-52 object-contain rounded-lg mb-5 transition hover:scale-[1.03]"
        :src="product.image ? imageUrl : 'public/favicon.ico'" :alt="product?.name" />
    </router-link>

    <!-- Category + Stock -->
    <div class="flex items-center mb-4 gap-2">
      <span class="bg-gray-800 text-cyan-300 text-xs font-medium px-2 py-1 rounded-md">
        {{ product.category.name }}
      </span>
      <span class="text-xs font-medium px-2 py-1 rounded-md" :class="product.stock < 3
        ? 'text-red-400 bg-gray-700'
        : 'text-emerald-300 bg-gray-700'
        ">
        Available: {{ product.stock }}
      </span>
    </div>

    <!-- Product Name -->
    <h5
      class="text-lg font-semibold text-cyan-400 mt-2 text-shadow-lg text-shadow-DEFAULT tracking-tight leading-snug line-clamp-2 capitalize">
      {{ product.name }}
    </h5>

    <div class="flex items-center mt-1">
      <!-- If avgRatings exists -->
      <template v-if="avgRatings">
        <svg v-for="n in 5" :key="n" class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
          :class="n <= avgRatings ? 'text-amber-400' : 'text-gray-500'">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 
        3.967a1 1 0 00.95.69h4.178c.969 0 
        1.371 1.24.588 1.81l-3.385 2.46a1 
        1 0 00-.364 1.118l1.287 3.966c.3.922-.755 
        1.688-1.54 1.118l-3.385-2.46a1 1 0 
        00-1.176 0l-3.385 2.46c-.785.57-1.84-.196-1.54-1.118l1.287-3.966a1 
        1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 
        1 0 00.95-.69l1.286-3.967z" />
        </svg>
        <span class="ml-2 text-xs text-gray-400">({{ avgRatings }}.0)</span>
      </template>

      <!-- If avgRatings does not exist -->
      <template v-else>
        <svg v-for="n in 5" :key="n" class="w-4 h-4 text-gray-500 fill-current" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 
        3.967a1 1 0 00.95.69h4.178c.969 0 
        1.371 1.24.588 1.81l-3.385 2.46a1 
        1 0 00-.364 1.118l1.287 3.966c.3.922-.755 
        1.688-1.54 1.118l-3.385-2.46a1 1 0 
        00-1.176 0l-3.385 2.46c-.785.57-1.84-.196-1.54-1.118l1.287-3.966a1 
        1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 
        1 0 00.95-.69l1.286-3.967z" />
        </svg>
        <span class="ml-2 text-xs text-gray-400">(No ratings yet)</span>
      </template>
    </div>


    <!-- Price + Button pinned at bottom -->
    <div class="flex items-center justify-between mt-auto">
      <span class="text-2xl font-bold text-white">
        <span class="text-2xl text-amber-500">$</span>{{ product.price }}
      </span>

      <button @click="addToCart" type="button"
        class="inline-flex items-center gap-1.5 hover:bg-neutral-800 rounded-2xl text-cyan-300 text-sm font-medium px-4 py-2 border-gray-600 shadow-sm shadow-gray-300/50 transition duration-200 focus:outline-none">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4
         2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4
         2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
        </svg>
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "@/stores/useProductStore";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { onMounted, watch } from "vue";
import { useAvgRatings } from "@/composable/getAvgRating";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  computed: {
    imageUrl() {
      if (!this.product.image) {
        return "/no-image.png";
      }
      return `http://localhost:8000/storage/${this.product.image}`;
    },
  },

  setup(props) {
    let cart = useProductStore();
    let router = useRouter();

    const addToCart = async () => {
      const result = await Swal.fire({
        title: "Add to Cart?",
        text: "This product will be added to your cart.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#4f46e5",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, Add",
        cancelButtonText: "Cancel",
        background: "#1f2937",
        color: "#e5e7eb",
      });

      if (result.isConfirmed) {
        cart.addItem(props.product, 1);

        Swal.fire({
          icon: "success",
          title: "Added!",
          text: "Product added to cart successfully.",
          timer: 1500,
          showConfirmButton: false,
          background: "#1f2937",
          color: "#e5e7eb",
        });

        setTimeout(() => {
          router.push({ name: "CheckOut" });
        }, 1500);
      }
    };

    let { avgRatings, fetchAvgRatings } = useAvgRatings()

    onMounted(() => {
      fetchAvgRatings(props.product.id);
    })

    watch(() => props.product.id, (newId) => { if (newId) fetchAvgRatings(newId); });

    return {
      addToCart, avgRatings
    };
  },
};
</script>
