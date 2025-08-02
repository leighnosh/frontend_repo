<template>
  <div id="app">
    <MoviePage />
  </div>
</template>

<script setup lang="ts">
import MoviePage from './components/MoviePage.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #0d253f;
  color: white;
}

#app {
  min-height: 100vh;
}
</style>