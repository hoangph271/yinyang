import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { API_ROOT } from '../consts'
import spinnerGif from '../assets/spinner.gif'

const CACHE_DB_VER = 1
const dbRequest = window.indexedDB.open('CacheDB', CACHE_DB_VER)
/** @type {IDBDatabase} */
let cachedDb = null
dbRequest.addEventListener('success', (evt) => { cachedDb = evt.target.result })
dbRequest.addEventListener('upgradeneeded', (evt) => {
  /** @type {IDBDatabase} */
  const db = evt.target.result

  if (db.objectStoreNames.contains('cachedUrls')) {
    db.deleteObjectStore('cachedUrls')
  }

  db.createObjectStore('cachedUrls', { autoIncrement: false })
})
const fetchBlob = async (url) => {
  const res = await fetch(url)

  if (res.ok) {
    return res.blob()
  }

  throw new Error(await res.text())
}
const setBlob = (key, blob) => new Promise((resolve, reject) => {
  const request = cachedDb
    .transaction('cachedUrls', 'readwrite')
    .objectStore('cachedUrls')
    .add(blob, key)

  request.addEventListener('success', evt => resolve(evt.result))
  request.addEventListener('error', err => reject(err))
})
const getBlob = key => new Promise((resolve, reject) => {
  const request = cachedDb
    .transaction('cachedUrls', 'readonly')
    .objectStore('cachedUrls')
    .get(key)

  request.addEventListener('success', evt => resolve(evt.target.result))
  request.addEventListener('error', err => reject(err))
})
const useCachedUrl = (key, url) => {
  const fullUrl = url.startsWith('http') ? url : `${API_ROOT}${url}`
  const [cachedUrl, setCachedUrl] = useState(null)

  useEffect(() => {
    if (cachedDb) {
      getBlob(key)
        .then(async (savedBlob) => {
          if (savedBlob) {
            setCachedUrl(URL.createObjectURL(savedBlob))
          } else {
            const blob = await fetchBlob(fullUrl)
            await setBlob(key, blob)

            setCachedUrl(URL.createObjectURL(blob))
          }
        })
        .catch(() => {
          setCachedUrl(fullUrl)
        })
    }
  }, [fullUrl, key])

  return {
    cachedUrl,
  }
}

const CachableImage = styled((props) => {
  const { className, md5 } = props
  const { cachedUrl } = useCachedUrl(md5, props.url)
  const url = md5 ? (cachedUrl || spinnerGif) : props.url

  return (
    <div
      className={className}
      style={{
        backgroundImage: `url(${url}`,
        backgroundSize: cachedUrl ? 'cover' : '2rem',
      }}
    />
  )
})`
  background-repeat: no-repeat;
  background-position: center;
`

const MediaList = styled(({ className, onMediaClicked, medias }) => {
  return (
    <div className={className}>
      {medias && medias.map(media => (
        <article
          key={media._id}
          alt={media.metadata.title}
          onClick={() => onMediaClicked({ media })}
        >
          <CachableImage className="thumbnail" md5={media.md5} url={media.signedUrl} />
          <div className="title">
            {media.metadata.title}
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
      flex-grow: 1;
    }
    .title {
      background-color: rgba(99, 110, 114, 0.6);
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;
      position: absolute;
      text-align: center;
      padding: 0 0.4rem;
      overflow: hidden;
      bottom: 0;
      right: 0;
      left: 0;
    }
  }
  article:hover {
    box-shadow: rgb(0, 0, 0) 5px 5px 10px;
    transform: scale(1.05);
  }
`

export { MediaList }
