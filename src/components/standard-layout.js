import React from 'react'
import styled from 'styled-components'

const StandardLayout = styled(({ className, children }) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
})`
  display: flex;
  background-color: #282c34;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

export { StandardLayout }
