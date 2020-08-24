import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {

  const notification = useSelector(state => state.notification.notification)
  const type = useSelector(state => state.notification.type)
  
  return (
    notification ?
    <Alert variant={type}>
      {notification}
    </Alert>
    : null
  )
}

export default Notification
