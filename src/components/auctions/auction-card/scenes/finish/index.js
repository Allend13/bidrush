import React, { PropTypes } from 'react'
import Winner from './winner'
import Looser from './looser'
import './finish.less'

const FinishScene = props => {
  const { auction, isWinner, players, auctionCardActions } = props
  const { getPlayersInfo } = auctionCardActions

  if (isWinner) return <Winner auction={auction} />

  return <Looser auction={auction} players={players} getPlayersInfo={getPlayersInfo} />
}

FinishScene.propTypes = {
  auction: PropTypes.object,
  isWinner: PropTypes.bool,
  players: PropTypes.array,
  auctionCardActions: PropTypes.object,
}

export default FinishScene
