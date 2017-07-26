import { createSelector } from 'reselect'
import find from 'lodash/find'

const getCurrentAuction = state => state.auctionCard.auction
const getUserId = state => state.user.id
const getPlayers = state => state.auctionCard.players

export const getUserBidsSelector = createSelector(
  [getCurrentAuction, getUserId],
  (auction, userId) => {
    if (auction) {
      const bids = auction.users_bids
      const userBids = bids.filter(bid => bid.user_id === userId)[0]

      return userBids ? userBids.amount : 0
    }
    return 0
  }
)

const getUsersBidsSelector = createSelector(
  getCurrentAuction,
  auction => {
    if (auction) return auction.users_bids
    return []
  }
)


const sortPlayersByUpdateTime = (a, b) => {
  const dateA = Date.parse(a.updated)
  const dateB = Date.parse(b.updated)

  if (dateA > dateB) return -1
  if (dateA < dateB) return 1
  return 0
}

export const getPlayersSelector = createSelector(
  [getUsersBidsSelector, getPlayers],
  (usersBids, players) => {
    if (usersBids && players) {
      const mergedPlayersInfo = players.map(player => {
        const user = find(usersBids, { user_id: player.user_id })
        return { ...player, ...user }
      })

      return mergedPlayersInfo.sort(sortPlayersByUpdateTime)
    }

    return []
  }
)
