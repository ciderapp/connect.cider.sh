<script setup lang="ts">
const nuxtApp = useNuxtApp();

if (nuxtApp.$auth.loggedIn) {
  nuxtApp.$router.push('/dashboard');
}
</script>

<template>
  <div class="welcome">
    <q-img src="/logo.png" class="img" />
    <h1>Cider Connect</h1>

    <NuxtLink to="/api/login" external>
      <q-btn color="primary" label="Login" />
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .img {
    width: 10rem;
    height: 10rem;
  }

  h1 {
    font-size: 2.5rem;
    margin-top: 1rem;
  }

  button {
    margin-top: 1rem;
  }
}
</style>