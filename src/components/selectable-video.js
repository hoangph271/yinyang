import React, { useState, useRef } from 'react'
import styled from 'styled-components'

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

export { SelectableVideo }
