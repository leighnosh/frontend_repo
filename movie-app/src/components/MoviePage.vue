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
import { ref, onMounted, computed } from 'vue'
import type { MovieData } from '../types/movie'
import { fetchMovieData, convertToUserScore } from '../services/movieApi'
import MovieHero from './MovieHero.vue'
import CastCrew from './CastCrew.vue'

const movieData = ref<MovieData | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const userScore = computed(() => {
  return movieData.value ? convertToUserScore(movieData.value.imdbRating) : 0
})

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
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #01b4e4;
  margin-bottom: 1rem;
}
</style>