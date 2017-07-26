import { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import * as pubnubActions from 'actions/pubnub'
// import pubnubApi from 'pubnub'
// import pubnubConfig from './pubnub.config.js'
// const pubnub = new pubnubApi(pubnubConfig)

class Pubnub extends Component {
  componentDidMount(prevProps) {
    const { auctionsChannels, chatChannel } = this.props

    if (prevProps.auctionsChannels !== auctionsChannels && prevProps.chatChannel !== chatChannel) {
      pubnub.unsubscribeAll()
      pubnub.subscribe({
        channels: [...auctionsChannels, ...chatChannel],
      })
      pubnub.addListener({
        message(m) {
          console.log('listener', m);
        },
      })
    }

    console.log(this.props)
  }

  render() {
    const { children } = this.props
    return children
  }
}

Pubnub.propTypes = {
  auctionsChannels: PropTypes.arrayOf(PropTypes.string).isRequired,
  chatChannel: PropTypes.string.isRequired,
  children: PropTypes.element,
}

function mapStateToProps(state) {
  return {
    auctionsChannels: state.pubnub.auctionsChannels,
    chatChannel: state.pubnub.chatChannel,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pubnubActions: bindActionCreators(pubnubActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pubnub)
