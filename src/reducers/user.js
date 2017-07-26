import {
  SET_USER_AUTHENTICATED,
  SET_USER_AUTHORIZED,
  GET_USER_DATA_SUCCESS,
  UPDATE_USER_BALANCE,
} from 'constants'

const initialState = {
  isAuthenticated: false,
  isAuthorized: false,
  id: '',
  facebook_id: '',
  name: '',
  picture: '',
  credits: 0,
  tokens: 0,
  roles: [],
  has_tokens_renewed: null,
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
      }
    case SET_USER_AUTHORIZED:
      return {
        ...state,
        isAuthorized: action.payload,
      }
    case GET_USER_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload,
        facebook_id: `${action.payload.facebook_id}`,
        credits: +action.payload.credits,
        tokens: +action.payload.tokens,
      }
    case UPDATE_USER_BALANCE:
      return { ...state, credits: +action.payload.credits, tokens: +action.payload.tokens }
    default:
      return { ...state }
  }
}
