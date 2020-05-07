import React, { useState, useRef, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { THUMBNAIL } from '../consts'
import { useApis, useCardSize } from '../hooks'
import cardBgrdPng from '../assets/card-bgrd.png'
import { MediaCard } from './media-card'

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

const UploadCard = styled(({ initFile = null, className, onUploaded = () => {}, initUpload }) => {
  const [uploaded, setUploaded] = useState(false)
  const [src, setSrc] = useState(null)
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
    if (uploaded) return
    if (!(initUpload)) return

    console.info('src')
  }, [initUpload, uploaded])

  useEffect(() => {
    if (_.isNil(previewPanelRef.current)) return

    setVideoHeight(previewPanelRef.current.clientHeight)
  }, [])

  useEffect(() => {
    if (_.isNil(fileType)) return

    if (fileType.includes('video')) {
      setIsLoading(true)
      const { current: video } = videoRef

      video.addEventListener('loadedmetadata', () => {
        video.currentTime = 0.15 * video.duration
        setIsLoading(false)
      })
    }
  }, [fileType])

  const handleUploadClicked = async () => {
    if (_.isNil(fileType)) return

    setIsLoading(true)

    const file = inputRef.current.files[0] || initFile
    const blob = fileType.includes('video')
      ? await thumbnailFromVideo({ video: videoRef.current })
      : await thumbnailFromImage({ image: imageRef.current })

    const body = new FormData()
    body.append('title', title)
    body.append('file', file, file.name)
    body.append('thumbnail', blob, `${file.name}.jpeg`)

    await postMedia({ body })

    setIsLoading(false)
    onUploaded()
    setUploaded(true)
  }

  const handleFileChanged = useCallback(file => {
    const src = URL.createObjectURL(file)

    setSrc(src)
    setFileType(file.type)
    setTitle(file.name)
  }, [])

  useEffect(() => {
    if (_.isNil(initFile)) return

    handleFileChanged(initFile)
  }, [initFile, handleFileChanged])

  const handleSrcChanged = (e) => {
    if (_.isNil(e.target.files[0])) return

    handleFileChanged(e.target.files[0])
  }

  return (
    <MediaCard className={className} style={{ width, height }}>
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
          disabled={isLoading || uploaded}
          onClick={handleUploadClicked}
        >
          {uploaded ? 'N/A' : 'Upload'}
        </button>
      </div>
    </MediaCard>
  )
})`
  .preview-panel {
    display: flex;
    width: 100%;
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
    width: 100%;
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
