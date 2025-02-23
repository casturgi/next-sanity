import { render, screen } from '@testing-library/react'
import { Posts } from '@/components/sections/posts'

describe('Posts', () => {
  const mockProps = {
    posts: [
      {
        _id: '1',
        title: 'Test Post 1',
        slug: { current: 'test-post-1' },
        excerpt: 'Test excerpt 1',
        publishedAt: '2024-03-01',
      },
      {
        _id: '2',
        title: 'Test Post 2',
        slug: { current: 'test-post-2' },
        excerpt: 'Test excerpt 2',
        publishedAt: '2024-03-02',
      },
    ],
  }

  it('renders posts section with title', () => {
    render(<Posts {...mockProps} />)
    expect(screen.getByText('Latest Posts')).toBeInTheDocument()
  })

  it('renders all posts', () => {
    render(<Posts {...mockProps} />)

    mockProps.posts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument()
      expect(screen.getByText(post.excerpt)).toBeInTheDocument()
    })
  })

  it('renders post links with correct hrefs', () => {
    render(<Posts {...mockProps} />)

    mockProps.posts.forEach((post) => {
      const link = screen.getByRole('link', { name: post.title })
      expect(link).toHaveAttribute('href', `/posts/${post.slug.current}`)
    })
  })
})
