import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { Button } from 'components/ui'
import { Link } from 'react-router'
import BEM from 'modules/bem-classnames'

const Winner = props => {
  const { auction } = props

  const blockClass = classNames(
    BEM.auctionCard.finish,
    BEM.auctionCard.finishWinner,
    `${BEM.auctionCard.finish}--${auction.type}`
  )

  const btnClass = classNames(
    'btn--shadow',
    'btn--full-with',
    { 'btn--red': auction.type === 'credits' }
  )

  return (
    <div className={blockClass} style={{ backgroundImage: `url(${auction.item.images[0]})` }}>
      <div className={BEM.auctionCard.finishPrizeIcon}></div>
      <Link to={`/auctions/${auction.type}/${auction.id}/prize-claim`}>
        <Button className={btnClass}>CLAIM YOUR PRIZE</Button>
      </Link>
    </div>
  )
}

Winner.propTypes = {
  auction: PropTypes.object.isRequired,
}

export default Winner
