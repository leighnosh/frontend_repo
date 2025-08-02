<template>
  <section class="movie-hero" :style="{ backgroundImage: `url(${movieData.Poster})` }">
    <div class="hero-overlay">
      <div class="hero-container">
        <div class="poster-container">
          <img :src="movieData.Poster" :alt="movieData.Title" class="poster-image" />
        </div>
        
        <div class="movie-details">
          <h1 class="movie-title">
            {{ movieData.Title }} 
            <span class="movie-year">({{ movieData.Year }})</span>
          </h1>
          
          <div class="movie-meta">
            <span class="rating-badge">{{ movieData.Rated }}</span>
            <span class="release-date">{{ formatDate(movieData.Released) }}</span>
            <span class="genres">{{ movieData.Genre }}</span>
            <span class="runtime">{{ formatRuntime(movieData.Runtime) }}</span>
          </div>
          
          <div class="actions-row">
            <div class="user-score">
              <div class="score-circle">
                <div class="score-outer-ring">
                  <svg class="score-ring" viewBox="0 0 36 36">
                    <path
                      class="score-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      class="score-fill"
                      :stroke-dasharray="`${userScore}, 100`"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div class="score-text">
                    <span class="score-number">{{ userScore }}</span>
                    <span class="score-percent">%</span>
                  </div>
                </div>
              </div>
              <span class="score-label">User<br>Score</span>
            </div>
            
            <div class="action-buttons">
              <button class="action-btn list-btn" title="Add to list">
                <span class="btn-icon">≡</span>
              </button>
              <button class="action-btn heart-btn" title="Mark as favorite">
                <span class="btn-icon">♡</span>
              </button>
              <button class="action-btn bookmark-btn" title="Add to watchlist">
                <span class="btn-icon">🔖</span>
              </button>
              <button class="action-btn star-btn" title="Rate it">
                <span class="btn-icon">☆</span>
              </button>
              <button class="play-trailer">
                <span class="play-icon">▶</span>
                Play Trailer
              </button>
            </div>
          </div>
          
          <div class="tagline">
            <em>Obviously.</em>
          </div>
          
          <div class="overview">
            <h3>Overview</h3>
            <p>{{ movieData.Plot }}</p>
          </div>
          
          <div class="crew-info">
            <div class="crew-member">
              <strong>{{ getDirector(movieData.Director) }}</strong>
              <span>Director</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MovieData } from '../types/movie'
import { convertToUserScore, formatRuntime } from '../services/movieApi'

interface Props {
  movieData: MovieData
}

const props = defineProps<Props>()

const userScore = computed(() => convertToUserScore(props.movieData.imdbRating))

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: '2-digit', 
    day: '2-digit', 
    year: 'numeric' 
  })
}

function getDirector(directors: string): string {
  return directors.split(',')[0].trim()
}
</script>

<style scoped>
.movie-hero {
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 500px;
}

.hero-overlay {
  background: linear-gradient(
    to right,
    rgba(13, 37, 63, 0.9) 0%,
    rgba(13, 37, 63, 0.7) 50%,
    rgba(13, 37, 63, 0.4) 100%
  );
  padding: 2rem 0;
  min-height: 500px;
  display: flex;
  align-items: center;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.poster-container {
  flex-shrink: 0;
}

.poster-image {
  width: 300px;
  height: 450px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.movie-details {
  flex: 1;
  color: white;
}

.movie-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.movie-year {
  font-weight: normal;
  opacity: 0.8;
}

.movie-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.rating-badge {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.9rem;
}

.release-date, .genres, .runtime {
  font-size: 0.95rem;
}

.actions-row {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.user-score {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.score-circle {
  position: relative;
}

.score-outer-ring {
  position: relative;
  width: 68px;
  height: 68px;
  background-color: #0d253f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #21d07a;
}

.score-ring {
  width: 60px;
  height: 60px;
  transform: rotate(-90deg);
}

.score-bg {
  fill: none;
  stroke: #204529;
  stroke-width: 3.8;
}

.score-fill {
  fill: none;
  stroke: #21d07a;
  stroke-width: 3.8;
  stroke-linecap: round;
  transition: stroke-dasharray 0.6s ease-in-out;
}

.score-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  font-size: 1rem;
  color: white;
}

.score-percent {
  font-size: 0.6rem;
  vertical-align: top;
}

.score-label {
  font-size: 0.85rem;
  text-align: left;
  line-height: 1.3;
  font-weight: 600;
  color: white;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.action-btn {
  background-color: #0d253f;
  border: none;
  color: white;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.action-btn:hover {
  background-color: #01b4e4;
  transform: scale(1.1);
}

.btn-icon {
  font-size: 1.2rem;
  line-height: 1;
}

.list-btn .btn-icon {
  font-size: 1.4rem;
  font-weight: bold;
}

.heart-btn .btn-icon {
  font-size: 1.3rem;
}

.star-btn .btn-icon {
  font-size: 1.3rem;
}

.bookmark-btn .btn-icon {
  font-size: 1rem;
}

.play-trailer {
  background: none;
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  margin-left: 1rem;
  transition: color 0.2s ease;
}

.play-trailer:hover {
  color: #01b4e4;
}

.play-icon {
  font-size: 1.2rem;
}

.tagline {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.overview h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.overview p {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.crew-info {
  display: flex;
  gap: 2rem;
}

.crew-member {
  display: flex;
  flex-direction: column;
}

.crew-member strong {
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.crew-member span {
  font-size: 0.9rem;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .hero-container {
    flex-direction: column;
    text-align: center;
  }
  
  .poster-image {
    width: 200px;
    height: 300px;
  }
  
  .movie-title {
    font-size: 2rem;
  }
  
  .actions-row {
    flex-direction: column;
    gap: 1rem;
  }
  
  .action-buttons {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>