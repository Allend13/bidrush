import React, { PropTypes } from 'react'
import classNames from 'classnames'
import './spinner.less'

const Spinner = props => {
  const { isHidden, hasOverlay } = props

  const spinnerWrapperClass = classNames(
    'spinner__wrapper',
    { 'spinner__wrapper--hidden': isHidden },
    { 'spinner__wrapper--overlay': hasOverlay }
  )

  return (
    <div className={spinnerWrapperClass}>
      <div className="spinner"></div>
    </div>
  )
}

Spinner.propTypes = {
  isHidden: PropTypes.bool,
  hasOverlay: PropTypes.bool,
}

export default Spinner
