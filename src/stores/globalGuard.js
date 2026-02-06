import { useUserStore } from "@/stores/useUserStore";
import pinia from "@/pinia";

router.beforeEach((to, from, next) => {
  const store = useUserStore(pinia);
  if (to.meta.requiresAuth && !store.token) {
    return next({ name: "Login" });
  }
  if (to.meta.requiresAdmin && Number(store.user?.is_admin) !== 1) {
    return next({ name: "Home" });
  }
  next();
});