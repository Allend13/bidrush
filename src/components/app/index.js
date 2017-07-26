import React, { Component, PropTypes } from 'react'
// import Devtools from '../devtools'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Header, Footer, MenuModal, Chat } from 'components'
import * as _chatActions from 'actions/chat'
import * as _uiActions from 'actions/ui'
import './app.less'

// const prodenv = process.env.NODE_ENV === 'production'

class App extends Component {
  componentWillReceiveProps(nextProps) {
    const { location, uiActions: { closeMenu } } = this.props

    if (location !== nextProps.location) closeMenu()
  }

  render() {
    const { chat, auctionsListType, chatActions, ui: { menu }, uiActions: { closeMenu } } = this.props
    const appViewClass = classNames(
    'app-view',
    { 'app-view--chat-is-open': chat.isOpen }
  )

    const children = this.props.children ? React.cloneElement(this.props.children, {
      setActiveChatChannel: chatActions.setActiveChatChannel,
      chatIsOpen: chat.isOpen,
    }) : null

    return (
      <div id="app">
        <div className="app-container">
          <Header auctionsListType={auctionsListType} />
          <div className={appViewClass}>
            {menu.isOpened && <MenuModal closeMenu={closeMenu} />}
            {children}
          </div>
          <Chat />
          <Footer />
        </div>
        {/* {!prodenv && <Devtools />} */}
      </div>
    )
  }
}

App.propTypes = {
  chatActions: PropTypes.objectOf(PropTypes.func).isRequired,
  ui: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
  auctionsListType: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  location: PropTypes.string.isRequired,
  uiActions: PropTypes.objectOf(PropTypes.func).isRequired,
}

function mapStateToProps(state, ownProps) {
  return {
    ui: state.ui,
    chat: state.chat,
    auctionsListType: ownProps.params.type,
    location: ownProps.location.pathname,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    chatActions: bindActionCreators(_chatActions, dispatch),
    uiActions: bindActionCreators(_uiActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
