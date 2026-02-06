<template>
  <div class="w-full max-w-sm
            bg-transparent
            border border-gray-600
            ml-8      <!-- mobile margin -->
            sm:ml-0     <!-- no margin on tablet/desktop -->
            rounded-xl
            shadow-lg
            shadow-gray-600
            hover:shadow-gray-500
            transition
            p-6
            h-[420px]
            flex flex-col">
    <!-- Product Image -->
    <router-link :to="{ name: 'Detail', params: { id: product.id } }">
      <img class="w-full h-52 object-contain
               rounded-lg
               mb-5
               transition
               hover:scale-[1.03]" :src="product.image ? imageUrl : 'public/favicon.ico'" :alt="product?.name" />
    </router-link>

    <!-- Category + Stock -->
    <div class="flex items-center mb-4 gap-2">
      <span class="bg-gray-800 text-indigo-300 text-xs font-medium px-2 py-1 rounded-md">
        {{ product.category.name }}
      </span>
      <span class="text-xs font-medium px-2 py-1 rounded-md" :class="product.stock < 3
        ? 'text-red-300 bg-gray-700'
        : 'text-emerald-300 bg-gray-700'">
        Available: {{ product.stock }}
      </span>
    </div>

    <!-- Product Name -->
    <h5 class="text-lg font-semibold text-gray-100 tracking-tight leading-snug line-clamp-2">
      {{ product.name }}
    </h5>

    <!-- Price + Button pinned at bottom -->
    <div class="flex items-center justify-between mt-auto">
      <span class="text-2xl font-bold text-amber-400">
        {{ product.price }}
        <span class="text-[15px] text-gray-400 ml-1">MMK</span>
      </span>

      <button @click="addToCart" type="button" class="inline-flex items-center gap-1.5
         bg-indigo-600 hover:bg-indigo-500
         active:bg-indigo-700
         text-white text-sm font-medium
         px-4 py-2 rounded-lg
         shadow-md shadow-indigo-900/20
         transition duration-200
         focus:outline-none
         focus:ring-2 focus:ring-indigo-400/50">
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
import { useProductStore } from '@/stores/useProductStore';
import { useRouter } from 'vue-router';
import Swal from "sweetalert2";
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  computed: {
    imageUrl() {
      if (!this.product.image) {
        return '/no-image.png'
      }
      return `http://localhost:8000/storage/${this.product.image}`
    }
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
        confirmButtonColor: "#4f46e5", // indigo professional
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
    return {
      addToCart
    }
  }
}
</script>
