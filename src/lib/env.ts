import { config } from 'dotenv'
import path from 'path'

// Load environment variables from .env.development in development
if (process.env.NODE_ENV === 'development') {
  const envPath = path.resolve(process.cwd(), '.env.development')
  const result = config({
    path: envPath
  })

  if (result.error) {
    console.error('Error loading .env.development:', result.error)
    console.error('Tried to load from:', envPath)
  }
}

// Debug: Print current environment variables
console.log('Current environment:', {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  hasToken: !!process.env.SANITY_API_TOKEN
})

// Validate required environment variables
const requiredEnvs = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET' 
]

requiredEnvs.forEach(env => {
  if (!process.env[env]) {
    throw new Error(`Missing required environment variable: ${env}`)
  }
})

export {} 