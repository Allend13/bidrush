import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routerActions as _routerActions } from 'react-router-redux'
import classNames from 'classnames'
import { getUserBidsSelector, getPlayersSelector } from './select'
import { Modal, Spinner } from 'components/ui'
import ScenesControl from './scenes-control'
import * as _auctionBidActions from 'actions/auctions/bids'
import * as _auctionCardActions from 'actions/auctions/card'
import './bem'
import BEM from 'modules/bem-classnames'
import './auction-card.less'

import PubNub from 'pubnub'
import pubnubConfig from 'components/pubnub/pubnub.config.js'
const pubnub = new PubNub(pubnubConfig)

class AuctionCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeImgIndex: 0,
    }
  }

  componentDidMount() {
    const { auction, scene, userBids, currentAuctionId, setActiveChatChannel, auctionCardActions } = this.props

    if (auction) ScenesControl(auction, userBids, scene, this.replace)
    if (!auction) auctionCardActions.getCurrentAuction(currentAuctionId)
    setActiveChatChannel(`Chat-${currentAuctionId}`)

    pubnub.subscribe({
      channel: `Events-${currentAuctionId}`,
      message: msg => {
        auctionCardActions.updateCurrentAuction(currentAuctionId, msg)
      },
    })
  }

  componentDidUpdate() {
    const { auction, scene, userBids } = this.props

    if (auction && scene) ScenesControl(auction, userBids, scene, this.replace)
  }


  componentWillUnmount() {
    const { currentAuctionId, setActiveChatChannel, auctionCardActions } = this.props
    auctionCardActions.resetAuctionCard()
    pubnub.unsubscribe({ channel: `Events-${currentAuctionId}` })
    setActiveChatChannel('Chat-general')
  }

  setActiveImg = (i) => {
    this.setState({ activeImgIndex: i })
  }

  replace = (scene) => {
    const { currentAuctionType, currentAuctionId, routerActions } = this.props
    routerActions.replace(`/auctions/${currentAuctionType}/${currentAuctionId}/${scene}`)
  }

  renderImagesList = images => {
    const imagesSliced = images.slice(0, 3)
    return imagesSliced.map((img, i) => {
      const imgClass = classNames(
          BEM.auctionCard.galleryItem,
          { active: this.state.activeImgIndex === i }
        )
      return (
        <div key={img} className="col-1">
          <div className={imgClass} onClick={() => this.setActiveImg(i)} >
            <img src={img} className={BEM.auctionCard.galleryImg} role="presentation" />
          </div>
        </div>

      )
    })
  }

  renderScene = (images, itemTitle, children) => {
    const activeImg = images[this.state.activeImgIndex]
    return (
      <div className={BEM.auctionCard.card}>
        <div className="row">
          <div className="col-3">
            <img src={activeImg} className={BEM.auctionCard.galleryCurrentImg} alt={itemTitle} />
            <div className={`row ${BEM.auctionCard.gallery}`}>
                {this.renderImagesList(images)}
            </div>
          </div>
          <div className="col-3">
            {children}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { auction, scene, isWinner } = this.props

    if (!auction) {
      return (
        <Modal hasSpinner>
          <Spinner />
        </Modal>
      )
    }

    const backLink = `/auctions/${auction.type}`
    const children = React.cloneElement(this.props.children, {
      ...this.props,
      replace: this.replace,
    })

    if (scene === 'finish' || scene === 'prize-claim') {
      return (
        <Modal backLink={backLink} customBodyClass={isWinner ? BEM.auctionCard.finishModal : null} >
          {children}
        </Modal>
      )
    }

    return (
      <Modal backLink={backLink}>
        {this.renderScene(auction.item.images, auction.item.title, children)}
      </Modal>
    )
  }
}

AuctionCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    facebook_id: PropTypes.string.isRequired,
    tokens: PropTypes.number,
    credits: PropTypes.number,
  }),
  auction: PropTypes.object,
  scene: PropTypes.string,
  userBids: PropTypes.number,
  countdown: PropTypes.number,
  timers: PropTypes.array,
  players: PropTypes.array,
  isWinner: PropTypes.bool,
  currentAuctionId: PropTypes.string.isRequired,
  currentAuctionType: PropTypes.string.isRequired,
  setActiveChatChannel: PropTypes.func.isRequired,
  auctionCardActions: PropTypes.objectOf(PropTypes.func).isRequired,
  auctionBidActions: PropTypes.objectOf(PropTypes.func).isRequired,
  routerActions: PropTypes.objectOf(PropTypes.func).isRequired,
  children: PropTypes.element.isRequired,
}

function mapStateToProps(state, ownProps) {
  const cardState = state.auctionCard
  return {
    auction: cardState.auction,
    userBids: getUserBidsSelector(state),
    currentAuctionType: ownProps.params.type,
    currentAuctionId: ownProps.params.id,
    countdown: cardState.countdown,
    timers: cardState.timers,
    scene: ownProps.routes[ownProps.routes.length - 1].path,
    players: getPlayersSelector(state),
    isWinner: cardState.auction ? cardState.auction.winner === state.user.id : false,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auctionCardActions: bindActionCreators(_auctionCardActions, dispatch),
    auctionBidActions: bindActionCreators(_auctionBidActions, dispatch),
    routerActions: bindActionCreators(_routerActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionCard)
