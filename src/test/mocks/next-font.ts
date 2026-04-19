// Mock for next/font/google and next/font/local in Vitest environment
const mockFont = () => ({
  className: 'mock-font',
  variable: 'mock-font-variable',
  style: { fontFamily: 'mock' },
})

export const Space_Grotesk = mockFont
export const JetBrains_Mono = mockFont
export const Inter = mockFont
export default mockFont
