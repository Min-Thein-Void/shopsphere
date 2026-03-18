<template>
  <div
    class="relative w-full max-w-sm bg-transparent rounded-2xl border-t-2 border-gray-600/50 ml-8 sm:ml-0 shadow-lg shadow-gray-600 hover:shadow-gray-500 transition p-6 h-125 flex flex-col"
  >
    <!-- Discount Ribbon -->
    <div
      v-if="product.discount_label"
      class="absolute left-0 -top-0.5 h-16 w-16"
    >
      <div
        class="absolute transform bg-fuchsia-950 text-center text-white font-semibold py-1 -right-6.5 top-0 w-22.5 rounded-tl-2xl rounded-br-2xl"
      >
        {{ product.discount_label }}
      </div>
    </div>

    <!-- Product Image -->
    <router-link :to="{ name: 'Detail', params: { id: product.id } }">
      <img
        class="w-full h-52 object-contain rounded-lg mb-5 transition hover:scale-[1.03]"
        :src="product.image ? imageUrl : 'public/favicon.ico'"
        :alt="product?.name"
      />
    </router-link>

    <!-- Category + Stock -->
    <div class="flex items-center mb-4 gap-2">
      <span
        class="bg-gray-800 text-cyan-300 text-xs font-medium px-2 py-1 rounded-md"
      >
        {{ product.category.name }}
      </span>
      <span
        class="text-xs font-medium px-2 py-1 rounded-md"
        :class="
          product.stock < 3
            ? 'text-red-400 bg-gray-700'
            : 'text-emerald-300 bg-gray-700'
        "
      >
        Available: {{ product.stock }}
      </span>
    </div>

    <!-- Product Name -->
    <h5
      class="text-lg font-semibold text-cyan-400 mt-2 tracking-tight leading-snug line-clamp-2 capitalize"
    >
      {{ product.name }}
    </h5>

    <!-- Ratings -->
    <div class="flex items-center mt-1">
      <template v-if="avgRatings">
        <svg
          v-for="n in 5"
          :key="n"
          class="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          :class="n <= avgRatings ? 'text-amber-400' : 'text-gray-500'"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 
                   3.967a1 1 0 00.95.69h4.178c.969 0 
                   1.371 1.24.588 1.81l-3.385 2.46a1 
                   1 0 00-.364 1.118l1.287 3.966c.3.922-.755 
                   1.688-1.54 1.118l-3.385-2.46a1 1 0 
                   00-1.176 0l-3.385 2.46c-.785.57-1.84-.196-1.54-1.118l1.287-3.966a1 
                   1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 
                   1 0 00.95-.69l1.286-3.967z"
          />
        </svg>
        <span class="ml-2 text-xs text-gray-400">
          ({{ Number(avgRatings).toFixed(1) }})
        </span>
      </template>
      <template v-else>
        <svg
          v-for="n in 5"
          :key="n"
          class="w-4 h-4 text-gray-500 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 
                   3.967a1 1 0 00.95.69h4.178c.969 0 
                   1.371 1.24.588 1.81l-3.385 2.46a1 
                   1 0 00-.364 1.118l1.287 3.966c.3.922-.755 
                   1.688-1.54 1.118l-3.385-2.46a1 1 0 
                   00-1.176 0l-3.385 2.46c-.785.57-1.84-.196-1.54-1.118l1.287-3.966a1 
                   1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 
                   1 0 00.95-.69l1.286-3.967z"
          />
        </svg>
        <span class="ml-2 text-xs text-gray-400">(No ratings yet)</span>
      </template>
    </div>

    <!-- Price + Buttons pinned at bottom -->
    <div class="flex items-center justify-between mt-auto">
      <div class="flex flex-col">
        <!-- Original Price -->
        <span
          v-if="product.discount_type"
          class="text-lg text-gray-400 line-through"
        >
          ${{ product.price }}
        </span>
        <!-- Final Price -->
        <span class="text-2xl font-bold text-white mr-3">
          <span class="text-amber-500">$</span>{{ product.final_price }}
        </span>
      </div>

      <div class="flex gap-2">
        <!-- Add to Cart -->
        <button
          @click="addToCart"
          type="button"
          class="inline-flex items-center gap-1 hover:bg-neutral-800 rounded-lg text-cyan-300 text-xs font-medium px-2.5 py-1.5 shadow-sm transition duration-200 focus:outline-none"
        >
          🛒 Cart
        </button>

        <!-- Add to Wishlist -->
        <button
          @click="addToWishlist(product.id)"
          type="button"
          class="inline-flex items-center gap-1 hover:bg-neutral-800 rounded-lg text-pink-400 text-xs font-medium px-2.5 py-1.5 shadow-sm transition duration-200 focus:outline-none"
        >
          ❤️ Wishlist
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "@/stores/useProductStore";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { onMounted, watch } from "vue";
import { useAvgRatings } from "@/composable/getAvgRating";
import api from "@/plugins/axios";

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
    let router = useRouter();
    //addToCart
    let cart = useProductStore();
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
    //addToCart
    //rating
    let { avgRatings, fetchAvgRatings } = useAvgRatings();
    onMounted(() => {
      fetchAvgRatings(props.product.id, true);
    });
    watch(
      () => props.product.id,
      (newId) => {
        if (newId) fetchAvgRatings(newId);
      },
    );
    //rating
    
    const addToWishlist = async (id) => {
      const token = localStorage.getItem("auth_token");
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to add this product to your wishlist?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#22d3ee",
        cancelButtonColor: "#ef4444",
        confirmButtonText: "Yes, add it!",
        cancelButtonText: "Cancel",
        background: "#1a1a1a",
        color: "#22d3ee",
      });

      if (!confirmResult.isConfirmed) {
        return;
      }
      Swal.fire({
        title: "Adding to Wishlist...",
        text: "Please wait while we save your product.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
        background: "#1a1a1a",
        color: "#22d3ee",
      });

      try {
        const res = await api.post(
          "/api/auth/add/wishlist",
          { product_id: id },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (res.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Added!",
            text: "Product has been added to your wishlist.",
            confirmButtonColor: "#22d3ee",
            background: "#1a1a1a",
            color: "#22d3ee",
          });

          router.push({ name: "Wishlist" });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            error.response?.data?.message ||
            "Failed to add product to wishlist.",
          confirmButtonColor: "#ef4444",
          background: "#1a1a1a",
          color: "#22d3ee",
        });
      }
    };

    return {
      addToCart,
      avgRatings,
      addToWishlist,
    };
  },
};
</script>
