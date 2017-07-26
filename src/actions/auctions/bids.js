import {
  AUCTION_BID_ADD,
  AUCTION_BID_ADD_ERROR,
  AUCTION_BID_REMOVE,
  AUCTION_BID_REMOVE_ERROR,
  AUCTION_BID_ON_RACE,
  AUCTION_BID_ON_RACE_ERROR,
  UPDATE_USER_BALANCE,
  UPDATE_CURRENT_AUCTION_IMMEDIATE,
} from 'constants'
import api from 'components/api'


const updateUserBalance = (dispatch, userId) => {
  api.get(`users/${userId}`).then(res => {
    dispatch({
      type: UPDATE_USER_BALANCE,
      payload: res.data,
    })
  })
}

const updateCurrenAuction = (dispatch, auction) => {
  dispatch({
    type: UPDATE_CURRENT_AUCTION_IMMEDIATE,
    payload: auction,
  })
}

export function bidPrecapAdd(auctionId, userId) {
  return (dispatch) => {
    dispatch({
      type: AUCTION_BID_ADD,
    })

    const updated = new Date().toISOString()

    api.put(`auctions/${auctionId}/bid`, {
      user_id: userId,
      updated,
    })
    .then(res => {
      updateUserBalance(dispatch, userId)
      updateCurrenAuction(dispatch, res.data)
    })
    .catch(error => {
      dispatch({
        type: AUCTION_BID_ADD_ERROR,
        error,
      })
    })
  }
}

export function bidPrecapRemove(auctionId, userId) {
  return (dispatch) => {
    const updated = new Date().toISOString()

    api.delete(`auctions/${auctionId}/bid`, {
      data: {
        user_id: userId,
        updated,
      },
    })
    .then(res => {
      dispatch({
        type: AUCTION_BID_REMOVE,
      })
      updateUserBalance(dispatch, userId)
      updateCurrenAuction(dispatch, res.data)
    })
    .catch(error => {
      dispatch({
        type: AUCTION_BID_REMOVE_ERROR,
        error,
      })
    })
  }
}

export function bidOnRace(auctionId, userId) {
  return (dispatch) => {
    const updated = new Date().toISOString()

    api.delete(`auctions/${auctionId}/bid`, {
      data: {
        user_id: userId,
        updated,
      },
    })
    .then(res => {
      dispatch({
        type: AUCTION_BID_ON_RACE,
      })
      updateCurrenAuction(dispatch, res.data)
    })
    .catch(error => {
      dispatch({
        type: AUCTION_BID_ON_RACE_ERROR,
        error,
      })
    })
  }
}
