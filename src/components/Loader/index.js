import React from 'react'
import { styled, keyframes } from '@mui/material'

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

const LoaderContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
})

const Loader = styled('div')({
  border: '16px solid #f3f3f3',
  borderTop: '16px solid #3498db',
  borderRadius: '50%',
  width: '120px',
  height: '120px',
  animation: `${spin} 2s linear infinite`,
})

const LoaderComponent = () => {
  return (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  )
}

export default LoaderComponent
