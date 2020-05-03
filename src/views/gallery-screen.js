import React from 'react'
import { MediaList } from '../components'
import { useAuthRequired } from '../hooks'

const GalleryScreen = ({ className }) => {
  useAuthRequired()

  return (
    <div className={className}>
      <MediaList />
    </div>
  )
}

export { GalleryScreen }
