import React from 'react'
import styled from 'styled-components'
import { useCardSize } from '../hooks'
import { MediaCard } from '../components'

const SelectFilesCard = styled(({ className, onChange }) => {
  const [width, height] = useCardSize()

  return (
    <label>
      <MediaCard className={className} style={{ width, height }}>
        <span>{'+'}</span>
        <input
          multiple
          type="file"
          onChange={onChange}
          style={{ display: 'none' }}
        />
      </MediaCard>
    </label>
  )
})`
  cursor: pointer;
  font-size: xx-large;
`

export { SelectFilesCard }
