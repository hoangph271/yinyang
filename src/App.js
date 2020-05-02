import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

const App = styled(({ className }) => {
  return (
    <div className={[className, 'App'].join(' ')}>
      {<SelectableVideo />}
      <MediaList />
    </div>
  )
})`
  display: flex;
  background-color: #282c34;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const MediaList = styled(({ className }) => {
  const [medias, setMedias] = useState(null)
  useEffect(() => {
    const fetchMedias = async () => {
      const res = await fetch('http://localhost:8080/files')

      if (res.ok) {
        setMedias(await res.json())
      }
    }

    fetchMedias()
  }, [])

  return (
    <div className={className}>
      {medias && medias.map(media => (
        <div
          key={media._id}
          onContextMenu={(e) => {
            // TODO: Better this...!
            // e.preventDefault()

            // const confirmed = window.confirm('DELETE THIS...?')
            // confirmed && fetch(`http://localhost:8080/files/${media._id}`, { method: 'DELETE' })
          }}
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

const SelectableVideo = styled(({ className }) => {
  const [src, setSrc] = useState(null)
  const inputEl = useRef(null)
  const videoEl = useRef(null)

  const handleSrcChanged = (e) => {
    if (e.target.files[0]) {
      const src = URL.createObjectURL(e.target.files[0])
      setSrc(src)
    }
  }

  return (
    <div className={className}>
      <div className="video-zone">
        <div className="left-panel">
          <video src={src} ref={videoEl} controls autoPlay muted />
          <input type="file" ref={inputEl} onChange={handleSrcChanged} accept="video/*" />
        </div>
      </div>
      <button onClick={() => {
        const video = videoEl.current
        const { videoWidth, videoHeight } = video

        const canvas = new OffscreenCanvas(videoWidth, videoHeight)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight)

        canvas.convertToBlob({ type: 'image/jpeg' }).then((blob) => {
          const formData = new FormData()
          formData.append('file', inputEl.current.files[0], inputEl.current.files[0].name)
          formData.append('thumbnail', blob, `${inputEl.current.files[0].name}.jpeg`)
          fetch('http://localhost:8080/files', { method: 'POST', body: formData })
        })
      }} disabled={!(inputEl.current && inputEl.current.files[0])}>
        {'Submit'}
      </button>
    </div>
  )
})`
  .video-zone {
    display: flex;
  }

  .left-panel, .right-panel {
    width: calc(50% - 1.4rem);
  }

  video {
    max-width: 100%;
    max-height: 500px;
  }
  canvas {
    max-height: 500px;
  }
`

export default App
