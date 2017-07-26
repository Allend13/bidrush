import React, { PropTypes } from 'react'
import './prize-claim.less'

const PrizeClaim = () => {
  const a = 1
  return (
    <div>Prize claim {a}</div>
  )
}

PrizeClaim.propTypes = {
  auction: PropTypes.object,
  isWinner: PropTypes.bool,
  players: PropTypes.array,
  auctionCardActions: PropTypes.object,
}

export default PrizeClaim
