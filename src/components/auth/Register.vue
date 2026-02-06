<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900">
    <div class="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8 border border-white/20">
      <h2 class="text-2xl font-bold text-orange-400 mb-6 text-center">
        Register
      </h2>

      <form class="space-y-4" @submit.prevent="handleSubmit">

        <!-- Name -->
        <div>
          <label class="block text-sm text-gray-300 mb-1">Name</label>
          <input type="text" v-model="name"
            class="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter your name" />
          <p v-if="errors.name" class="text-red-400 text-sm mt-1">
            {{ errors.name }}
          </p>
        </div>

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
          {{ loading ? "Registering..." : "Register" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import api from "@/plugins/axios";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "vue-router";

export default {
  setup() {
    let store = useUserStore();
    let router = useRouter()

    const name = ref("");
    const email = ref("");
    const password = ref("");
    const loading = ref(false);

    const errors = reactive({
      name: "",
      email: "",
      password: "",
    });

    const validate = () => {
      errors.name = "";
      errors.email = "";
      errors.password = "";

      if (!name.value) {
        errors.name = "Name is required";
      }

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

      return !errors.name && !errors.email && !errors.password;
    };

    const handleSubmit = async () => {
      if (!validate()) return;

      loading.value = true;

      try {
        const res = await api.post("/api/auth/register", {
          name: name.value,
          email: email.value,
          password: password.value,
        });
        const token = res.data.token;
        localStorage.setItem("auth_token", token);

        store.setUser(res.data.user)
        localStorage.setItem("user", JSON.stringify(res.data.user))
        
        router.push({name:"Shop"})

      } catch (err) {
        alert(err.response?.data?.message || "Registration failed");
      } finally {
        loading.value = false;
      }
    };
    return {
      name,
      email,
      password,
      errors,
      loading,
      handleSubmit,
    };
  },
};
</script>
