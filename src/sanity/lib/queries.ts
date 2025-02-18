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

export const navigationQuery = groq`
  *[_type == "navigation"] | order(order asc) {
    _id,
    name,
    href,
    isExternal,
    order
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0] {
    title,
    description,
    logo,
    ogImage,
    cta
  }
`

export const heroQuery = groq`
  *[_type == "hero"][0] {
    title,
    subtitle,
    backgroundImage {
      asset->
    },
    cta
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

export type Navigation = {
  _id: string
  name: string
  href: string
  isExternal: boolean
  order: number
}

export type Settings = {
  title: string
  description?: string
  logo?: {
    asset: {
      url: string
    }
  }
  ogImage?: {
    asset: {
      url: string
    }
  }
  cta?: {
    text: string
    href: string
    isExternal: boolean
  }
}

export type Hero = {
  title: string
  subtitle?: string
  backgroundImage: {
    asset: {
      url: string
    }
  }
  cta?: {
    text: string
    href: string
    isExternal: boolean
  }
} 