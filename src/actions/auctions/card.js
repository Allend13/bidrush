import {
  GET_CURRENT_AUCTION_REQUEST,
  GET_CURRENT_AUCTION_SUCCESS,
  GET_CURRENT_AUCTION_ERROR,
  UPDATE_CURRENT_AUCTION_IMMEDIATE,
  UPDATE_CURRENT_AUCTION_ASYNC_REQUEST,
  UPDATE_CURRENT_AUCTION_ASYNC_SUCCESS,
  UPDATE_CURRENT_AUCTION_ASYNC_ERROR,
  RESET_AUCTION_CARD,
  GET_PLAYERS_INFO_SUCCESS,
  GET_PLAYERS_INFO_ERROR,
} from 'constants'
import api from 'components/api'

export function getCurrentAuction(auctionId) {
  return (dispatch) => {
    dispatch({
      type: GET_CURRENT_AUCTION_REQUEST,
    })

    api.get(`auctions/${auctionId}`)
    .then(res => {
      dispatch({
        type: GET_CURRENT_AUCTION_SUCCESS,
        payload: res.data,
      })
    })

    .catch(res => {
      dispatch({
        type: GET_CURRENT_AUCTION_ERROR,
        error: res,
      })
    })
  }
}

export function updateCurrentAuction(auctionId, immediateUpdate) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_CURRENT_AUCTION_IMMEDIATE,
      payload: immediateUpdate,
    })

    dispatch({
      type: UPDATE_CURRENT_AUCTION_ASYNC_REQUEST,
    })

    api.get(`auctions/${auctionId}`)
      .then(res => {
        dispatch({
          type: UPDATE_CURRENT_AUCTION_ASYNC_SUCCESS,
          payload: res.data,
        })
      })
      .catch(res => {
        dispatch({
          type: UPDATE_CURRENT_AUCTION_ASYNC_ERROR,
          error: res,
        })
      })
  }
}

export function resetAuctionCard() {
  return {
    type: RESET_AUCTION_CARD,
  }
}


export function getPlayersInfo(ids) {
  return (dispatch) => {
    const requestPlayerInfo = (playerId) => api.get(`users/${playerId}`)
    const requests = ids.map(id => requestPlayerInfo(id))
    ids.forEach(id => requestPlayerInfo(id))

    Promise.all(requests)
    .then(res => {
      const playersData = res.map(resItem => {
        const playerData = {
          user_id: resItem.data.id,
          name: resItem.data.name,
          picture: resItem.data.picture,
        }
        return playerData
      })

      dispatch({
        type: GET_PLAYERS_INFO_SUCCESS,
        payload: playersData,
      })
    })
    .catch(res => {
      dispatch({
        type: GET_PLAYERS_INFO_ERROR,
        error: res,
      })
    })
  }
}
