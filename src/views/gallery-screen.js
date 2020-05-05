import React from 'react'
import { MediaList, StandardLayout, MediaViewer } from '../components'
import { useAuthRequired } from '../hooks'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'

const GalleryScreen = styled(({ className }) => {
  useAuthRequired()
  const history = useHistory()
  const location = useLocation()
  const mediaId = new URLSearchParams(location.search).get('mediaId')

  const handleMediaClicked = ({ media }) => {
    history.push({
      ...location,
      state: { media },
      search: `${location.search || '?'}&mediaId=${media._id}`,
    })
  }

  return (
    <StandardLayout className={className}>
      {mediaId && <MediaViewer id={mediaId} />}
      <MediaList onMediaClicked={handleMediaClicked} />
    </StandardLayout>
  )
})`
`

export { GalleryScreen }
