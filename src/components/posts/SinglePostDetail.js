import React from 'react'
import { useParams } from 'react-router-dom'

const SinglePostDetail = () => {
  const { id } = useParams()
  return (
    <div>SinglePostDetai{id}</div>
  )
}

export default SinglePostDetail