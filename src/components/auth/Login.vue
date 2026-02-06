<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div class="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8 border border-white/20">
      <h2 class="text-2xl font-bold text-orange-400 mb-6 text-center">
        Login to see products
      </h2>

      <form class="space-y-4" @submit.prevent="handleLogin">

        <!-- Email -->
        <div>
          <label class="block text-sm text-gray-300 mb-1">Email</label>
          <input type="email" v-model="email"
            class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter your email" />
          <p v-if="errors.email" class="text-red-400 text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm text-gray-300 mb-1">Password</label>
          <input type="password" v-model="password"
            class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter your password" />
          <p v-if="errors.password" class="text-red-400 text-sm mt-1">
            {{ errors.password }}
          </p>
        </div>

        <!-- Submit -->
        <button type="submit" :disabled="loading"
          class="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50">
          {{ loading ? "Logging in..." : "Login" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import api from "@/plugins/axios";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/useUserStore";

export default {
  setup() {
    let store = useUserStore()

    const email = ref("");
    const password = ref("");
    const loading = ref(false);
    const errors = reactive({
      email: "",
      password: "",
    });

    const router = useRouter();

    const validate = () => {
      errors.email = "";
      errors.password = "";

      if (!email.value) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        errors.email = "Invalid email format";
      }

      if (!password.value) {
        errors.password = "Password is required";
      } else if (password.value.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }

      return !errors.email && !errors.password;
    };

    const handleLogin = async () => {
      if (!validate()) return;

      loading.value = true;

      try {
        const res = await api.post("/api/auth/login", {
          email: email.value,
          password: password.value,
        });
        store.setUser(res.data.user);
        store.setToken(res.data.token);
        router.push({ name: "Shop" });

      } catch (error) {
        alert(error.response?.data?.message || "Login failed");
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      password,
      errors,
      loading,
      handleLogin,
    };
  },
};
</script>
