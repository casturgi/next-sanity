import type { Preview } from '@storybook/react'
import '../src/app/globals.css'
import { withReact18 } from './decorators'

const preview: Preview = {
  parameters: {
    actions: {},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#333333' },
      ],
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
    react: {
      strictMode: true,
    },
  },

  decorators: [withReact18],
  tags: ['autodocs'],
}

export default preview
