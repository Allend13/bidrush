/* eslint one-var: [0, "always"] */

export const SET_NAME = 'SET_NAME'

export const DEFAULT_ROUTE = 'auctions/tokens'

// API
const buildEnv = process.env.BUILD_ENV
const devServer = 'https://dev.playbidrush.com/api'
const prodServer = 'https://app.playbidrush.com/api'
export const API_ADRESS = buildEnv === 'production' ? prodServer : devServer

// UI
export const UI = {}
UI.OPEN_MENU = 'UI_OPEN_MENU'
UI.CLOSE_MENU = 'UI_CLOSE_MENU'
UI.TOGGLE_MENU = 'UI_TOGGLE_MENU'

// UI
export const PUBNUB = {}
PUBNUB.SET_AUCTIONS_CHANNELS = 'PUBNUB_SET_AUCTIONS_CHANNELS,'
PUBNUB.SET_ACTIVE_CHAT_CHANNEL = 'PUBNUB_SET_ACTIVE_CHAT_CHANNEL'


// AUCTIONS LIST
export const
  GET_AUCTIONS_REQUEST = 'GET_AUCTIONS_REQUEST',
  GET_AUCTIONS_SUCCESS = 'GET_AUCTIONS_SUCCESS',
  GET_AUCTIONS_ERROR = 'GET_AUCTIONS_ERROR',
  GET_OLD_AUCTIONS_REQUEST = 'GET_OLD_AUCTIONS_REQUEST',
  GET_OLD_AUCTIONS_SUCCESS = 'GET_OLD_AUCTIONS_SUCCESS',
  GET_OLD_AUCTIONS_ERROR = 'GET_OLD_AUCTIONS_ERROR',
  SWITCH_AUCTIONS_LIST_TYPE = 'SWITCH_AUCTIONS_LIST_TYPE',
  UPDATE_ONE_AUCTION = 'UPDATE_ONE_AUCTION'

 // AUCTION CARD
export const
  UPDATE_CURRENT_USER_BIDS = 'UPDATE_CURRENT_USER_BIDS',
  UPDATE_USER_BALANCE = 'UPDATE_USER_BALANCE',
  UPDATE_CURRENT_AUCTION = 'UPDATE_CURRENT_AUCTION',
  GET_CURRENT_AUCTION_REQUEST = 'GET_CURRENT_AUCTION_REQUEST',
  GET_CURRENT_AUCTION_SUCCESS = 'GET_CURRENT_AUCTION_SUCCESS',
  GET_CURRENT_AUCTION_ERROR = 'GET_CURRENT_AUCTION_ERROR',
  UPDATE_CURRENT_AUCTION_IMMEDIATE = 'UPDATE_CURRENT_AUCTION_IMMEDIATE',
  UPDATE_CURRENT_AUCTION_ASYNC_REQUEST = 'UPDATE_CURRENT_AUCTION_ASYNC_REQUEST',
  UPDATE_CURRENT_AUCTION_ASYNC_SUCCESS = 'UPDATE_CURRENT_AUCTION_ASYNC_SUCCESS',
  UPDATE_CURRENT_AUCTION_ASYNC_ERROR = ' UPDATE_CURRENT_AUCTION_ASYNC_ERROR',
  RESET_AUCTION_CARD = 'RESET_AUCTION_CARD',
  SET_CURRENT_SCENE = 'SET_CURRENT_SCENE',
  SET_USER_BIDS = 'SET_USER_BIDS',
  GET_PLAYERS_INFO_SUCCESS = 'GET_PLAYERS_INFO_SUCCESS',
  GET_PLAYERS_INFO_ERROR = 'GET_PLAYERS_INFO_ERROR',

// RACE TIMER
  SET_INTERMISSION_TIME = 'SET_INTERMISSION_TIME',
  COUNTDOWN_TICK = 'COUNTDOWN_TICK'

// AUCTION BIDDING
export const
  AUCTION_BID_ADD = 'AUCTION_BID_ADD',
  AUCTION_BID_ADD_ERROR = 'AUCTION_BID_ADD_ERROR',
  AUCTION_BID_REMOVE = 'AUCTION_BID_DECREASE',
  AUCTION_BID_REMOVE_ERROR = 'AUCTION_BID_REMOVE_ERROR',
  AUCTION_BID_ON_RACE = 'AUCTION_BID_ON_RACE',
  AUCTION_BID_ON_RACE_ERROR = 'AUCTION_BID_ON_RACE_ERROR'

// CHAT
export const
  CHAT_TOGGLE = 'CHAT_TOGGLE',
  CHANNEL_SUBSCRIBE = 'CHANNEL_SUBSCRIBE',
  CHANNEL_UNSUBSCRIBE = 'CHANNEL_UNSUBSCRIBE',
  CHANNEL_HISTORY_LOADED = 'CHANNEL_HISTORY_LOADED',
  CHAT_MSG_RECIEVED = 'CHAT_MSG_RECIEVED',
  CHAT_MSG_SENT = 'CHAT_MSG_SENT',
  SET_ACTIVE_CHANNEL = 'SET_ACTIVE_CHANNEL'

// AUTH
export const
  SET_AUTH_TOKEN = 'SET_AUTH_TOKEN',
  SET_USER_AUTHENTICATED = 'SET_USER_AUTHENTICATED',
  SET_USER_AUTHORIZED = 'SET_USER_AUTHORIZED'

// USER
export const
  GET_USER_REQUEST = 'GET_USER_REQUEST',
  GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS',
  GET_USER_DATA_ERROR = 'GET_USER_DATA_ERROR'
