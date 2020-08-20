const initialState = {notification: null, style: 'error'}
var auxTimeout = null

const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION':
      return action.data

    default: return state
  }
}

const setNotification = (notification, type) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { notification, type }
  }
}

const deleteNotification = () => {
  return {
    type: 'SET_NOTIFICATION',
    data: { notification: null }
  }
}

export const setTimedNotification = (notification, type, shownTime) => async (dispatch) => {
  dispatch(setNotification(notification, type))
  clearTimeout(auxTimeout)
  auxTimeout = setTimeout(() => {
    dispatch(deleteNotification())
  }, shownTime*1000)
}

export default reducer