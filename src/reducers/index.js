import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import ui from './ui'
import user from './user'
import chat from './chat'
import pubnub from './pubnub'
import auctionsList from './auctions-list'
import auctionCard from './auction-card'

export default combineReducers({
  ui,
  user,
  chat,
  auctionsList,
  auctionCard,
  pubnub,
  routing: routerReducer,
})
