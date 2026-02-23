<template>
  <section class="bg-neutral-950 text-cyan-300 mt-[50px] font-sans">
    <!-- Hero Section -->
    <div class="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
      <div class="space-y-4">
        <p class="font-sans text-cyan-300 font-semibold">✨ New Season • Limited Drops</p>
        <h1 class="text-4xl font-heading font-bold text-cyan-300 text-shadow-modern">
          Elevate your everyday—<span class="text-cyan-300">ShopSphere</span>
        </h1>
        <p class="text-white/80 font-sans">
          Discover curated collections, playful toys, and premium essentials. Built for comfort, designed for joy.
        </p>
        <div class="flex gap-4 mt-4">
          <RouterLink :to="{ name: 'Shop' }"
            class="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg shadow-md transition font-sans">
            Shop now
          </RouterLink>
          <RouterLink :to="{ name: 'Register' }" v-show="!authStore.isAuthenticated"
            class="px-5 py-2 border border-cyan-300 text-cyan-300 rounded-lg hover:bg-cyan-500 hover:text-white transition font-sans">
            Create account
          </RouterLink>
        </div>
        <ul class="mt-6 space-y-2 text-sm text-cyan-300 font-sans">
          <li><strong class="text-cyan-300 font-sans">Fast shipping:</strong> 1–3 days nationwide</li>
          <li><strong class="text-cyan-300 font-sans">Secure checkout:</strong> Encrypted payments</li>
          <li><strong class="text-cyan-300 font-sans">Easy returns:</strong> 30‑day policy</li>
        </ul>
      </div>
      <div>
        <img src="/public/ecommerce.png" alt="Hero" />
      </div>
    </div>

    <!-- Promo Banner -->
    <div class="bg-gray-900 py-12 px-6 text-center">
      <h2 class="text-2xl font-heading font-bold text-cyan-300 mb-2 text-shadow-modern">
        Everyone can be a trendsetter
      </h2>
      <p class="text-cyan-300 mb-4 font-sans">Style starts with confidence. Explore our latest drops and express
        yourself.</p>
      <RouterLink :to="{ name: 'Shop' }"
        class="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg shadow-md transition font-sans">
        Explore Now
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore';
import { RouterLink } from 'vue-router'

const authStore = useUserStore();
</script>
