import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useLocation, useHistory } from 'react-router-dom'
import _ from 'lodash'
import { API_ROOT } from '../consts'
import { useApis, useAuthRequired } from '../hooks'

const MediaViewer = styled(({ className }) => {
  const { notAuthenticated } = useAuthRequired()
  const location = useLocation()
  const { state, search } = location
  const [media, setMedia] = useState((state || {}).media)
  const dialogEl = useRef(null)
  const mediaId = new URLSearchParams(search).get('mediaId')
  const history = useHistory()
  const { fetchMedia } = useApis()

  const handleCloseMedia = (e) => {
    const searchParams = new URLSearchParams(search)
    searchParams.delete('mediaId')

    history.push({
      ...location,
      search: searchParams.toString(),
    })
  }

  useEffect(() => {
    setMedia((state || {}).media)
  }, [mediaId, state])
  useEffect(() => {
    if (notAuthenticated) return

    let isMounted = true

    if (_.isNil(media)) {
      fetchMedia({ _id: mediaId })
        .then(async res => {
          if (res.ok) {
            isMounted && setMedia(await res.json())
          }
          // FIXME: What if NOT OK
        })
    }

    dialogEl.current.show()

    return () => { isMounted = false }
  }, [media, mediaId, fetchMedia, notAuthenticated])

  if (_.isNil(media)) {
    return (
      <dialog className={className} ref={dialogEl} onWheel={e => e.preventDefault()}>
        <div className="loading-indicator">{'Loading...!'}</div>
      </dialog>
    )
  }

  const mediaType = ['video', 'image'].find(type => media.metadata.mimeType.includes(type))

  return (
    <dialog className={className} ref={dialogEl} onClick={handleCloseMedia}>
      <div className="media-wrapper" onClick={e => e.stopPropagation()}>
        <span className="title">{media.metadata.title}</span>
        {mediaType === 'video' && (
          <video
            muted
            controls
            className="video-media"
            src={`${API_ROOT}${media.signedUrl}`}
          />
        )}
        {mediaType === 'image' && (
          <img
            alt={media.title}
            className="image-media"
            src={`${API_ROOT}${media.signedUrl}`}
          />
        )}
      </div>
    </dialog>
  )
})`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0, 0.9);
  overflow-x: hidden;
  transition: 0.25s;
  border: 0;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  color: #b2bec3;
  text-align: center;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 0 1.4rem;

  &[open] {
    width: 100%;
  }

  .media-wrapper {
    justify-content: center;
    max-height: calc(100% - 2rem);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    cursor: pointer;
    margin-bottom: 0.6rem;
  }
  .loading-indicator {
    display: flex;
    flex-grow: 1;
    font-size: larger;
    justify-content: center;
    align-items: center;
  }
  .video-media,
  .image-media {
    max-width: 100%;
    max-height: calc(100% - 5rem);
    outline: none;
  }
`

export { MediaViewer }
