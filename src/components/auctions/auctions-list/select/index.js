import { createSelector } from 'reselect'

const getAuctions = state => state.auctionsList.auctions
const getHistoryAuctions = state => state.auctionsList.history
const getUserId = state => state.user.id
const getAuctionType = (state, ownProps) => ownProps.params.type

const sortedAuctionsSelector = createSelector(
  getAuctions,
  auctions =>
  auctions.sort((a, b) => {
    if (a.progress < b.progress) {
      return 1
    } else if (a.progress > b.progress) {
      return -1
    }

    return 0
  })
)

export const getMyHistorySelector = createSelector(
  [getHistoryAuctions, getUserId],
  (auctions, userId) => auctions.filter(auction => {
    const bids = auction.users_bids || null
    return bids ? bids.filter(bid => bid.user_id === userId).length : false
  })
)

const getMyAuctions = (sortedAuctions, userId) => sortedAuctions.filter(auction => {
  if (auction.status) {
    const bids = auction.users_bids || null
    return bids ? bids.filter(bid => bid.user_id === userId).length : false
  }
  return false
})


export const getCurrentAuctionsSelector = createSelector(
  [sortedAuctionsSelector, getAuctionType, getUserId],
  (auctions, type, userId) => {
    if (type === 'credits' || type === 'tokens') {
      return auctions.filter(auction => auction.type === type && auction.status < 2)
    }
    if (type === 'precap') {
      const myAuctions = getMyAuctions(auctions, userId)
      return myAuctions.filter(auction => auction.status === 1)
    }
    if (type === 'active') {
      const myAuctions = getMyAuctions(auctions, userId)
      return myAuctions.filter(auction => auction.status > 1)
    }
    return null
  }
)

export const getAuctionsSelector = createSelector(
  [getCurrentAuctionsSelector, getMyHistorySelector, getAuctionType],
  (auctions, history, type) => {
    if (type === 'history') return history
    return auctions
  }
)

export const getTokensAuctionsSelector = createSelector(
  sortedAuctionsSelector,
  auctions => auctions.filter(auction => auction.type === 'tokens' && status < 2)
)

export const getCreditsAuctionsSelector = createSelector(
  sortedAuctionsSelector,
  auctions => auctions.filter(auction => auction.type === 'credits' && status < 2)
)

export const getPubnubChannelsSelector = createSelector(
  sortedAuctionsSelector,
  auctions => auctions.map(auction => `Events-${auction.id}`)
)
