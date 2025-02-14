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
    const types = ['post', 'author', 'category', 'settings']
    
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

    // Create or update settings
    await client.createOrReplace(seedData.settings)

    console.log('✅ Sanity dataset seeded successfully!')
    return {
      authors,
      categories,
      posts
    }
  } catch (error) {
    console.error('Error seeding Sanity data:', error)
    throw error
  }
} 