import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as _chatActions from 'actions/chat'
import * as _uiActions from 'actions/ui'
import classNames from 'classnames'
import UserBalance from './userBalance'
import AuctionsToggle from './auctionsToggle'
import './header.less'

const Header = props => {
  const { user, auctionsListType, chatIsOpen, chatActions: { chatToggle }, uiActions: { toggleMenu } } = props

  const headerClass = classNames(
    'header',
    { 'header--chat-is-open': chatIsOpen }
  )

  const btnClass = 'btn btn--shadow btn--square btn-blue-dark header__btn'

  const handleClick = () => toggleMenu()

  return (
    <div className={headerClass}>
      <UserBalance user={user} />
      <AuctionsToggle auctionsListType={auctionsListType} />
      <div className="header__nav header__btn-control">
        <button className={`${btnClass} header__btn--menu-toggle`} onClick={handleClick}></button>
        <button className={`${btnClass} header__btn--music`}></button>
        <button className={`${btnClass} header__btn--chat`} onClick={chatToggle}></button>
      </div>
    </div>
  )
}

Header.propTypes = {
  chatIsOpen: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func,
  chatActions: PropTypes.object.isRequired,
  uiActions: PropTypes.object.isRequired,
  auctionsListType: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    user: state.user,
    chatIsOpen: state.chat.isOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    chatActions: bindActionCreators(_chatActions, dispatch),
    uiActions: bindActionCreators(_uiActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
