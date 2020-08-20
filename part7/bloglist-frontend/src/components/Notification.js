import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => state.notification.notification)
  const type = useSelector(state => state.notification.type)
  
  return (
    notification ?
    <div className={type}>
      {notification}
    </div>
    : null
  )
}

export default Notification
