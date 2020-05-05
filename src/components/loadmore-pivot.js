import React, { useEffect, useRef } from 'react'
import { useOnScreen } from '../hooks'
import styled from 'styled-components'

const LoadmorePivot = styled(({ className, isLoading, onPivotReached }) => {
  const pivot = useRef(null)
  const onScreen = useOnScreen(pivot)

  useEffect(() => {
    if (isLoading) return

    onScreen && onPivotReached()
  }, [onScreen, onPivotReached, isLoading])

  return (
    <div className={className}>
      <span ref={pivot}>{'...'}</span>
    </div>
  )
})`
`

export { LoadmorePivot }
