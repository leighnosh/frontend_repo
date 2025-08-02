<template>
  <section class="cast-crew-section">
    <div class="container">
      <h2 class="section-title">Top Billed Cast</h2>
      
      <div class="cast-grid">
        <div 
          v-for="(member, index) in castMembers" 
          :key="index"
          class="cast-card"
        >
          <div class="cast-photo" :style="{ backgroundColor: member.color }">
            <span class="cast-initials">{{ getInitials(member.name) }}</span>
          </div>
          <div class="cast-info">
            <h3 class="cast-name">{{ member.name }}</h3>
            <p class="cast-character">{{ member.character || 'Character' }}</p>
          </div>
        </div>
        
        <div class="view-more-card">
          <span class="view-more-text">View More</span>
        </div>
      </div>
      
      <div class="crew-section">
        <h3 class="crew-title">Featured Crew</h3>
        <div class="crew-grid">
          <div class="crew-member">
            <h4 class="crew-name">{{ getDirector(movieData.Director) }}</h4>
            <p class="crew-role">Director</p>
          </div>
          <div class="crew-member">
            <h4 class="crew-name">{{ getMainWriter(movieData.Writer) }}</h4>
            <p class="crew-role">Writer</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MovieData } from '../types/movie'

interface Props {
  movieData: MovieData
}

const props = defineProps<Props>()

const castMembers = computed(() => {
  const actors = props.movieData.Actors.split(', ')
  const colors = ['#8B5FBF', '#7B68EE', '#9370DB', '#6A5ACD']
  return actors.slice(0, 3).map((name, index) => ({
    name: name.trim(),
    character: getCharacterName(name),
    color: colors[index % colors.length]
  }))
})

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function getCharacterName(actorName: string): string {
  // Since we don't have character names from OMDB, we'll create placeholders
  const characterMap: { [key: string]: string } = {
    'Chris Pratt': 'Peter Quill / Star-Lord',
    'Zoe Saldaña': 'Gamora',
    'Dave Bautista': 'Drax',
    'Vin Diesel': 'Baby Groot (voice)',
    'Bradley Cooper': 'Rocket (voice)',
    'Michael Rooker': 'Yondu'
  }
  return characterMap[actorName] || 'Character'
}

function getDirector(directors: string): string {
  return directors.split(',')[0].trim()
}

function getMainWriter(writers: string): string {
  return writers.split(',')[0].trim()
}
</script>

<style scoped>
.cast-crew-section {
  background-color: white;
  color: #000;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #000;
}

.cast-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.cast-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease;
}

.cast-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.cast-photo {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.cast-initials {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.cast-info {
  padding: 1rem;
}

.cast-name {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #000;
  line-height: 1.3;
}

.cast-character {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.3;
  margin: 0;
}

.view-more-card {
  background: #9370DB;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  height: 200px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.view-more-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.view-more-text {
  font-size: 1rem;
  font-weight: 600;
  color: white;
  text-align: center;
}

.crew-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.crew-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #000;
}

.crew-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.crew-member {
  padding: 1rem 0;
  border-left: 3px solid #01b4e4;
  padding-left: 1rem;
}

.crew-name {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #000;
}

.crew-role {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  font-style: italic;
}

@media (max-width: 768px) {
  .cast-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .cast-photo {
    height: 100px;
  }
  
  .cast-initials {
    font-size: 1.5rem;
  }
  
  .cast-info {
    padding: 0.75rem;
  }
  
  .cast-name {
    font-size: 0.9rem;
  }
  
  .cast-character {
    font-size: 0.8rem;
  }
  
  .view-more-card {
    height: 180px;
  }
  
  .crew-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>