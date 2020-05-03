import React from 'react'
import { MediaList, StandardLayout } from '../components'
import { useAuthRequired } from '../hooks'

const GalleryScreen = ({ className }) => {
  useAuthRequired()

  return (
    <StandardLayout className={className}>
      <MediaList />
    </StandardLayout>
  )
}

export { GalleryScreen }
