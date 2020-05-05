import React, { useState, useEffect } from 'react'
import { MediaList, StandardLayout, MediaViewer } from '../components'
import { useAuthRequired, useApis } from '../hooks'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'

const GalleryScreen = styled(({ className }) => {
  const { notAuthenticated } = useAuthRequired()
  const [medias, setMedias] = useState(null)
  const history = useHistory()
  const location = useLocation()
  const { getMedias } = useApis()
  const mediaId = new URLSearchParams(location.search).get('mediaId')

  useEffect(() => {
    if (notAuthenticated) return
    let isMounted = true

    getMedias()
      .then(async res => {
        if (!(isMounted)) return

        if (res.ok) {
          setMedias(await res.json())
        }
      })

    return () => {
      isMounted = false
    }
  }, [getMedias, notAuthenticated])

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
      {medias && (
        <MediaList medias={medias} onMediaClicked={handleMediaClicked} />
      )}
    </StandardLayout>
  )
})`
`

export { GalleryScreen }
