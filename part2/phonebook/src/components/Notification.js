import React from 'react'
const Notification = (props) => {
    const { message, type } = props

    if (message === null) {
      return null
    }
  
    return (
      <div className={type}>
        {message}
      </div>
    )
}

export default Notification