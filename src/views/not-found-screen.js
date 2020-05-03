import React from 'react'
import styled from 'styled-components'
import { StandardLayout } from '../components'

const NotFoundScreen = styled(({ className }) => {
  return (
    <StandardLayout className={className}>
      <div>
        {'404 | Not found'}
      </div>
    </StandardLayout>
  )
})`
  div {
    text-align: center;
  }
`

export { NotFoundScreen }
