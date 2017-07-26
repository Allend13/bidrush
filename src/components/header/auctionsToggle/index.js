import React, { PropTypes } from 'react'
import { NavLink } from 'components/ui'
import './auctions-toggle.less'

const auctionsToggle = props => {
  const { auctionsListType } = props

  if (auctionsListType === 'active' || auctionsListType === 'precap' || auctionsListType === 'history') {
    return (
      <div className="header__auctions-toggle">
        <NavLink to="/auctions/active" className="header__auctions-toggle__link">
          Active Auctions
        </NavLink>
        <NavLink to="/auctions/precap" className="header__auctions-toggle__link">
          Pre-Cap
        </NavLink>
        <NavLink to="/auctions/history" className="header__auctions-toggle__link">
          History
        </NavLink>
      </div>
    )
  }

  return (
    <div className="header__auctions-toggle">
      <NavLink to="/auctions/tokens" className="header__auctions-toggle__link">
        Play For Fun
      </NavLink>
      <NavLink
        to="/auctions/credits"
        className="header__auctions-toggle__link header__auctions-toggle__link--prizes"
      >
        Play For Prizes
      </NavLink>
    </div>
  )
}

auctionsToggle.propTypes = {
  auctionsListType: PropTypes.string,
}

export default auctionsToggle
