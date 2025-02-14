import '../lib/env'
import { seedSanityData } from '../sanity/lib/seed'

async function main() {
  try {
    await seedSanityData()
    process.exit(0)
  } catch (error) {
    console.error('Error seeding data:', error)
    process.exit(1)
  }
}

main() 