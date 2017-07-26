import React, { PropTypes } from 'react'
import { Icon, Scrollbar, ProgressCircle } from 'components/ui'
import BEM from 'modules/bem-classnames'
import './join.less'

const JoinScene = props => {
  const { auction, replace } = props

  const joinAuction = () => {
    replace('precap')
  }

  return (
    <div className={BEM.auctionCard.auctionCardJoin}>
      <div className={BEM.auctionCard.itemTitle}>
        {auction.item.title}
      </div>

      <hr className={BEM.auctionCard.hr} />

      <div className={BEM.auctionCard.auctionStat}>
        <div className={BEM.auctionCard.itemPrice}>
          <Icon type="tokens" />
          <div>
            <div className={BEM.auctionCard.itemPriceAmount}>
              {auction.item.price}
            </div>
            Retail price
          </div>
        </div>
        <div className={BEM.auctionCard.statProgress}>
          <ProgressCircle progress={auction.progress} size="s" />
          <div>
            <div className={BEM.auctionCard.statProgressAmount}>
              {auction.progress}%
            </div>
            To start
          </div>
        </div>
      </div>

      <hr className={BEM.auctionCard.hr} />

      <div className={BEM.auctionCard.itemDescription}>
        <div>
          <Scrollbar>
            <div>{auction.item.description}</div>
          </Scrollbar>
        </div>
      </div>

      <hr className={BEM.auctionCard.hr} />

      <div className={BEM.auctionCard.actions}>
        <button className={`btn btn--shadow ${BEM.auctionCard.actionsBtnInvite}`}></button>
        <button
          className={`btn btn--shadow ${BEM.auctionCard.actionsBtnJoin}`}
          onClick={joinAuction}
        >
          MAKE YOUR BID
        </button>
      </div>
    </div>
  )
}

JoinScene.propTypes = {
  auction: PropTypes.object,
  replace: PropTypes.func,
}

export default JoinScene
