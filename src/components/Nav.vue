<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-neutral-950 transition-colors duration-300">
    <div class="px-6 py-3 flex items-center justify-between">

      <!-- Left: Logo -->
      <div class="flex items-center gap-2">
        <img src="/public/navlogo2.png" alt="ShopSphere Logo" class="w-[130px] py-2 h-auto" />
      </div>

      <!-- Center: Navigation Links -->
      <ul class="flex gap-6 text-sm font-medium text-cyan-300">
        <!-- Home -->
        <!-- Home -->
        <li>
          <RouterLink :to="{ name: 'Home' }"
            class="flex items-center gap-1 px-2 py-1 rounded-md transition-all duration-300 hover:text-shadow-xl hover:text-shadow-modern"
            :class="{ 'text-shadow-xl text-shadow-modern': $route.name === 'Home' }">
            <!-- Home Icon (solid style) -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2.5L2 9h1v8h5v-5h4v5h5V9h1L10 2.5z" />
            </svg>

            Home
          </RouterLink>
        </li>

        <!-- Cart -->
        <li>
          <RouterLink :to="{ name: 'CheckOut' }"
            class="flex items-center gap-1 px-2 py-1 rounded-md relative transition-all duration-300 hover:text-shadow-xl hover:text-shadow-modern"
            :class="{ 'text-shadow-xl text-shadow-modern': $route.name === 'CheckOut' }">
            <!-- Shopping Cart Icon (solid style) -->
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13L17 13M7 13H5.4" />
            </svg>
            Cart
            <span
              class="absolute -top-2 -right-3 bg-neutral-600 text-cyan-400 text-xs font-semibold rounded-full px-2 py-0.5">
              {{ count }}
            </span>
          </RouterLink>
        </li>

      </ul>


    </div>
  </nav>
</template>

<script>
import { useProductStore } from "@/stores/useProductStore";
import { useUserStore } from "@/stores/useUserStore";
import { computed } from "vue";

export default {
  name: "NavBar",
  setup() {
    let store = useUserStore();
    let cartStore = useProductStore();
    let count = computed(() => {
      return cartStore.count
    })
    return { store, count };
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  color: #fff;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.nav-links li {
  font-size: 1rem;
}

.nav-links a {
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #ffd700;
}

.cart-link {
  font-weight: bold;
}

/* Make active route use cyan text with modern text shadow */
:deep(.router-link-active),
:deep(.router-link-exact-active) {
  color: inherit !important;
  /* keep cyan-300 from parent */
  text-shadow: 2px 2px 10px rgba(0, 255, 255, 0.7);
  /* modern bright cyan shadow */
}

/* Auth buttons */
.auth-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Login button */
.login-btn {
  background-color: #f9fafb;
  color: #333;
}

.login-btn:hover {
  background-color: #e5e7eb;
  color: #9013fe;
}

/* Register button */
.register-btn {
  background-color: #9013fe;
  color: #fff;
}

.register-btn:hover {
  background-color: #7a0fd1;
  color: #ffd700;
}

/* Logout button */
.logout-btn {
  background-color: #ef4444;
  /* red */
  color: #fff;
}

.logout-btn:hover {
  background-color: #dc2626;
  /* darker red */
  color: #ffd700;
}

/* Group username + buttons */
.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  /* space between username and buttons */
}

.username {
  font-weight: 600;
  color: #ffd700;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.username:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  cursor: pointer;
}
</style>
