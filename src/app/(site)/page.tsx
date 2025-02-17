import { getPosts, getHero } from '@/sanity/lib/client'
import { Hero, Posts } from '@/components/sections'

export default async function Home() {
  const [posts, hero] = await Promise.all([
    getPosts(),
    getHero()
  ])

  return (
    <>
      <Hero data={hero} />
      <Posts posts={posts} />
    </>
  )
}
