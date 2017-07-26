import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as _timerActions from 'actions/auctions/timer'
import { Button, ProgressCircle } from 'components/ui'
import Players from '../../players'
import Kenny from '../../kenny'
import Timer from './timer'
import BEM from 'modules/bem-classnames'
import './race.less'

class RaceScene extends Component {
  constructor() {
    super()
    this.state = {
      stageProgress: 0,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { stage, auction: { progress, race_stages } } = this.props
    if (stage !== nextProps.stage) {
      this.setState({
        stageProgress: 0,
      })
    } else {
      this.setState({
        stageProgress: Math.round(progress * 100 / race_stages[stage].threshold),
      })
    }
  }

  raceBid = () => {
    const { auction, user, auctionBidActions } = this.props
    auctionBidActions.bidOnRace(auction.id, user.id)
  }

  render() {
    const {
      auction,
      user,
      userBids,
      countdown,
      intermission,
      stage,
      players,
      auctionCardActions,
      timerActions,
    } = this.props

    const { stageProgress } = this.state

    const bidBtnDisabled = auction.status === 2 || auction.status === 4 || !userBids
    const lastBidder = players.length ? players[0] : null
    let kennyMsg = 'A bit of pation. The Auction will start soon'
    let kennyColor = 'red'

    switch (auction.status) {
      case 2:
        kennyMsg = 'A bit of pation. The Auction will start soon'
        break
      case 4:
        kennyMsg = 'It\'s intermission time!'
        break
      case 3:
      default:
        if (lastBidder) {
          if (lastBidder.user_id === user.id) {
            kennyMsg = 'You are the highest bidder!'
            kennyColor = 'blue'
          } else {
            kennyMsg = `«${lastBidder.name}» is the highest bidder!`
            kennyColor = 'red'
          }
        }
        break
    }

    return (
      <div className={BEM.auctionCard.auctionCardRace}>
        <div className={BEM.auctionCard.itemTitle}>
          {auction.item.title}
        </div>

        <hr className={BEM.auctionCard.hr} />

        <div className={BEM.auctionCard.auctionStat}>
          <div className={BEM.auctionCard.statProgress}>
            <ProgressCircle progress={auction.progress} size="s" />
            <div className={BEM.auctionCard.statProgressAmount}>
              {stageProgress}%
            </div>
          </div>
          <div className={BEM.auctionCard.statStage}>
            Stage {stage + 1}
          </div>
        </div>

        <hr className={BEM.auctionCard.hr} />

        <Players
          players={players}
          usersBids={auction.users_bids}
          getPlayersInfo={auctionCardActions.getPlayersInfo}
        />

        <div className={BEM.auctionCard.kenny}>
          <Kenny msg={kennyMsg} color={kennyColor} />
        </div>

        <div className={BEM.auctionCard.actions}>
          <div className={BEM.auctionCard.raceInfo}>
            <div className={BEM.auctionCard.raceTimer}>
              <div className={BEM.auctionCard.raceInfoLabel}>Timer</div>
              <Timer
                auction={auction}
                countdown={countdown}
                intermission={intermission}
                stage={stage}
                timerActions={timerActions}
              />
            </div>
            <hr className={BEM.auctionCard.hr} />
            <div className={BEM.auctionCard.raceBidsLeft}>
              <div className={BEM.auctionCard.raceInfoLabel}>BIDS left</div>
              {userBids} BIDS
            </div>
          </div>
          <div className={BEM.auctionCard.raceBid}>
            <ProgressCircle progress={countdown} timer size="lg" />
            <Button
              className={BEM.auctionCard.raceBidBtn}
              disabled={bidBtnDisabled}
              onClick={this.raceBid}
            >BID</Button>
          </div>
        </div>
      </div>
    )
  }
}

RaceScene.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    facebook_id: PropTypes.string.isRequired,
    tokens: PropTypes.number,
    credits: PropTypes.number,
  }),
  auction: PropTypes.object,
  userBids: PropTypes.number,
  players: PropTypes.array,
  intermission: PropTypes.number,
  countdown: PropTypes.number,
  stage: PropTypes.number,
  auctionCardActions: PropTypes.objectOf(PropTypes.func),
  auctionBidActions: PropTypes.objectOf(PropTypes.func),
  timerActions: PropTypes.objectOf(PropTypes.func),
}

const currentStage = raceStages => raceStages.filter(stage => stage.pause_fired).length

function mapStateToProps(state) {
  return {
    countdown: state.auctionCard.countdown,
    intermission: state.auctionCard.intermission,
    stage: currentStage(state.auctionCard.auction.race_stages),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    timerActions: bindActionCreators(_timerActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceScene)
