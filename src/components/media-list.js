import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { API_ROOT } from '../consts'

const MediaList = styled(({ className }) => {
  const [medias, setMedias] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchMedias = async () => {
      const res = await fetch('http://localhost:8080/files')

      if (res.ok) {
        isMounted && setMedias(await res.json())
      }
    }

    fetchMedias()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className={className}>
      {medias && medias.map(media => (
        <div
          key={media._id}
          alt={media.filename}
          style={{
            backgroundImage: `url(${API_ROOT}/files/${media._id}?thumbnail=1)`,
          }}
        />
      ))}
    </div>
  )
})`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  div {
    margin: 0.4rem;
    width: 20rem;
    height: 15rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`

export { MediaList }
