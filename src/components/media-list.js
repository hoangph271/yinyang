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
        <article
          key={media._id}
          alt={media.filename}
        >
          <div className="thumbnail" style={{ backgroundImage: `url(${API_ROOT}/files/${media._id}?thumbnail=1)` }}/>
          <div className="title">
            {media.filename}
          </div>
        </article>
      ))}
    </div>
  )
})`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  article {
    margin: 0.6rem;
    width: 20rem;
    height: 15rem;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;

    .thumbnail {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      flex-grow: 1;
    }
    .title {
      background-color: rgba(99, 110, 114, 0.6);
      position: absolute;
      text-align: center;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }
  article:hover .title {
    background-color: rgba(45, 52, 54, 0.8);
  }
`

export { MediaList }
