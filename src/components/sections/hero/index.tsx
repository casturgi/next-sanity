import Image from 'next/image'
import Link from 'next/link'
import type { Hero as HeroType } from '@/sanity/lib/queries'

interface HeroProps {
  data?: HeroType | null
}

export function Hero({ data }: HeroProps) {
  // If no data is provided, don't render anything
  if (!data?.backgroundImage?.asset?.url) {
    return null
  }

  return (
    <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <Image
        src={data.backgroundImage.asset.url}
        alt={data.title || ""}
        fill
        priority
        className="object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="max-w-3xl px-4">
          {data.title && (
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              {data.title}
            </h1>
          )}
          
          {data.subtitle && (
            <p className="mb-8 text-lg text-gray-200 sm:text-xl">
              {data.subtitle}
            </p>
          )}
          
          {data.cta?.text && data.cta.href && (
            <Link
              href={data.cta.href}
              target={data.cta.isExternal ? "_blank" : undefined}
              rel={data.cta.isExternal ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-100"
            >
              {data.cta.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
} 