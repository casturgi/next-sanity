import type { Meta, StoryObj } from '@storybook/react'
import { Posts } from './index'
import { within } from '@storybook/test'

const meta = {
  title: 'Sections/Posts',
  component: Posts,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Posts>

export default meta
type Story = StoryObj<typeof Posts>

const samplePosts = [
  {
    _id: '1',
    title: 'First Post',
    slug: { current: 'first-post' },
    excerpt: 'This is the first post excerpt',
    publishedAt: '2024-02-20',
  },
  {
    _id: '2',
    title: 'Second Post',
    slug: { current: 'second-post' },
    excerpt: 'This is the second post excerpt',
    publishedAt: '2024-02-21',
  },
]

export const Default: Story = {
  args: {
    posts: samplePosts,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify multiple posts', async () => {
      await expect(canvas.getByText('First Post')).toBeInTheDocument()
      await expect(canvas.getByText('Second Post')).toBeInTheDocument()
    })

    await step('Check post links', async () => {
      const links = canvas.getAllByRole('link')
      expect(links).toHaveLength(2)
    })
  },
}

export const Empty: Story = {
  args: {
    posts: [],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify empty state', async () => {
      await expect(canvas.queryByRole('link')).not.toBeInTheDocument()
    })
  },
}

export const SinglePost: Story = {
  args: {
    posts: [samplePosts[0]],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Verify single post', async () => {
      await expect(canvas.getByText('First Post')).toBeInTheDocument()
      expect(canvas.getAllByRole('link')).toHaveLength(1)
    })
  },
}
