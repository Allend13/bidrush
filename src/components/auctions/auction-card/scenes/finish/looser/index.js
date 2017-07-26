import React, { PropTypes } from 'react'
import classNames from 'classnames'
import Players from '../../../players'
import BEM from 'modules/bem-classnames'

const Looser = props => {
  const { auction, players, getPlayersInfo } = props

  const blockClass = classNames(
    BEM.auctionCard.auctionCard,
    BEM.auctionCard.finish,
    BEM.auctionCard.finishLooser,
  )

  return (
    <div className={blockClass}>
      <div className="row">
        <div className={`${BEM.auctionCard.finishHeader} col-6`}>
          Race is over
        </div>
        <Players
          players={players}
          usersBids={auction.users_bids}
          getPlayersInfo={getPlayersInfo}
        />
      </div>
    </div>
  )
}

Looser.propTypes = {
  auction: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  getPlayersInfo: PropTypes.func.isRequired,
}

export default Looser
