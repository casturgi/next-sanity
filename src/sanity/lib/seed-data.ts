import { uuid } from '@sanity/uuid'

export const seedData = {
  authors: [
    {
      _id: uuid(),
      _type: 'author',
      name: 'John Doe',
      slug: {
        _type: 'slug',
        current: 'john-doe'
      },
      bio: [{
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: 'John is a tech enthusiast and writer with over 10 years of experience in software development.'
        }]
      }]
    },
    {
      _id: uuid(),
      _type: 'author',
      name: 'Jane Smith',
      slug: {
        _type: 'slug',
        current: 'jane-smith'
      },
      bio: [{
        _type: 'block',
        style: 'normal',
        children: [{
          _type: 'span',
          text: 'Jane is a UX designer and technical writer specializing in user experience and accessibility.'
        }]
      }]
    }
  ],

  categories: [
    {
      _id: uuid(),
      _type: 'category',
      title: 'Technology',
      description: 'Latest tech news and developments'
    },
    {
      _id: uuid(),
      _type: 'category',
      title: 'Design',
      description: 'UI/UX and design principles'
    },
    {
      _id: uuid(),
      _type: 'category',
      title: 'Development',
      description: 'Programming and software development'
    }
  ],

  posts: Array.from({ length: 12 }, (_, i) => ({
    _id: uuid(),
    _type: 'post',
    title: `Post ${i + 1}: ${[
      'Getting Started with Next.js',
      'Understanding TypeScript',
      'Modern Web Development',
      'Building with Sanity CMS',
      'React Best Practices',
      'State Management Tips',
      'API Design Patterns',
      'Frontend Performance',
      'Backend Architecture',
      'Database Optimization',
      'Security Best Practices',
      'DevOps Essentials'
    ][i]}`,
    slug: {
      _type: 'slug',
      current: `post-${i + 1}-${[
        'nextjs',
        'typescript',
        'web-dev',
        'sanity-cms',
        'react',
        'state-management',
        'api-design',
        'performance',
        'architecture',
        'database',
        'security',
        'devops'
      ][i]}`
    },
    author: {
      _type: 'reference',
      _ref: '{{authors.[0]._id}}' // Will be replaced during seeding
    },
    publishedAt: new Date(Date.now() - i * 86400000).toISOString(), // Each post 1 day apart
    categories: [{
      _type: 'reference',
      _ref: '{{categories.[0]._id}}'
    }],
    body: [{
      _type: 'block',
      style: 'normal',
      children: [{
        _type: 'span',
        text: `This is the content for post ${i + 1}. It covers important topics in modern web development.`
      }]
    }]
  })),

  settings: {
    _id: 'settings',
    _type: 'settings',
    title: 'My Next.js Blog',
    description: 'A modern blog built with Next.js and Sanity',
    cta: {
      text: 'Sign up',
      href: '/signup',
      isExternal: false
    }
  },

  navigation: [
    {
      _id: uuid(),
      _type: 'navigation',
      name: 'Product',
      href: '/product',
      order: 1,
      isExternal: false
    },
    {
      _id: uuid(),
      _type: 'navigation',
      name: 'Features',
      href: '/features',
      order: 2,
      isExternal: false
    },
    {
      _id: uuid(),
      _type: 'navigation',
      name: 'Marketplace',
      href: '/marketplace',
      order: 3,
      isExternal: false
    },
    {
      _id: uuid(),
      _type: 'navigation',
      name: 'Company',
      href: '/company',
      order: 4,
      isExternal: false
    }
  ],

  images: {
    hero: {
      _id: uuid(),
      _type: 'sanity.imageAsset',
      url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1920&h=1080',
      metadata: {
        dimensions: {
          aspectRatio: 1.777777778,
          height: 1080,
          width: 1920
        }
      }
    }
  },

  hero: {
    _id: 'hero',
    _type: 'hero',
    title: 'Welcome to Our Blog',
    subtitle: 'Discover stories, technical articles, and insights from our team.',
    backgroundImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: '{{images.hero._id}}'  // Will be replaced during seeding
      },
      hotspot: {
        x: 0.5,
        y: 0.5,
        height: 1,
        width: 1
      }
    },
    cta: {
      text: 'Start Reading',
      href: '/posts',
      isExternal: false
    }
  }
} 