import React, { PropTypes } from 'react'
import classNames from 'classnames'
import './icons.less'

const Icon = (props) => {
  const { type, className, width, height } = props

  const classes = classNames(
    'icon',
    { [`icon--${type}`]: type },
    { [`${className}`]: className }
  )

  return (
    <i
      {...props}
      className={classes}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
    </i>
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
}

export default Icon
