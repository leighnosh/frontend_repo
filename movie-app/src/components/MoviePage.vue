<template>
  <div class="movie-page">
    <div v-if="loading" class="loading">
      Loading movie data...
    </div>
    
    <div v-else-if="error" class="error">
      Error: {{ error }}
    </div>
    
    <div v-else-if="movieData">
      <MovieHero :movie-data="movieData" />
      <CastCrew :movie-data="movieData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MovieData } from '../types/movie'
import { fetchMovieData } from '../services/movieApi'
import MovieHero from './MovieHero.vue'
import CastCrew from './CastCrew.vue'

const movieData = ref<MovieData | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    movieData.value = await fetchMovieData()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error occurred'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.movie-page {
  min-height: 100vh;
}

.loading, .error {
  padding: 2rem;
  text-align: center;
  color: white;
}
</style>