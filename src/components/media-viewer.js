import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useLocation, useHistory } from 'react-router-dom'
import _ from 'lodash'
import { API_ROOT } from '../consts'
import { fetchMedia } from '../apis'

const MediaViewer = styled(({ className }) => {
  const location = useLocation()
  const { state, search } = location
  const [media, setMedia] = useState((state || {}).media)
  const dialogEl = useRef(null)
  const mediaId = new URLSearchParams(search).get('mediaId')
  const history = useHistory()

  const handleTitleClicked = (e) => {
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
  }, [media])

  if (_.isNil(media)) {
    return (
      <dialog className={className} ref={dialogEl} onWheel={e => e.preventDefault()}>
        <div className="loading-indicator">{'Loading...!'}</div>
      </dialog>
    )
  }

  const mediaType = ['video', 'image'].find(type => media.metadata.mimeType.includes(type))

  return (
    <dialog className={className} ref={dialogEl}>
      <div className="title" onClick={handleTitleClicked}>{media.metadata.title}</div>
      {mediaType === 'video' && (
        <div className="video-media">
          <video src={`${API_ROOT}/files/raw/${media._id}`} controls />
        </div>
      )}
      {mediaType === 'image' && (
        <div
          className="image-media"
          style={{ backgroundImage: `url(${API_ROOT}/files/raw/${media._id})` }}
        />
      )}
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

  & > * {
    margin: 1.4rem;
  }

  &[open] {
    width: 100%;
  }

  .title:hover {
    text-decoration: line-through;
    cursor: pointer;
  }
  .loading-indicator {
    display: flex;
    flex-grow: 1;
    font-size: larger;
    justify-content: center;
    align-items: center;
  }
  .video-media {
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .image-media {
    flex-grow: 1;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`

export { MediaViewer }
