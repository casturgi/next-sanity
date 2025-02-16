import { groq } from 'next-sanity'

export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    excerpt,
    author->{
      name,
      image
    },
    categories[]->{
      title
    }
  }
`

export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    body,
    author->{
      name,
      image,
      bio
    },
    categories[]->{
      _id,
      title
    }
  }
`

export type Post = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  mainImage?: {
    asset: {
      url: string
    }
  }
  excerpt?: string
  author?: {
    name: string
    image?: {
      asset: {
        url: string
      }
    }
  }
  categories?: Array<{
    title: string
  }>
} 