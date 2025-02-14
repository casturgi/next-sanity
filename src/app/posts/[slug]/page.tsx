import { client } from '@/sanity/lib/client'
import { postQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link 
        href="/" 
        className="text-white hover:text-blue-600 mb-8 inline-block font-medium"
      >
        ← Back to posts
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
        
        <div className="flex items-center gap-4 text-white">
          {post.author && (
            <div className="flex items-center gap-2">
              {post.author.image && (
                <Image
                  src={post.author.image.asset.url}
                  alt={post.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <span className="font-medium">{post.author.name}</span>
            </div>
          )}
          
          {post.publishedAt && (
            <time 
              dateTime={post.publishedAt}
              className="text-white/70"
            >
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>
          )}
        </div>

        {post.categories && (
          <div className="flex gap-2 mt-4">
            {post.categories.map((category: { _id: string; title: string }) => (
              <span
                key={category._id}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}
      </header>

      {post.mainImage && (
        <div className="relative aspect-video mb-8 rounded-lg overflow-hidden bg-gray-100 shadow-md">
          <Image
            src={post.mainImage.asset.url}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none text-white">
        <PortableText value={post.body} />
      </div>

      {post.author?.bio && (
        <div className="mt-16 p-6 bg-blue-50 rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold mb-4 text-black">About the author</h2>
          <div className="prose">
            <PortableText value={post.author.bio} />
          </div>
        </div>
      )}
    </article>
  )
}

async function getPost(slug: string) {
  return await client.fetch(postQuery, { slug })
} 