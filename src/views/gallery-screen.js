import React, { useState, useEffect, useCallback } from 'react'
import { MediaList, StandardLayout, MediaViewer, LoadmorePivot } from '../components'
import { useAuthRequired, useApis } from '../hooks'
import styled from 'styled-components'
import { useHistory, useLocation } from 'react-router-dom'

const GalleryScreen = styled(({ className }) => {
  const { notAuthenticated } = useAuthRequired()
  const [medias, setMedias] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState(null)
  const [page, setPage] = useState(-1)
  const history = useHistory()
  const location = useLocation()
  const { getMedias } = useApis()
  const mediaId = new URLSearchParams(location.search).get('mediaId')

  const handleLoadMore = useCallback(() => {
    setPage(page => page + 1)
  }, [])

  useEffect(() => {
    if (page === -1) return
    if (notAuthenticated) return

    let isMounted = true
    setIsLoading(true)

    getMedias({ page })
      .then(async res => {
        if (!(isMounted)) return

        if (res.ok) {
          const { total, files: medias } = await res.json()

          setMedias(prev => [...(prev || []), ...medias])
          setTotal(total)
        }

        setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [getMedias, notAuthenticated, page])

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
      <div className="gallery-wrapper">
        <MediaList medias={medias} onMediaClicked={handleMediaClicked} />
        {total !== (medias || []).length && (
          <LoadmorePivot
            isLoading={isLoading}
            onPivotReached={handleLoadMore}
          />
        )}
      </div>
    </StandardLayout>
  )
})`
  .gallery-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
  }
`

export { GalleryScreen }
