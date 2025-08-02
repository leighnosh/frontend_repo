<template>
  <section class="cast-crew-section">
    <div class="container">
      <h2 class="section-title">Top Billed Cast</h2>
      
      <div class="cast-grid">
        <div 
          v-for="(member, index) in castMembers" 
          :key="index"
          class="cast-card enhanced"
          @mouseenter="hoveredCast = index"
          @mouseleave="hoveredCast = -1"
        >
          <div class="cast-photo" :style="{ backgroundColor: member.color }">
            <span class="cast-initials">{{ getInitials(member.name) }}</span>
            <div v-if="hoveredCast === index" class="photo-overlay">
              <span class="view-details">View Details</span>
            </div>
          </div>
          <div class="cast-info">
            <h3 class="cast-name">{{ member.name }}</h3>
            <p class="cast-character">{{ member.character }}</p>
            <div v-if="hoveredCast === index" class="character-details">
              <p class="character-description">{{ member.description }}</p>
              <div class="character-traits">
                <span v-for="trait in member.traits" :key="trait" class="trait-tag">
                  {{ trait }}
                </span>
              </div>
              <div class="actor-highlight">
                <strong>Also known for:</strong> {{ member.knownFor }}
              </div>
            </div>
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
import { computed, ref } from 'vue'
import type { MovieData } from '../types/movie'

interface Props {
  movieData: MovieData
}

const props = defineProps<Props>()
const hoveredCast = ref(-1)

const castMembers = computed(() => {
  const actors = props.movieData.Actors.split(', ')
  const colors = ['#8B5FBF', '#7B68EE', '#9370DB', '#6A5ACD']
  return actors.slice(0, 3).map((name, index) => ({
    name: name.trim(),
    character: getCharacterName(name),
    color: colors[index % colors.length],
    description: getCharacterDescription(name),
    traits: getCharacterTraits(name),
    knownFor: getActorKnownFor(name)
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

function getCharacterDescription(actorName: string): string {
  const descriptions: { [key: string]: string } = {
    'Chris Pratt': 'Half-human, half-Celestial leader of the Guardians with a mysterious parentage that drives the film\'s central conflict.',
    'Zoe Saldaña': 'Fierce green-skinned warrior and deadliest woman in the galaxy, struggling with her complex relationship with her sister Nebula.',
    'Dave Bautista': 'Literal-minded destroyer whose straightforward nature hides a deep capacity for friendship and unexpected wisdom.',
  }
  return descriptions[actorName] || 'A key character in the Guardians of the Galaxy story.'
}

function getCharacterTraits(actorName: string): string[] {
  const traits: { [key: string]: string[] } = {
    'Chris Pratt': ['Leader', 'Half-Celestial', 'Music Lover'],
    'Zoe Saldaña': ['Warrior', 'Assassin', 'Redeemed'],
    'Dave Bautista': ['Destroyer', 'Loyal', 'Literal-minded'],
  }
  return traits[actorName] || ['Guardian', 'Hero']
}

function getActorKnownFor(actorName: string): string {
  const knownFor: { [key: string]: string } = {
    'Chris Pratt': 'Parks & Recreation, Jurassic World',
    'Zoe Saldaña': 'Avatar, Star Trek',
    'Dave Bautista': 'WWE Wrestling, Blade Runner 2049',
  }
  return knownFor[actorName] || 'Various film and TV roles'
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
  overflow: visible;
  transition: all 0.3s ease;
  position: relative;
}

.cast-card.enhanced:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.cast-photo {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

.cast-initials {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.view-details {
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  margin: 0 0 0.75rem 0;
  font-weight: 500;
}

.character-details {
  border-top: 1px solid #f0f0f0;
  padding-top: 0.75rem;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.character-description {
  font-size: 0.85rem;
  color: #444;
  line-height: 1.4;
  margin-bottom: 0.75rem;
  font-style: italic;
}

.character-traits {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.trait-tag {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.actor-highlight {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.3;
}

.actor-highlight strong {
  color: #333;
  display: block;
  margin-bottom: 0.25rem;
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
  
  .cast-card.enhanced:hover {
    transform: translateY(-4px) scale(1.01);
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
  
  .character-description {
    font-size: 0.8rem;
  }
  
  .trait-tag {
    font-size: 0.65rem;
    padding: 0.15rem 0.4rem;
  }
  
  .actor-highlight {
    font-size: 0.75rem;
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