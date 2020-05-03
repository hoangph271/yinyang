import React from 'react'
import { SelectableVideo, StandardLayout } from '../components'
import { useAuthRequired } from '../hooks'
import styled from 'styled-components'

const UploadScreen = styled(({ className }) => {
  useAuthRequired()

  return (
    <StandardLayout className={className}>
      <SelectableVideo />
    </StandardLayout>
  )
})`
`

export { UploadScreen }
