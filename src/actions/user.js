import {
  SET_USER_AUTHENTICATED,
  SET_USER_AUTHORIZED,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  GET_USER_REQUEST,
} from 'constants'
import api from 'components/api'

export function setUserAuthenticated(isAuthenticated) {
  return {
    type: SET_USER_AUTHENTICATED,
    payload: isAuthenticated,
  }
}

export function setUserAuthorized(isAuthorized) {
  return {
    type: SET_USER_AUTHORIZED,
    payload: isAuthorized,
  }
}

export function getUserInfo() {
  return dispatch => {
    dispatch({
      type: GET_USER_REQUEST,
    })

    api.get('users/me')
    .then(res => {
      dispatch({
        type: GET_USER_DATA_SUCCESS,
        payload: res.data,
      })
    })
    .catch(res => {
      dispatch({
        type: GET_USER_DATA_ERROR,
        error: res.error,
      })
    })
  }
}
