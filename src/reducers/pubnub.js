import { PUBNUB } from 'constants'
const { SET_AUCTIONS_CHANNELS, SET_ACTIVE_CHAT_CHANNEL } = PUBNUB

const initialState = {
  auctionsChannels: [],
  chatChannel: '',
}

export default function chat(state = initialState, action) {
  switch (action.type) {
    case SET_AUCTIONS_CHANNELS:
      return { ...state, auctionsChannels: action.payload }
    case SET_ACTIVE_CHAT_CHANNEL:
      return { ...state, chatChannel: action.payload }
    default:
      return state
  }
}
