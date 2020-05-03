import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

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
        >
          <img
            alt={media.filename}
            src={`http://localhost:8080/files/${media._id}?thumbnail=1`}
          />
        </div>
      ))}
    </div>
  )
})`

`

export { MediaList }
