import React from 'react'
import { MediaList, StandardLayout, MediaViewer } from '../components'
import { useAuthRequired } from '../hooks'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'

const GalleryScreen = styled(({ className }) => {
  useAuthRequired()
  const history = useHistory()
  const location = useLocation()
  const viewMedia = new URLSearchParams(location.search).get('viewMedia')

  const handleMediaClicked = ({ media }) => {
    history.push({
      ...location,
      state: { media },
      search: `${location.search || '?'}&viewMedia=${media._id}`,
    })
  }

  return (
    <StandardLayout className={className}>
      {viewMedia && <MediaViewer id={viewMedia} />}
      <MediaList onMediaClicked={handleMediaClicked} />
    </StandardLayout>
  )
})`
`

export { GalleryScreen }
