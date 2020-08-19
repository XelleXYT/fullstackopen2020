const initialState = null

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION':
      return action.data.notification

    default: return state
  }
}

const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { notification }
  }
}

const deleteNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    data: { notification: null }
  }
}

export const setTimedNotification = (notification, shownTime) => async (dispatch) => {
  dispatch(setNotification(notification))
  setTimeout(() => {
    dispatch(deleteNotification())
  }, shownTime*1000)
}

export default reducer