import React from 'react'
import { MediaList, StandardLayout } from '../components'
import { useAuthRequired } from '../hooks'
import styled from 'styled-components'

const GalleryScreen = styled(({ className }) => {
  useAuthRequired()

  return (
    <StandardLayout className={className}>
      <MediaList />
    </StandardLayout>
  )
})`
`

export { GalleryScreen }
