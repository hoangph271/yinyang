import React from 'react'
import styled from 'styled-components'
import { useCardSize } from '../hooks'

const MediaCard = styled(({ className, children }) => {
  const [width, height] = useCardSize()

  return (
    <div className={className} style={{ width, height }}>
      {children}
    </div>
  )
})`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px solid rgba(108, 92, 231,1.0);
  border-radius: 2px;
  box-sizing: border-box;
  padding: 0.4rem;
  border-radius: 0.5rem;
`

export { MediaCard }
