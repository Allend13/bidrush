import { PUBNUB } from 'constants'
const { SET_AUCTIONS_CHANNELS, SET_ACTIVE_CHAT_CHANNEL } = PUBNUB

export function setAuctionsChannels(channelsID) {
  return {
    type: SET_AUCTIONS_CHANNELS,
    payload: channelsID,
  }
}

export function setActiveChatChannel(chatId) {
  return {
    type: SET_ACTIVE_CHAT_CHANNEL,
    payload: chatId,
  }
}
