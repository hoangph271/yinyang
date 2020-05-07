import React from 'react'
import styled from 'styled-components'
import { API_ROOT } from '../consts'

const MediaList = styled(({ className, onMediaClicked, medias }) => {
  return (
    <div className={className}>
      {medias && medias.map(media => (
        <article
          key={media._id}
          alt={media.metadata.title}
          onClick={() => onMediaClicked({ media })}
        >
          <div className="thumbnail" style={{ backgroundImage: `url(${API_ROOT}${media.signedUrl}&thumbnail=1` }}/>
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
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
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
  article:hover .title {
    background-color: rgba(45, 52, 54, 0.8);
  }
`

export { MediaList }
