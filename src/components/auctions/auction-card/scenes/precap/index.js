import React, { Component, PropTypes } from 'react'
import debounce from 'lodash/debounce'
import { Button, Icon, Scrollbar, ProgressCircle } from 'components/ui'
import BEM from 'modules/bem-classnames'
import './precap.less'

export default class PrecapScene extends Component {
  constructor(props) {
    super(props)

    const { auction, user, auctionBidActions } = this.props

    const debounceOpt = { leading: true, trailing: false }
    const debounceDelay = 50

    this.debouncedPrecapAdd = debounce(() => {
      if (auction.progress < 100) auctionBidActions.bidPrecapAdd(auction.id, user.id)
    }, debounceDelay, debounceOpt)

    this.debouncedPrecapRemove = debounce(() => {
      auctionBidActions.bidPrecapRemove(auction.id, user.id)
    }, debounceDelay, debounceOpt)
  }

  bidPrecapAdd = () => {
    this.debouncedPrecapAdd()
  }

  bidPrecapRemove = () => {
    this.debouncedPrecapRemove()
  }

  render() {
    const { auction, user, userBids } = this.props

    return (
      <div className={BEM.auctionCard.auctionCardPrecap}>
        <div className={BEM.auctionCard.itemTitle}>
          {auction.item.title}
        </div>

        <hr className={BEM.auctionCard.hr} />

        <div className={BEM.auctionCard.auctionStat}>
          <div className={BEM.auctionCard.itemPrice}>
            <Icon type="tokens" width="12" height="14" />
            <div>
              <div className={BEM.auctionCard.itemPriceAmount}>
                {auction.item.price}
              </div>
              Retail price
            </div>
          </div>
        </div>

        <hr className={BEM.auctionCard.hr} />

        <div className={BEM.auctionCard.itemDescription}>
          <div>
            <Scrollbar>
              {auction.item.description}
            </Scrollbar>
          </div>
        </div>

        <hr className={BEM.auctionCard.hr} />

        <div className={BEM.auctionCard.precapInfo}>
          <div className={BEM.auctionCard.precapInfoRow}>
            <div className={BEM.auctionCard.precapInfoLeft}>To start</div>
            <div className={BEM.auctionCard.precapInfoRight}>
              <ProgressCircle progress={auction.progress} size="s" />
              <span>{auction.progress}</span>
            </div>
          </div>
          <div className={BEM.auctionCard.precapInfoRow}>
            <div className={BEM.auctionCard.precapInfoLeft}>1 BID =</div>
            <div className={BEM.auctionCard.precapInfoRight}>
              <Icon type={auction.type} />
              <span>{auction.bid_price}</span>
            </div>
          </div>
          <div className={BEM.auctionCard.precapInfoRow}>
            <div className={BEM.auctionCard.precapInfoLeft}>Credits left</div>
            <div className={BEM.auctionCard.precapInfoRight}>
              <Icon type={auction.type} />
              <span>{user[auction.type]}</span>
            </div>
          </div>
        </div>

        <hr className={BEM.auctionCard.hr} />

        <div className={BEM.auctionCard.actions}>
          <button className={`btn btn--shadow ${BEM.auctionCard.actionsBtnInvite}`}></button>
          <Button
            className={`btn--shadow ${BEM.auctionCard.actionsBtnBidRemove}`}
            disabled={userBids < 1}
            onClick={this.bidPrecapRemove}
          />
          <div className={BEM.auctionCard.bidsDone}>
            <div className={BEM.auctionCard.bidsDoneAmount}>{userBids}</div>
            <span>BIDS</span>
          </div>
          <Button
            className={`btn--shadow ${BEM.auctionCard.actionsBtnBidAdd}`}
            disabled={auction.progress >= 100}
            onClick={this.bidPrecapAdd}
          />
        </div>

      </div>
    )
  }
}

PrecapScene.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    facebook_id: PropTypes.string.isRequired,
    tokens: PropTypes.number.isRequired,
    credits: PropTypes.number.isRequired,
  }),
  auction: PropTypes.object,
  userBids: PropTypes.number,
  auctionCardActions: PropTypes.objectOf(PropTypes.func),
  auctionBidActions: PropTypes.objectOf(PropTypes.func),
}
