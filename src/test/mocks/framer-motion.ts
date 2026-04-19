import React from 'react'

const motion = new Proxy(
  {},
  {
    get: (_target, tag: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Component = React.forwardRef(({ children, ...props }: any, ref: any) =>
        React.createElement(tag, { ...props, ref }, children)
      )
      Component.displayName = `motion.${tag}`
      return Component
    },
  }
)

export { motion }
export const AnimatePresence = ({ children }: { children: React.ReactNode }) => children
export const useReducedMotion = () => false
export const useAnimation = () => ({ start: () => {} })
