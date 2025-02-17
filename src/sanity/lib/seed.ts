import { client } from './client'
import { seedData } from './seed-data'

export async function seedSanityData() {
  try {
    // Abort if not in development
    if (process.env.NODE_ENV !== 'development') {
      console.error('❌ Seeding is only allowed in development environment')
      console.error('Current NODE_ENV:', process.env.NODE_ENV)
      process.exit(1)
    }

    // Delete all existing documents
    const types = ['post', 'author', 'category', 'settings', 'navigation', 'hero']
    
    console.log('🗑️  Deleting existing documents...')
    for (const type of types) {
      const query = `*[_type == "${type}"]`
      const documents = await client.fetch(query)
      
      if (documents.length > 0) {
        console.log(`Deleting ${documents.length} ${type} documents...`)
        await client.delete({
          query: `*[_type == "${type}"]`
        })
      }
    }
    
    console.log('✨ Starting fresh seed...')

    // Fetch and upload the hero image
    console.log('📥 Fetching hero image...')
    const imageResponse = await fetch(seedData.images.hero.url)
    
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`)
    }

    if (!imageResponse.headers.get('content-type')?.includes('image')) {
      throw new Error('Response is not an image')
    }

    const arrayBuffer = await imageResponse.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    console.log('🖼️  Uploading hero image...')
    const heroImage = await client.assets.upload('image', buffer, {
      filename: 'hero-banner.jpg',
      contentType: imageResponse.headers.get('content-type') || 'image/jpeg'
    })

    console.log('✅ Hero image uploaded successfully')

    // Create hero with proper image reference
    const hero = await client.create({
      ...seedData.hero,
      backgroundImage: {
        ...seedData.hero.backgroundImage,
        asset: {
          _type: 'reference',
          _ref: heroImage._id
        }
      }
    })

    // Create authors first
    const authors = await Promise.all(
      seedData.authors.map(author => client.create(author))
    )

    // Create categories
    const categories = await Promise.all(
      seedData.categories.map(category => client.create(category))
    )

    // Create posts with proper references
    const posts = await Promise.all(
      seedData.posts.map((post, index) => {
        // Replace placeholder references with actual IDs
        const postWithRefs = {
          ...post,
          author: {
            _type: 'reference',
            _ref: authors[index % authors.length]._id
          },
          categories: [{
            _type: 'reference',
            _ref: categories[index % categories.length]._id
          }]
        }
        return client.create(postWithRefs)
      })
    )

    // Create navigation items
    const navigationItems = await Promise.all(
      seedData.navigation.map(item => client.create(item))
    )

    // Create or update settings
    await client.createOrReplace(seedData.settings)

    console.log('✅ Sanity dataset seeded successfully!')
    return {
      authors,
      categories,
      posts,
      navigationItems,
      hero
    }
  } catch (error) {
    console.error('Error seeding Sanity data:', error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
    }
    throw error
  }
} 