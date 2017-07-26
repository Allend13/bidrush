import React, { PropTypes } from 'react'

const Button = props => {
  const classes = `btn ${props.className}`

  const handleClick = (evt) => {
    if (props.disabled) {
      evt.target.preventDefault()
      evt.stopPropagation()
      return
    }

    if (props.onClick) props.onClick()
  }

  return (
    <button {...props} className={classes} onClick={handleClick} />
  )
}

Button.propTypes = {
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
