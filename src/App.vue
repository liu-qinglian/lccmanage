<template>
  <div id="app">
    <nav>
      <!-- <login></login> -->
      <!-- <router-link to="/">login</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
    </nav>
    <router-view />
  </div>
</template>
<script>
import login from "./views/Login.vue";
// import home from "./views/Home.vue";
export default {
  components: { login },
};
</script>
<style>
</style>
