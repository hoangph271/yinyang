import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { THUMBNAIL } from '../consts'
import { useApis, useCardSize } from '../hooks'
import cardBgrdPng from '../assets/card-bgrd.png'

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

const UploadCard = styled(({ initSrc = null, className, onUploaded }) => {
  const [src, setSrc] = useState(initSrc)
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [fileType, setFileType] = useState(null)
  const { postMedia } = useApis()
  const [width, height] = useCardSize()
  const [videoHeight, setVideoHeight] = useState({ width: 0, height: 0 })
  const inputRef = useRef(null)
  const videoRef = useRef(null)
  const imageRef = useRef(null)
  const previewPanelRef = useRef(null)

  useEffect(() => {
    if (_.isNil(previewPanelRef.current)) return

    setVideoHeight(previewPanelRef.current.clientHeight)
  }, [])

  const handleSubmit = async () => {
    if (_.isNil(fileType)) return

    setIsLoading(true)

    const blob = fileType.includes('video')
      ? await thumbnailFromVideo({ video: videoRef.current })
      : await thumbnailFromImage({ image: imageRef.current })

    const body = new FormData()
    body.append('title', title)
    body.append('file', inputRef.current.files[0], inputRef.current.files[0].name)
    body.append('thumbnail', blob, `${inputRef.current.files[0].name}.jpeg`)

    await postMedia({ body })

    setIsLoading(false)
    onUploaded()
  }

  const handleSrcChanged = (e) => {
    if (e.target.files[0]) {
      const src = URL.createObjectURL(e.target.files[0])

      setSrc(src)
      setFileType(e.target.files[0].type)
      setTitle(e.target.files[0].name)
    }
  }

  return (
    <div className={className} style={{ width, height }}>
      <div
        ref={previewPanelRef}
        className={['preview-panel', _.isNil(src) ? 'waiting' : ''].join(' ')}
      >
        {src && (
          <>
            {fileType.includes('video') ? (
              <video
                muted
                controls
                src={src}
                height={videoHeight}
                ref={videoRef}
              />
            ) : (
              <div className="image-view" style={{ backgroundImage: `url(${src})` }}>
                <img style={{ display: 'none' }} src={src} ref={imageRef} alt="Selected media" />
              </div>
            )}
          </>
        )}
      </div>
      <div className="control-panel">
        <div className="title-zone">
          <label>
            <span>{'📁'}</span>
            <input type="file" ref={inputRef} onChange={handleSrcChanged} accept="video/* image/*" />
          </label>
          <input placeholder="title" type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
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
  flex-direction: column;
  border: 2px solid rgba(108, 92, 231,1.0);
  border-radius: 2px;
  box-sizing: border-box;
  padding: 0.4rem;
  border-radius: 0.5rem;

  .preview-panel {
    display: flex;
    flex-grow: 1;
  }
  .preview-panel.waiting {
    cursor: not-allowed;
    background-image: url(${cardBgrdPng});
    background-color: rgba(178, 190, 195, 0.6);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  .control-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .title-zone {
    display: flex;
    label {
      cursor: pointer;
    }

    input[type="file"] {
      width: 2rem;
      height: 2rem;
      display: none;
    }
    input[type="text"] {
      flex-grow: 1;
      border: 1px solid rgba(99, 110, 114,1.0);
      border-radius: 0.3rem;
      padding: 0.4rem;
      margin: 0.2rem 0;
    }
  }
  video {
    width: 100%;
    background-color: black;
  }
  .image-view {
    flex-grow: 1;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
  }
  canvas {
    max-height: 500px;
  }
`

export { UploadCard }
