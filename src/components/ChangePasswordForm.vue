<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-900">
    <div class="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
      <h2 class="text-2xl font-bold text-cyan-400 mb-6 text-center">
        Change Password
      </h2>
      <form class="space-y-5" @submit.prevent="updatePassword">
        <div>
          <label class="block text-sm font-medium text-white mb-1">
            Current Password
          </label>
          <input
            type="password"
            v-model="currentPassword"
            placeholder="Enter current password"
            class="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-cyan-400 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-white mb-1">
            New Password
          </label>
          <input
            type="password"
            v-model="newPassword"
            placeholder="Enter new password"
            class="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-cyan-400 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-white mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm new password"
            class="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-cyan-400 focus:ring focus:ring-cyan-500 focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          :disabled="loading"
          class="w-full py-2 px-4 rounded-md bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <span v-if="loading" class="flex items-center gap-2">
            <svg
              class="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            Updating...
          </span>
          <span v-else>Update Password</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/plugins/axios";
import { ref } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  setup() {
    const currentPassword = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const loading = ref(false);
    const router = useRouter();

    const updatePassword = async () => {
      loading.value = true;
      try {
        const res = await api.post(
          "/api/auth/change-password",
          {
            current_password: currentPassword.value,
            new_password: newPassword.value,
            new_password_confirmation: confirmPassword.value,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          },
        );

        Swal.fire({
          icon: "success",
          title: "Password Updated",
          text:
            res.data.message || "Your password has been changed successfully.",
          confirmButtonColor: "#06b6d4",
          background: "#1f2937",
          color: "#e5e7eb",
        });

        router.push({ name: "Shop" });

        currentPassword.value = "";
        newPassword.value = "";
        confirmPassword.value = "";
      } catch (err) {
        console.error("Password update failed:", err.response?.data || err);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text:
            err.response?.data?.message ||
            "Something went wrong while updating your password.",
          confirmButtonColor: "#ef4444",
          background: "#1f2937",
          color: "#e5e7eb",
        });
      } finally {
        loading.value = false;
      }
    };

    return {
      currentPassword,
      newPassword,
      confirmPassword,
      updatePassword,
      loading,
    };
  },
};
</script>
