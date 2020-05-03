import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { THUMBNAIL } from '../consts'
import _ from 'lodash'

const calcCanvasSize = (width, height) => {
  const ratio = width / height

  return ratio >= THUMBNAIL.RATIO
    ? [THUMBNAIL.MAX_WIDTH, THUMBNAIL.MAX_WIDTH / ratio]
    : [THUMBNAIL.MAX_HEIGHT * ratio, THUMBNAIL.MAX_HEIGHT]
}
const thumbnailFromImage = ({ image }) => {
  const { naturalWidth, naturalHeight } = image
  const [canvasWidth, canvasHeight] = calcCanvasSize(naturalWidth, naturalHeight)

  const canvas = new OffscreenCanvas(canvasWidth, canvasHeight)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight)

  return canvas.convertToBlob({ type: 'image/jpeg' })
}
const thumbnailFromVideo = ({ video }) => {
  const { videoWidth, videoHeight } = video
  const [canvasWidth, canvasHeight] = calcCanvasSize(videoWidth, videoHeight)

  const canvas = new OffscreenCanvas(canvasWidth, canvasHeight)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0, canvasWidth, canvasHeight)

  return canvas.convertToBlob({ type: 'image/jpeg' })
}

const SelectableVideo = styled(({ className }) => {
  const [src, setSrc] = useState(null)
  const [filename, setFileName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fileType, setFileType] = useState(null)
  const inputEl = useRef(null)
  const videoEl = useRef(null)
  const imageEl = useRef(null)

  const handleSubmit = async () => {
    if (_.isNil(fileType)) return

    setIsLoading(true)

    const blob = fileType.includes('video')
      ? await thumbnailFromVideo({ video: videoEl.current })
      : await thumbnailFromImage({ image: imageEl.current })

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
      setFileType(e.target.files[0].type)
      setFileName(e.target.files[0].name)
    }
  }

  return (
    <div className={className}>
      <div className="left-panel">
        {src ? (
          <>
            {fileType.includes('video') ? (
              <video src={src} ref={videoEl} controls muted />
            ) : (
              <img src={src} ref={imageEl} alt="Selected media" />
            )}
          </>
        ) : (
          <div>
            {'Select a media...!'}
          </div>
        )}
      </div>
      <div className="right-panel">
        <input type="file" ref={inputEl} onChange={handleSrcChanged} accept="video/* image/*" />
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

  video, img {
    max-width: calc(100% - 4rem);
  }
  canvas {
    max-height: 500px;
  }
`

export { SelectableVideo }
