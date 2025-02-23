import { render, screen } from '@testing-library/react'
import { Hero } from '@/components/sections/hero'

describe('Hero', () => {
  const mockProps = {
    data: {
      title: 'Test Title',
      subtitle: 'Test Subtitle',
      backgroundImage: {
        asset: {
          url: 'https://placehold.co/1920x1080',
        },
      },
    },
  }

  it('renders hero section with title and subtitle', () => {
    render(<Hero {...mockProps} />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
  })

  it('renders background image', () => {
    render(<Hero {...mockProps} />)

    const image = screen.getByRole('img') as HTMLImageElement
    expect(image.src).toContain(encodeURIComponent(mockProps.data.backgroundImage.asset.url))
  })
})
