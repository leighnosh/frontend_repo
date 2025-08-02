import type { MovieData } from '@/types/movie'

const OMDB_API_URL = 'http://www.omdbapi.com/'
const API_KEY = 'd2132124'
const MOVIE_ID = 'tt3896198' // Guardians of the Galaxy Vol. 2

export async function fetchMovieData(): Promise<MovieData> {
  const url = `${OMDB_API_URL}?i=${MOVIE_ID}&apikey=${API_KEY}`
  
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`)
    }
    
    const data: MovieData = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch movie data:', error)
    throw error
  }
}

// Helper function to convert IMDB rating to percentage for user score
export function convertToUserScore(imdbRating: string): number {
  const rating = parseFloat(imdbRating)
  return Math.round(rating * 10)
}

// Helper function to format runtime (136 min -> 2h 17m)
export function formatRuntime(runtime: string): string {
  const minutes = parseInt(runtime.replace(' min', ''))
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${remainingMinutes}m`
}