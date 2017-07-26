import {
  GET_AUCTIONS_REQUEST,
  GET_AUCTIONS_SUCCESS,
  GET_AUCTIONS_ERROR,
  GET_OLD_AUCTIONS_REQUEST,
  GET_OLD_AUCTIONS_SUCCESS,
  GET_OLD_AUCTIONS_ERROR,
  SWITCH_AUCTIONS_LIST_TYPE,
  UPDATE_ONE_AUCTION,
} from 'constants'
import api from 'components/api'

import PubNub from 'pubnub'
import pubnubConfig from 'components/pubnub/pubnub.config.js'
const pubnub = new PubNub(pubnubConfig)

export function getAuctions() {
  return (dispatch) => {
    dispatch({
      type: GET_AUCTIONS_REQUEST,
    })

    dispatch({
      type: GET_OLD_AUCTIONS_REQUEST,
    })

    api.get('auctions?per_page=100&sorting=progress&status=0,1,2,3,4')
      .then(res => {
        dispatch({
          type: GET_AUCTIONS_SUCCESS,
          payload: res.data,
        })
      })
      .catch(res => {
        dispatch({
          type: GET_AUCTIONS_ERROR,
          errorMsg: res,
        })
      })

    api.get('auctions?per_page=100&status=5')
      .then(res => {
        dispatch({
          type: GET_OLD_AUCTIONS_SUCCESS,
          payload: res.data,
        })
      })
      .catch(res => {
        dispatch({
          type: GET_OLD_AUCTIONS_ERROR,
          errorMsg: res,
        })
      })
  }
}

export function updateOneAuction(update) {
  return {
    type: UPDATE_ONE_AUCTION,
    payload: update,
  }
}

export function switchAuctionsListType(type) {
  return {
    type: SWITCH_AUCTIONS_LIST_TYPE,
    payload: type,
  }
}

export function auctionChannelsSubscribe(auctionsChannels) {
  return async (dispatch) => {
    await pubnub.addListener({
      message(res) {
        const { message, channel } = res
        const auctionId = channel.replace('Events-', '')

        const payload = {
          id: auctionId,
          message,
        }

        dispatch({
          type: UPDATE_ONE_AUCTION,
          payload,
        })
      },
    })

    await pubnub.unsubscribeAll()

    pubnub.subscribe({
      channels: auctionsChannels,
    })
  }
}
