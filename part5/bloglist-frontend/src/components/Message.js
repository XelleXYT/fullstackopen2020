import React from 'react'
import PropTypes from 'prop-types'

const Message = (props) => {
  const { message, type } = props
  if(message){
    return(
      <div className={type}>{message}</div>
    )
  } else {
    return(<></>)
  }
}

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string.isRequired
}

export default Message
