import {
    CHANNEL_HISTORY_LOADED,
    CHAT_MSG_RECIEVED,
    CHAT_TOGGLE,
    SET_ACTIVE_CHANNEL,
} from 'constants'

import PubNub from 'pubnub'
import pubnubConfig from 'components/pubnub/pubnub.config.js'
const pubnub = new PubNub(pubnubConfig)

export function chatToggle() {
  return {
    type: CHAT_TOGGLE,
    payload: '',
  }
}

export function setActiveChatChannel(channel) {
  return {
    type: SET_ACTIVE_CHANNEL,
    payload: channel,
  }
}

export function chatHistoryLoad(activeChannel) {
  return (dispatch) => {
    pubnub.history({
      channel: activeChannel,
      count: 15,
    }, (stat, res) => {
      const { messages } = res
      const messagesList = messages.filter(msg => typeof(msg) === 'object' && msg.entry.type === 'message')

      dispatch({
        type: CHANNEL_HISTORY_LOADED,
        payload: messagesList.map(msg => msg.entry),
      })
    },
    )
  }
}


export function chatChannelSubscribe(activeChannel) {
  return async (dispatch) => {
    await pubnub.addListener({
      message(res) {
        const { message } = res


        if (message.type === 'message') {
          dispatch({
            type: CHAT_MSG_RECIEVED,
            payload: message,
          })
        }
      },
    })

    await pubnub.unsubscribeAll()

    pubnub.subscribe({
      channels: [activeChannel],
    })
  }
}


export function chatSendMsg(activeChannel, user, msg) {
  return () => {
    const timestamp = Math.floor((new Date()).getTime() / 1000)

    pubnub.publish({
      channel: activeChannel,
      message: {
        type: 'message',
        timestamp,
        data: {
          user_id: user.id,
          name: user.name,
          link: `https://www.facebook.com/${user.facebook_id}`,
          picture: user.picture,
          text: msg,
        },
      },
    })
  }
}
