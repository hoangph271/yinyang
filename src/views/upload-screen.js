import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { UploadCard, StandardLayout } from '../components'
import { useAuthRequired } from '../hooks'

const UploadScreen = styled(({ className }) => {
  useAuthRequired()
  const history = useHistory()

  return (
    <StandardLayout className={className}>
      <UploadCard onUploaded={() => history.push('/gallery')}/>
    </StandardLayout>
  )
})`
`

export { UploadScreen }
