import React, { PropTypes } from 'react'
import classNames from 'classnames'
import './kenny.less'

const Kenny = (props) => {
  const msgClass = classNames(
    'kenny__msg',
    { [`kenny__msg--${props.color}`]: props.color }
  )

  return (
    <div className="kenny">
      <div className="kenny__img"></div>
      <div className={msgClass}>{props.msg}</div>
    </div>
  )
}

export default Kenny

Kenny.propTypes = {
  msg: PropTypes.string.isRequired,
  color: PropTypes.string,
}
