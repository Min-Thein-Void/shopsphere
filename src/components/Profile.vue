<template>
    <div class="w-full bg-neutral-900 px-6 py-6 space-y-6 rounded-lg shadow-md">
        <!-- Profile Section -->
        <div class="flex flex-col items-center text-center">
            <label class="relative cursor-pointer group">
                <img :src="userStore.user && userStore.user.avatar
                        ? userStore.user.avatar
                        : '/public/robot.png'
                    " alt="Profile"
                    class="w-16 h-16 rounded-full border border-cyan-400 shadow-md group-hover:opacity-80 transition-all duration-300" />
                <input type="file" class="hidden" @change="uploadProfilePic" />
            </label>

            <p class="mt-3 text-sm font-semibold text-cyan-500">
                {{ userStore?.user?.name || "Username" }}
            </p>
            <p class="text-xs text-cyan-300">
                {{ userStore?.user?.email || "user@email.com" }}
            </p>
        </div>

        <!-- Menu Items -->
        <nav class="space-y-2 text-sm font-medium text-cyan-500">
            <router-link :to="{ name: 'Home' }"
                class="flex items-center gap-3 px-2 py-2 rounded hover:bg-cyan-400 hover:text-white transition-all duration-300 group">
                <!-- Home Icon -->
                <svg class="w-4 h-4 text-cyan-500 group-hover:text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h4m6 0h4a1 1 0 001-1V10" />
                </svg>
                Home
            </router-link>

            <router-link :to="{ name: 'Shop' }"
                class="flex items-center gap-3 px-2 py-2 rounded hover:bg-cyan-400 hover:text-white transition-all duration-300 group">
                <!-- Shop Icon -->
                <svg class="w-4 h-4 text-cyan-500 group-hover:text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 8h14l-1.5 12h-11L5 8zM9 8V6a3 3 0 016 0v2" />
                </svg>
                Shop
            </router-link>

            <div
                class="flex items-center gap-3 px-2 py-2 rounded hover:bg-cyan-400 hover:text-white transition-all duration-300 cursor-pointer group">
                <!-- Bell Icon -->
                <svg class="w-4 h-4 text-cyan-500 group-hover:text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 01-6 0" />
                </svg>
                Notifications
            </div>

            <div
                class="flex items-center gap-3 px-2 py-2 rounded hover:bg-cyan-400 hover:text-white transition-all duration-300 cursor-pointer group">
                <!-- Help Icon -->
                <svg class="w-4 h-4 text-cyan-500 group-hover:text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 10a4 4 0 118 0c0 2-2 3-2 3s-1 1-1 3m0 4h.01" />
                </svg>
                Help
            </div>

            <router-link :to="{ name: 'ChangePassword' }"
                class="flex items-center gap-3 px-2 py-2 rounded hover:bg-cyan-400 hover:text-white transition-all duration-300 cursor-pointer group">
                <!-- Lock Icon -->
                <svg class="w-4 h-4 text-cyan-500 group-hover:text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 11c1.104 0 2-.896 2-2V7a4 4 0 00-8 0v2c0 1.104.896 2 2 2h4zm-6 0h12v10H6V11z" />
                </svg>
                Change Password
            </router-link>

            <button v-if="userStore.user !== null" @click="Logout"
                class="flex items-center gap-3 px-2 py-2 rounded text-red-400 hover:text-red-600 transition-all duration-300 w-full">
                <!-- Logout Icon -->
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                </svg>
                Logout
            </button>
        </nav>
    </div>
</template>

<script>
import api from "@/plugins/axios";
import { useUserStore } from "@/stores/useUserStore";
import { ref, watch } from "vue";
import Swal from "sweetalert2";
export default {
    setup() {
        let isDark = ref(false);
        let toggleTheme = () => {
            isDark.value = !isDark.value;
        };
        watch(isDark, (val) => {
            if (val) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        });

        let userStore = useUserStore();

        let uploadProfilePic = async (event) => {
            let file = event.target.files[0];
            if (!file) {
                return;
            }
            const formData = new FormData();
            formData.append("avatar", file);
            try {
                let res = await api.post(
                    `/api/auth/user/avatar/${userStore.user.id}`,
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                        },
                    },
                );
                console.log(res);
                userStore.user.avatar = res.data.avatar;
                localStorage.setItem("user", JSON.stringify(userStore.user));
                console.log("Upload success");
            } catch (err) {
                console.error("Upload failed:", err.response?.data || err.message);
            }
        };

        const Logout = async () => {
            const result = await Swal.fire({
                title: "Log out from your account?",
                text: "You will need to sign in again to access your account.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#4f46e5",
                cancelButtonColor: "#6b7280",
                confirmButtonText: "Yes, Log Out",
                cancelButtonText: "Stay Logged In",
                background: "#1f2937",
                color: "#e5e7eb",
            });

            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem("auth_token");

                    await api.post(
                        "/api/auth/logout",
                        {},
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        },
                    );

                    userStore.clearUser();
                    localStorage.removeItem("user");
                    localStorage.removeItem("auth_token");

                    Swal.fire({
                        icon: "success",
                        title: "Logged Out Successfully",
                        text: "You have been securely logged out.",
                        timer: 1800,
                        showConfirmButton: false,
                        background: "#1f2937",
                        color: "#e5e7eb",
                    });
                } catch (error) {
                    console.error("Logout failed:", error.response?.data || error);

                    Swal.fire({
                        icon: "error",
                        title: "Logout Failed",
                        text: "We couldn't log you out. Please try again.",
                        confirmButtonColor: "#ef4444",
                        background: "#1f2937",
                        color: "#e5e7eb",
                    });
                }
            }
        };

        return { toggleTheme, isDark, uploadProfilePic, userStore, Logout };
    },
};
</script>
