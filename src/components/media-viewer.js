import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import _ from 'lodash'
import { API_ROOT } from '../consts'

const MediaViewer = styled(({ className }) => {
  const { state, search } = useLocation()
  const [media, setMedia] = useState((state || {}).media)
  const dialogEl = useRef(null)
  const _id = new URLSearchParams(search).get('viewMedia')

  useEffect(() => {
    setMedia((state || {}).media)
  }, [_id, state])
  useEffect(() => {
    if (_.isNil(media)) {
      // TODO: Fetch media
    } else {
      dialogEl.current.show()
    }
  }, [media])

  return (
    <dialog className={className} ref={dialogEl}>
      {media && (
        <>
          {media.metadata.mimeType.includes('video') ? (
            <video src={`${API_ROOT}/files/${media._id}`} controls />
          ) : (
            <div>{'WIP'}</div>
          )}
        </>
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
  transition: 0.5s;

  &[open] {
    width: 100%;
  }
`

export { MediaViewer }
