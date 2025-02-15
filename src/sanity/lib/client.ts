import '../../lib/env'
import { createClient } from '@sanity/client'
import { Post, postsQuery } from './queries'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false, 
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN!
})

export async function getPosts(): Promise<Post[]> {
  return client.fetch(postsQuery)
} 