import React from 'react'
import { useSelector } from 'react-redux'


function CertainProvider() {
    const providerId = useSelector((state) => state.allow.providerId)
    console.log('providerId ==========> '+providerId)
    console.log('providerId ==========> '+providerId)
    console.log('providerId ==========> '+providerId)
    console.log('providerId ==========> '+providerId)
  return (
    <div>
      certain provider page
    </div>
  )
}

export default CertainProvider
