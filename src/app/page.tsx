import { getPosts } from '@/sanity/lib/client'
import { Post } from '@/sanity/lib/queries'
import Image from "next/image";
import Link from 'next/link'

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post: Post) => (
            <article 
              key={post._id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {post.mainImage && (
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  <Image
                    src={post.mainImage.asset.url}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              <div className="p-4">
                <Link href={`/posts/${post.slug.current}`}>
                  <h2 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                
                {post.excerpt && (
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  {post.author && (
                    <div className="flex items-center gap-2">
                      {post.author.image && (
                        <Image
                          src={post.author.image.asset.url}
                          alt={post.author.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <span>{post.author.name}</span>
                    </div>
                  )}
                  
                  {post.publishedAt && (
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </time>
                  )}
                </div>
                
                {post.categories && post.categories.length > 0 && (
                  <div className="mt-4 flex gap-2">
                    {post.categories.map(category => (
                      <span
                        key={category.title}
                        className="px-2 py-1 bg-gray-100 rounded-full text-sm text-black"
                      >
                        {category.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
