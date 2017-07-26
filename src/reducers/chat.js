import {
  CHANNEL_HISTORY_LOADED,
  CHAT_MSG_RECIEVED,
  CHAT_TOGGLE,
  SET_ACTIVE_CHANNEL,
} from 'constants'

const initialState = {
  msgList: [],
  activeChannel: 'Chat-general',
  isOpen: true,
}

export default function chat(state = initialState, action) {
  const lastMsg = state.msgList.length ? state.msgList[state.msgList.length - 1] : null

  switch (action.type) {
    case CHAT_TOGGLE:
      return { ...state, isOpen: !state.isOpen }
    case CHANNEL_HISTORY_LOADED:
      return { ...state, msgList: action.payload }
    case CHAT_MSG_RECIEVED:
      if (lastMsg && lastMsg.timestamp !== action.payload.timestamp) {
        return { ...state, msgList: [...state.msgList, action.payload] }
      } else if (!lastMsg) {
        return { ...state, msgList: [action.payload] }
      }
      return state
    case SET_ACTIVE_CHANNEL:
      return { ...state, activeChannel: action.payload }
    default:
      return state
  }
}
