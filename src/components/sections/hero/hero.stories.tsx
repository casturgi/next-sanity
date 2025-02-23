import type { Meta, StoryObj } from '@storybook/react'
import { Hero } from './index'
import { within } from '@storybook/test'
import { expect } from '@storybook/jest'

const meta = {
  title: 'Sections/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Hero>

export default meta
type Story = StoryObj<typeof Hero>

export const Default: Story = {
  args: {
    data: {
      title: 'Welcome to Our Site',
      subtitle: 'This is a sample hero section with a compelling description.',
      backgroundImage: {
        asset: {
          url: 'https://placehold.co/1920x1080',
        },
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify hero content', async () => {
      await expect(canvas.getByText('Welcome to Our Site')).toBeInTheDocument()
      await expect(
        canvas.getByText('This is a sample hero section with a compelling description.')
      ).toBeInTheDocument()
    })
  },
}

export const WithLongContent: Story = {
  args: {
    data: {
      title: 'A Very Long Title That Might Need Special Handling in the Layout',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      backgroundImage: {
        asset: {
          url: 'https://placehold.co/1920x1080',
        },
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify long content', async () => {
      await expect(
        canvas.getByText('A Very Long Title That Might Need Special Handling in the Layout')
      ).toBeInTheDocument()
    })
  },
}
