import {
  GET_CURRENT_AUCTION_REQUEST,
  GET_CURRENT_AUCTION_SUCCESS,
  GET_CURRENT_AUCTION_ERROR,
  UPDATE_CURRENT_AUCTION_IMMEDIATE,
  UPDATE_CURRENT_AUCTION_ASYNC_REQUEST,
  UPDATE_CURRENT_AUCTION_ASYNC_SUCCESS,
  UPDATE_CURRENT_AUCTION_ASYNC_ERROR,
  RESET_AUCTION_CARD,
  SET_CURRENT_SCENE,
  SET_INTERMISSION_TIME,
  COUNTDOWN_TICK,
  GET_PLAYERS_INFO_SUCCESS,
} from 'constants'

const initialState = {
  auction: null,
  isFetching: false,
  scene: '',
  intermission: 0,
  countdown: 0,
  players: [],
}

export default function auctionCard(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_AUCTION_REQUEST:
    case UPDATE_CURRENT_AUCTION_ASYNC_REQUEST:
      return { ...state, isFetching: true }
    case GET_CURRENT_AUCTION_SUCCESS:
    case UPDATE_CURRENT_AUCTION_ASYNC_SUCCESS:
      return { ...state, auction: { ...state.auction, ...action.payload }, isFetching: false }
    case UPDATE_CURRENT_AUCTION_IMMEDIATE:
      return { ...state, auction: { ...state.auction, ...action.payload } }
    case GET_CURRENT_AUCTION_ERROR:
    case UPDATE_CURRENT_AUCTION_ASYNC_ERROR:
      return { ...state, isFetching: false }
    case RESET_AUCTION_CARD:
      return initialState
    case SET_CURRENT_SCENE:
      return { ...state, scene: action.payload }
    case SET_INTERMISSION_TIME:
      return { ...state, intermission: action.payload }
    case COUNTDOWN_TICK:
      return { ...state, countdown: action.payload }
    case GET_PLAYERS_INFO_SUCCESS:
      return { ...state, players: action.payload }
    default:
      return state
  }
}
