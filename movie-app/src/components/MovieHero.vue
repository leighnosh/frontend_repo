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
              <div class="score-circle clickable" @click="openRatingModal" :class="{ 'has-user-rating': userRating > 0 }">
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
                      :stroke-dasharray="`${displayScore}, 100`"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div class="score-text">
                    <span class="score-number">{{ displayScore }}</span>
                    <span class="score-percent">%</span>
                  </div>
                </div>
              </div>
              <span class="score-label">
                <span v-html="userRating > 0 ? 'Your<br>Rating' : 'User<br>Score'"></span>
              </span>
              <button v-if="userRating === 0" class="rate-button" @click="openRatingModal">
                Click to Rate
              </button>
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
              <button class="play-trailer" @click="openTrailerModal">
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
    
    <!-- Rating Modal -->
    <div v-if="showRatingModal" class="modal-overlay" @click="closeRatingModal">
      <div class="rating-modal" @click.stop>
        <h3>Rate Guardians of the Galaxy Vol. 2</h3>
        <div class="rating-stars">
          <button 
            v-for="star in 10" 
            :key="star"
            class="star-btn"
            :class="{ active: star <= hoveredRating || star <= selectedRating }"
            @click="selectRating(star)"
            @mouseenter="hoveredRating = star"
            @mouseleave="hoveredRating = 0"
          >
            ★
          </button>
        </div>
        <div class="rating-display">
          {{ hoveredRating || selectedRating || 0 }}/10
        </div>
        <div class="modal-actions">
          <button class="cancel-btn" @click="closeRatingModal">Cancel</button>
          <button class="submit-btn" @click="submitRating" :disabled="selectedRating === 0">
            Rate Movie
          </button>
        </div>
      </div>
    </div>
    
    <!-- Trailer Modal -->
    <div v-if="showTrailerModal" class="modal-overlay" @click="closeTrailerModal">
      <div class="trailer-modal" @click.stop>
        <button class="close-trailer" @click="closeTrailerModal">✕</button>
        <div class="trailer-container">
          <iframe
            width="100%" 
            height="100%"
            src="https://www.youtube.com/embed/dW1BIid8Osg?autoplay=1&rel=0"
            title="Guardians of the Galaxy Vol. 2 - Official Trailer"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import type { MovieData } from '../types/movie'
import { convertToUserScore, formatRuntime } from '../services/movieApi'

interface Props {
  movieData: MovieData
}

const props = defineProps<Props>()

// Rating state
const userRating = ref(0)
const showRatingModal = ref(false)
const selectedRating = ref(0)
const hoveredRating = ref(0)

// Trailer state
const showTrailerModal = ref(false)

// Computed properties
const userScore = computed(() => convertToUserScore(props.movieData.imdbRating))
const displayScore = computed(() => {
  return userRating.value > 0 ? userRating.value * 10 : userScore.value
})

// Load user rating from localStorage on mount
onMounted(() => {
  const savedRating = localStorage.getItem(`rating-${props.movieData.imdbID}`)
  if (savedRating) {
    userRating.value = parseInt(savedRating)
  }
})

// Rating functions
function openRatingModal() {
  showRatingModal.value = true
  selectedRating.value = userRating.value
}

function closeRatingModal() {
  showRatingModal.value = false
  selectedRating.value = 0
  hoveredRating.value = 0
}

function selectRating(rating: number) {
  selectedRating.value = rating
}

function submitRating() {
  userRating.value = selectedRating.value
  localStorage.setItem(`rating-${props.movieData.imdbID}`, selectedRating.value.toString())
  closeRatingModal()
}

// Trailer functions
function openTrailerModal() {
  showTrailerModal.value = true
}

function closeTrailerModal() {
  showTrailerModal.value = false
}

// Utility functions
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

.score-circle.clickable {
  cursor: pointer;
  transition: transform 0.2s ease;
}

.score-circle.clickable:hover {
  transform: scale(1.05);
}

.score-circle.has-user-rating .score-outer-ring {
  border-color: #f39c12;
}

.score-circle.has-user-rating .score-fill {
  stroke: #f39c12;
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

.rate-button {
  background: none;
  border: 1px solid #01b4e4;
  color: #01b4e4;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.rate-button:hover {
  background: #01b4e4;
  color: white;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.rating-modal {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.rating-modal h3 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.rating-stars {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.star-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #ddd;
  cursor: pointer;
  transition: color 0.2s ease, transform 0.1s ease;
}

.star-btn:hover {
  transform: scale(1.1);
}

.star-btn.active {
  color: #f39c12;
}

.rating-display {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.cancel-btn, .submit-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn {
  background: #f0f0f0;
  color: #333;
}

.cancel-btn:hover {
  background: #e0e0e0;
}

.submit-btn {
  background: #01b4e4;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background: #0190c7;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* Trailer Modal Styles */
.trailer-modal {
  position: relative;
  background: black;
  border-radius: 12px;
  overflow: hidden;
  max-width: 900px;
  width: 90%;
  aspect-ratio: 16/9;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
}

.close-trailer {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
  transition: background 0.2s ease;
}

.close-trailer:hover {
  background: rgba(0, 0, 0, 0.9);
}

.trailer-container {
  width: 100%;
  height: 100%;
  position: relative;
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
  
  .rating-modal {
    padding: 1.5rem;
    width: 95%;
  }
  
  .star-btn {
    font-size: 1.5rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
  
  .trailer-modal {
    width: 95%;
    max-width: none;
  }
  
  .close-trailer {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
}
</style>