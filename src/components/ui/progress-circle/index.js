import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import colors from './gradient-generator'
import './progress-circle.less'

export default class ProgressCircle extends Component {
  constructor() {
    super()
    this.state = {
      progressStep: 100 / 360,
      progressStepInited: false,
    }
  }

  componentDidMount() {
    const { progress, timer } = this.props
    const { progressStepInited } = this.state

    this.checkStateShouldUpdate(timer, progressStepInited, progress)
  }

  componentWillReceiveProps() {
    const { progress, timer } = this.props
    const { progressStepInited } = this.state

    this.checkStateShouldUpdate(timer, progressStepInited, progress)
    if (timer && progressStepInited && !progress) this.resetProgressStep()
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.progress !== this.props.progress
  }

  setProgressStep(progress) {
    this.setState({
      progressStep: progress / 360,
      progressStepInited: true,
    })
  }

  checkStateShouldUpdate(timer, progressStepInited, progress) {
    if (timer && !progressStepInited && progress > 0) this.setProgressStep(progress)
  }

  resetProgressStep() {
    this.setState({
      progressStep: 100 / 360,
      progressStepInited: false,
    })
  }

  renderSegments = () => {
    const { progress, timer } = this.props

    if (!progress) return null

    const segments = []
    const circleProgress = timer ? 360 - progress / this.state.progressStep : progress / this.state.progressStep

    for (let i = 0; i < circleProgress; i++) {
      const style = {
        backgroundColor: `rgb(${colors[i]})`,
      }
      segments.push(<div key={i} className="progress-circle__segment" style={style}></div>)
    }

    return segments
  }

  render() {
    const { bgClass, size } = this.props

    const barClass = classNames(
      'progress-circle',
      { [`progress-circle--${bgClass}`]: bgClass },
      { [`progress-circle--${size}`]: size }
    )

    return (
      <div className={barClass}>
        {this.renderSegments()}
      </div>
    )
  }
}

ProgressCircle.propTypes = {
  timer: PropTypes.bool,
  progress: PropTypes.number,
  bgClass: PropTypes.string,
  size: PropTypes.string,
}
