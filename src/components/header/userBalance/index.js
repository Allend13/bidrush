import React, { PropTypes } from 'react'
import './user-balance.less'
import { Button, Icon } from 'components/ui'

const UserBalance = props => {
  const { user } = props

  return (
    <div>
      <div className="header__user-balance">
        <Icon type="credits" width="16" height="18" />
        {Math.round(user.credits)}
        <Button className="btn-square btn--red header__user-balance__btn">+</Button>
      </div>
      <div className="header__user-balance">
        <Icon type="tokens" width="16" height="18" />
        {Math.round(user.tokens)}
        <Button className="btn-square header__user-balance__btn">+</Button>
      </div>
    </div>
  )
}

UserBalance.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    facebook_id: PropTypes.string.isRequired,
    tokens: PropTypes.number,
    credits: PropTypes.number,
  }),
}

export default UserBalance
