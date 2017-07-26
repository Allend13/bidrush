import React, { PropTypes } from 'react'
import { NavLink, Modal, Icon } from 'components/ui'
import './menu-modal.less'

const Menu = props => {
  const { closeMenu } = props

  return (
    <Modal customBodyClass="menu-modal" backLinkHidden>
      <ul className="menu-modal__nav">
        <li>
          <NavLink to="/auctions/active" className="menu-modal__nav__link">My Auctions</NavLink>
        </li>
        <li>
          <NavLink to="/" className="menu-modal__nav__link">Social</NavLink>
        </li>
        <li>
          <NavLink to="/" className="menu-modal__nav__link">My Profile</NavLink>
        </li>
        <li>
          <NavLink to="/currency" className="menu-modal__nav__link">Game Currency</NavLink>
        </li>
        <li>
          <NavLink to="/" className="menu-modal__nav__link">Tutorial</NavLink>
        </li>
        <li>
          <NavLink to="/" className="menu-modal__nav__link">Support</NavLink>
        </li>
        <div className="menu-modal__close" onClick={closeMenu}>
          <Icon type="close" />
        </div>
      </ul>
    </Modal>
  )
}

Menu.propTypes = {
  closeMenu: PropTypes.func.isRequired,
}


export default Menu
