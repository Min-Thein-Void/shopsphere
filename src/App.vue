<script>
import Nav from './components/Nav.vue';
import SideBar from './components/SideBar.vue';
import { useUserStore } from './stores/useUserStore';

export default {
  name: "App",
  components: {
    Nav , SideBar
  },
  setup() {
    const userStore = useUserStore();
    if (userStore.token && userStore.user) {
      userStore.isAuthenticated = true;
    }
    return {};
  }
};
</script>

<template>
  <div class="app-container">
    <Nav />
    <SideBar/>
    <RouterView />
  </div>
</template>

<style>
/* Global styles for the whole app */
html,
body {
  margin: 0;
  padding: 0;
  background-color: black;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.app-container {
  margin: 0 auto;
  /* centers the content horizontally */
  padding: 0;
}
</style>
