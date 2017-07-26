import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { getAuctionsSelector, getPubnubChannelsSelector } from './select'
import classNames from 'classnames'
import AuctionListCard from './auction-list-card'
import { Spinner, Scrollbar } from 'components/ui'
import * as _auctionsListActions from 'actions/auctions/list'
import './auctions-list.less'

class AuctionsList extends Component {

  componentDidMount() {
    const { subscribedChannels, auctionsListActions } = this.props
    const requestDelay = process.env.NODE_ENV !== 'production' ? 15000 : 3000

    auctionsListActions.getAuctions()

    if (subscribedChannels) {
      auctionsListActions.auctionChannelsSubscribe(subscribedChannels)
    }

    setInterval(() => { auctionsListActions.getAuctions() }, requestDelay)
  }

  componentDidUpdate(prevProps) {
    const prevSubscribedChannels = prevProps.subscribedChannels
    const { subscribedChannels, auctionsListActions } = this.props

    if (subscribedChannels.toString() !== prevSubscribedChannels.toString()) {
      auctionsListActions.auctionChannelsSubscribe(subscribedChannels)
    }
  }

  renderAuctionsList = () => {
    const { auctions } = this.props
    if (!auctions) return null
    return auctions.map(auction => <AuctionListCard key={auction.id} auction={auction} />)
  }

  render() {
    const {
      user,
      auctionsList,
      chatIsOpen,
      currentAuctionListType,
      setActiveChatChannel,
    } = this.props

    const children = this.props.children ? React.cloneElement(this.props.children, {
      user,
      setActiveChatChannel,
    }) : null


    const activeListClass = classNames(
      'auctions-list',
      `auctions-list--${currentAuctionListType}`
    )

    const scrollBarClass = classNames(
      'auctions-list__scrollbar',
      { 'auctions-list__scrollbar--chat-hidden': !chatIsOpen }
    )

    return (
      <div>
        <div className="row auctions-list__container">
          <Spinner isHidden={!auctionsList.isFetching || !auctionsList.initialLoad} />
          <Scrollbar autoHide className={scrollBarClass}>
            <ReactCSSTransitionGroup
              transitionName="auctions-list--transition"
              transitionEnterTimeout={0}
              transitionLeaveTimeout={300}
            >
              <div key={currentAuctionListType} className={activeListClass}>
                {this.renderAuctionsList()}
              </div>
            </ReactCSSTransitionGroup>
          </Scrollbar>
        </div>
        {children}
      </div>
    )
  }
}

AuctionsList.propTypes = {
  subscribedChannels: PropTypes.arrayOf(PropTypes.string),
  auctionsList: PropTypes.object.isRequired,
  auctions: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    facebook_id: PropTypes.string.isRequired,
    tokens: PropTypes.number,
    credits: PropTypes.number,
  }),
  chatIsOpen: PropTypes.bool.isRequired,
  currentAuctionListType: PropTypes.string.isRequired,
  auctionsListActions: PropTypes.objectOf(PropTypes.func).isRequired,
  setActiveChatChannel: PropTypes.func.isRequired,
  children: PropTypes.element,
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    auctions: getAuctionsSelector(state, ownProps),
    auctionsList: state.auctionsList,
    subscribedChannels: getPubnubChannelsSelector(state),
    currentAuctionId: ownProps.params.id,
    currentAuctionListType: ownProps.params.type,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auctionsListActions: bindActionCreators(_auctionsListActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuctionsList)
