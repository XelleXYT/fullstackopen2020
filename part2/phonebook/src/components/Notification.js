import React, { useEffect } from 'react'
const Notification = (props) => {
    const { message } = props

    if (message === null) {
      return null
    }
  
    return (
      <div className="success">
        {message}
      </div>
    )
}

export default Notification