import React from 'react'
const Message = (props) => {
    const { message, type} = props
    if(message){
        return(
            <div className={type}>{message}</div>
        )
    } else {
        return(<></>)
    }
}

export default Message
