import React, { PropTypes } from 'react'

const chatMsg = props => (
  <div className={props.msgClass}>
    <div className="chat__msg__sender">
      <div className="chat__msg__sender__img">
        <img src={props.msg.picture} alt="" />
      </div>
      <div className="chat__msg__sender__name">{props.msg.name}</div>
    </div>
    <div className={props.msgTextClass}>
      {props.msg.text}
    </div>
  </div>
)

chatMsg.propTypes = {
  msgClass: PropTypes.string.isRequired,
  msgTextClass: PropTypes.string.isRequired,
  msg: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string,
  }),
}

export default chatMsg
