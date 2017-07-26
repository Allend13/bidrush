import {
  GET_AUCTIONS_REQUEST,
  GET_AUCTIONS_SUCCESS,
  GET_OLD_AUCTIONS_SUCCESS,
  SWITCH_AUCTIONS_LIST_TYPE,
  UPDATE_ONE_AUCTION,
} from 'constants'

const initialState = {
  auctions: [],
  history: [],
  isFetching: false,
  activeListType: null,
  initialLoad: true,
  updated: null,
}

export default function auctionsList(state = initialState, action) {
  switch (action.type) {
    case GET_AUCTIONS_REQUEST:
      return { ...state, isFetching: true }
    case GET_AUCTIONS_SUCCESS:
      return {
        ...state,
        auctions: action.payload,
        isFetching: false,
        initialLoad: false,
        updated: Date.now(),
      }
    case GET_OLD_AUCTIONS_SUCCESS:
      return {
        ...state,
        history: action.payload,
      }
    case SWITCH_AUCTIONS_LIST_TYPE:
      return { ...state, activeListType: action.payload }
    case UPDATE_ONE_AUCTION:
      return {
        ...state,
        auctions: state.auctions.map(auction => {
          if (auction.id === action.payload.id) {
            return { ...auction, ...action.payload.message }
          }

          return auction
        }),
        updated: Date.now(),
      }
    default:
      return state
  }
}
