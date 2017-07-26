import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import * as currencyActions from 'actions/currency'
import { NavLink } from 'components/ui'
import './currency.less'

class CurrencyNav extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="currency-nav">
        <NavLink to="" />
      </div>
    )
  }
}

CurrencyNav.propTypes = {
  user: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    currencyActions: bindActionCreators(currencyActions, dispatch),
  }
}

export default CurrencyNav
