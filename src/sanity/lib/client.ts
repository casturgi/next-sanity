import '../../lib/env'
import { createClient } from '@sanity/client'
import {
  Post,
  postsQuery,
  Navigation,
  navigationQuery,
  Settings,
  settingsQuery,
  Hero,
  heroQuery,
} from './queries'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN!,
})

export async function getPosts(): Promise<Post[]> {
  return client.fetch(postsQuery)
}

export async function getNavigation(): Promise<Navigation[]> {
  return client.fetch(navigationQuery)
}

export async function getSettings(): Promise<Settings> {
  return client.fetch(settingsQuery)
}

export async function getHero(): Promise<Hero> {
  return client.fetch(heroQuery)
}
