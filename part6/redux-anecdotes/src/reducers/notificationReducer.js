const initialState = null

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION':
      return action.data.notification

    default: return state
  }
}

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {notification}
  }
}

export const deleteNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    data: { notification: null }
  }
}

export default reducer