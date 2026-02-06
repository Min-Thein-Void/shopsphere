<template>
  <div class="flex min-h-screen">
    <!-- Left Side: Welcome Message -->
    <div class="hidden md:flex w-1/2 mt-10 bg-gray-800 text-white flex-col justify-center items-center p-12 relative">
      <!-- Decorative background (optional gradient spheres) -->
      <div class="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 opacity-90"></div>
      <div class="relative z-10 text-center space-y-6">
        <h1 class="text-4xl font-bold">Welcome To the zone of happiness.</h1>
        <p class="text-gray-300 max-w-md mx-auto">
          Start creating products and manage your shop with ease. This is your dashboard to success.
        </p>
      </div>
    </div>

    <!-- Right Side: Form -->
    <div class="flex-1 bg-gray-900 flex mt-10 items-center justify-center p-10">
      <div class="w-full max-w-lg bg-transparent p-8">
        <h2 class="text-2xl font-bold text-gray-100 mb-6">
          Hello! Please tell us a little bit about your product.
        </h2>

        <form @submit.prevent="submitProduct" class="space-y-5">

          <!-- Product Name -->
          <input v-model="form.name" type="text" placeholder="Product Name" class="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-500" />

          <!-- Description -->
          <textarea v-model="form.description" placeholder="Description" class="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>

          <!-- Price -->
          <input v-model="form.price" type="number" placeholder="Price" class="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-500" />

          <!-- Stock -->
          <input v-model="form.stock" type="number" placeholder="Stock" class="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-500" />

          <!-- Category -->
          <select v-model="form.category_id" class="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Select Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>

          <!-- Image Upload -->
          <input type="file" @change="handleFileUpload" class="w-full p-3 rounded-lg border border-gray-600 bg-gray-700 text-gray-100
               focus:outline-none focus:ring-2 focus:ring-indigo-500" />

          <!-- Buttons -->
          <div class="flex justify-between gap-4">
            <router-link :to="{ name: 'Home' }"
              class="flex justify-center items-center w-1/2 py-3 rounded-lg bg-gray-700 text-gray-200 font-semibold hover:bg-gray-600 transition">
              ⬅ Back
            </router-link>
            <button type="submit"
              class="w-1/2 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition">
              Next ➡
            </button>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref } from "vue";
import api from "@/plugins/axios";
import useCategories from "@/composable/getCategories.js";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const { categories, loading } = useCategories();

let router = useRouter();

const form = ref({
  name: "",
  description: "",
  price: "",
  stock: "",
  category_id: "",
  image: [],
});

const handleFileUpload = (event) => {
  form.value.image = event.target.files[0];
};

const submitProduct = async () => {
  const formData = new FormData();
  formData.append("name", form.value.name);
  formData.append("description", form.value.description);
  formData.append("price", form.value.price);
  formData.append("stock", form.value.stock);
  formData.append("category_id", form.value.category_id);

  if (form.value.image) {
    formData.append("image", form.value.image);
  }

  try {
    let token = localStorage.getItem("auth_token");
    const response = await api.post("/api/create/product", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data) {
      Swal.fire({
        icon: "success",
        title: "Product Successfully Added",
        text: "The product has been created and is now available in your store.",
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
        background: "#1f2937",
        color: "#e5e7eb"
      });
      router.push({ name: 'Shop' })
    }
  } catch (error) {
    console.error("Error creating product:", error.response?.data || error.message);
  }
};
</script>
