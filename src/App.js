import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

const App = styled(({ className }) => {
  return (
    <div className={[className, 'App'].join(' ')}>
      <SelectableVideo />
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

const SelectableVideo = styled(({ className }) => {
  const [src, setSrc] = useState(null)
  const [size, setSize] = useState({})
  const [duration, setDuration] = useState('')
  const videoEl = useRef(null)
  const canvasEl = useRef(null)

  const handleVideoChanged = (e) => {
    if (e.target.files[0]) {
      const src = URL.createObjectURL(e.target.files[0])
      setSrc(src)
    }
  }
  const handleSeek = (e) => {
    videoEl.current.currentTime = parseInt(e.target.value)
  }

  useEffect(() => {
    const video = videoEl.current
    const canvas = canvasEl.current

    video.addEventListener('loadedmetadata', () => {
      setDuration(video.duration)
      setSize({
        width: video.videoWidth / 2,
        height: video.videoHeight / 2,
      })
    })
    videoEl.current.addEventListener('timeupdate', () => {
      canvas.getContext('2d').drawImage(video, 0, 0, 540, 960)
    })
  }, [src])

  return (
    <div className={className}>
      <div className="video-zone">
        <div className="left-panel">
          <video src={src} ref={videoEl} controls />
          <input type="file" onChange={handleVideoChanged} accept="video/*" />
        </div>
        <div className="right-panel">
          <canvas width={size.width} height={size.height} ref={canvasEl} />
          <input disabled={!videoEl.current} onChange={handleSeek} type="range" current="0" min="0" max={duration} />
        </div>
      </div>
      <button onClick={() => {
        canvasEl.current.toBlob(blob => {
          const formData = new FormData()
          formData.append('thumbnail', blob)
          fetch('http://localhost:8080/files/thumbnails', { method: 'POST', body: formData })
        })
      }}>
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
