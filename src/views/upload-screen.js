import React, { useState } from 'react'
import styled from 'styled-components'
import { UploadCard, StandardLayout, SelectFilesCard } from '../components'
import { useAuthRequired } from '../hooks'

const UploadScreen = styled(({ className }) => {
  const [files, setFiles] = useState([])
  useAuthRequired()

  return (
    <StandardLayout className={className} mainClassName="wrapper">
      <SelectFilesCard
        onChange={(e) => {
          const { files } = e.target
          setFiles(srcs => [...srcs, ...files])
        }}
      />
      {files.map((src, i) => (
        <UploadCard key={i} initFile={src} />
      ))}
    </StandardLayout>
  )
})`
  flex-direction: column;

  .wrapper {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
`

export { UploadScreen }
