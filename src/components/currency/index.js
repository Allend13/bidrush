import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as currencyActions from 'actions/currency'
// import classNames from 'classnames'
import { Modal } from 'components/ui'
import './currency.less'

class CurrencyContainer extends Component {
  componentDidMount() {
  }

  render() {
    // const currencyClass = classNames(
    //   'currency',
    // )

    return (
      <Modal customBodyClass="menu-modal">
        <div> Currency</div>
      </Modal>
    )
  }
}

CurrencyContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyContainer)
