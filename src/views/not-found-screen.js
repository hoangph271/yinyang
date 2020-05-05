import React from 'react'
import styled from 'styled-components'
import { StandardLayout } from '../components'

const NotFoundScreen = styled(({ className }) => {
  return (
    <StandardLayout className={className}>
      <div className="message">
        {'404 | Not found'}
      </div>
    </StandardLayout>
  )
})`
  .message {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export { NotFoundScreen }
