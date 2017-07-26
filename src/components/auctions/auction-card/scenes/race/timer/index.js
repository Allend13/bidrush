import React, { Component, PropTypes } from 'react'
import Moment from 'moment'

export default class Timer extends Component {
  constructor() {
    super()
    this.state = {
      timer: [],
    }
  }

  componentDidMount() {
    const { auction, auction: { status, race_start } } = this.props
    if (auction && +status === 2) this.setUpNextTimer(Date.parse(race_start))
  }

  componentWillReceiveProps(nextProps) {
    const { auction, auction: { status, updated }, stage } = nextProps
    const prevUpdated = this.props.auction.updated
    const prevStatus = this.props.auction.status
    const prevPauseFired = this.props.auction.pause_fired
    const currentPauseFired = nextProps.auction.pause_fired

    if (status !== prevStatus) {
      const { race_stages, race_start } = auction
      const raceStage = race_stages[stage]

      switch (+status) {
        case 2:
          this.setUpNextTimer(Date.parse(race_start))
          break
        case 3:
          this.setUpNextTimer(Date.now() + raceStage.timer * 1000)
          break
        case 5:
          this.stopTimer()
          break
        default: break
      }
    }

    if (prevPauseFired !== currentPauseFired) {
      const { race_stages } = auction
      const raceStage = race_stages[stage]
      this.setUpNextTimer(Date.parse(currentPauseFired) + raceStage.pause)
    }

    if (+status === 3 && updated !== prevUpdated) {
      const { race_stages } = auction
      const raceStage = race_stages[stage]
      this.setUpNextTimer(Date.parse(updated) + raceStage.timer * 1000)
    }
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  setUpNextTimer = intermissionTime => {
    const { timerActions: { setIntermission } } = this.props
    this.stopTimer()
    setIntermission(intermissionTime)
    this.startTimer()
  }

  startTimer() {
    this.setState({
      timer: setInterval(this.tick, 50),
    })
  }

  stopTimer() {
    const { timerActions: { countDownTick } } = this.props
    const { timer } = this.state
    clearInterval(timer)
    countDownTick(0)
  }

  tick = () => {
    const { intermission, timerActions: { countDownTick } } = this.props
    const timeDiff = intermission - Date.now()

    if (timeDiff > 0) {
      countDownTick(timeDiff)
    } else {
      this.stopTimer()
    }
  }

  render() {
    const { countdown } = this.props
    const mTimer = Moment(countdown)
    const formattedTime = mTimer.format('mm:ss:SS')

    return <span>{formattedTime}</span>
  }
}

Timer.propTypes = {
  auction: PropTypes.object.isRequired,
  countdown: PropTypes.number.isRequired,
  intermission: PropTypes.number.isRequired,
  stage: PropTypes.number.isRequired,
  timerActions: PropTypes.object.isRequired,
}
