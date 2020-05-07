import { useState } from 'react'

const useCardSize = () => {
  const [width] = useState('18rem')
  const [height] = useState('15rem')

  return [width, height]
}

export { useCardSize }
