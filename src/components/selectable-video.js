import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import _ from 'lodash'

const SelectableVideo = styled(({ className }) => {
  const [src, setSrc] = useState(null)
  const [filename, setFileName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const inputEl = useRef(null)
  const videoEl = useRef(null)

  const handleSubmit = async () => {
    if (_.isNil(videoEl.current)) return

    setIsLoading(true)
    const video = videoEl.current
    const { videoWidth, videoHeight } = video

    const canvas = new OffscreenCanvas(videoWidth, videoHeight)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, videoWidth, videoHeight)

    const blob = await canvas.convertToBlob({ type: 'image/jpeg' })

    const formData = new FormData()
    formData.append('filename', filename)
    formData.append('file', inputEl.current.files[0], inputEl.current.files[0].name)
    formData.append('thumbnail', blob, `${inputEl.current.files[0].name}.jpeg`)

    await fetch('http://localhost:8080/files', { method: 'POST', body: formData })

    setIsLoading(false)
  }

  const handleSrcChanged = (e) => {
    if (e.target.files[0]) {
      const src = URL.createObjectURL(e.target.files[0])

      setSrc(src)
      setFileName(e.target.files[0].name)
    }
  }

  return (
    <div className={className}>
      <div className="left-panel">
        {src ? (
          <video src={src} ref={videoEl} controls muted />
        ) : (
          <div>
            {'Select a media...!'}
          </div>
        )}
      </div>
      <div className="right-panel">
        <input type="file" ref={inputEl} onChange={handleSrcChanged} accept="video/*" />
        <input placeholder="filename" value={filename} onChange={e => setFileName(e.target.value)} />
        <button
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {'Submit'}
        </button>
      </div>
    </div>
  )
})`
  display: flex;
  justify-content: space-evenly;

  .left-panel, .right-panel {
    width: calc(50% - 1.4rem);
    min-height: 10rem;
  }
  .right-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  video {
    max-width: calc(100% - 4rem);
  }
  canvas {
    max-height: 500px;
  }
`

export { SelectableVideo }
