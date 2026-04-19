import React from 'react'

const NextImage = ({
  src,
  alt,
  width,
  height,
}: {
  src: string
  alt: string
  width?: number
  height?: number
  [key: string]: unknown
}) => React.createElement('img', { src, alt, width, height })

NextImage.displayName = 'NextImage'

export default NextImage
