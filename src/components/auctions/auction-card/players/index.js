import React, { Component, PropTypes } from 'react'
import BEM from 'modules/bem-classnames'
import './players.less'

export default class Players extends Component {
  componentDidMount() {
    const { usersBids, getPlayersInfo } = this.props
    const playersIds = usersBids.map(user => user.user_id)
    getPlayersInfo(playersIds)
  }

  render() {
    const { players } = this.props
    const playersLimit = players.length > 3 ? players.slice(0, 4) : players
    const playersList = playersLimit.map((player, i) => {
      if (i === 3) {
        return (
          <div key="playersTotal" className={`${BEM.auctionCard.player} ${BEM.auctionCard.playerTotal}`}>
            <div className={BEM.auctionCard.playerImg}>10+</div>
            <div className={BEM.auctionCard.playerName}>Total players</div>
          </div>
        )
      }
      return (
        <div key={player.user_id} className={BEM.auctionCard.player}>
          <div className={BEM.auctionCard.playerImg} style={{ backgroundImage: `url(${player.picture})` }}></div>
          <div className={BEM.auctionCard.playerName}>{player.name}</div>
        </div>
      )
    })

    return (
      <div className={BEM.auctionCard.party}>
        {playersList}
      </div>
    )
  }
}

Players.propTypes = {
  players: PropTypes.array.isRequired,
  usersBids: PropTypes.array.isRequired,
  getPlayersInfo: PropTypes.func.isRequired,
}
