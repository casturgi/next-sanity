import React from 'react'
import { createRoot } from 'react-dom/client'
import type { Decorator } from '@storybook/react'

export const withReact18: Decorator = (Story, context) => {
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (rootRef.current) {
      const root = createRoot(rootRef.current)
      root.render(<Story {...context} />)
      return () => root.unmount()
    }
  }, [context])

  return <div ref={rootRef} />
}
