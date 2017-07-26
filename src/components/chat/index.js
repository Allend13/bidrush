import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as _chatActions from 'actions/chat'
import classNames from 'classnames'
import ChatMsg from './chatMsg'
import { Scrollbar } from 'components/ui'
import './chat.less'

class Chat extends Component {
  componentDidMount() {
    const { chatChannelSubscribe, chatHistoryLoad } = this.props.chatActions
    const { activeChannel } = this.props.chat

    chatChannelSubscribe(activeChannel)
    chatHistoryLoad(activeChannel)
  }

  componentDidUpdate(prevProps) {
    const { chatChannelSubscribe, chatHistoryLoad } = this.props.chatActions
    const { activeChannel } = this.props.chat
    const msgList = this.props.chat.msgList
    const prevMsgList = prevProps.chat.msgList

    if (prevProps.chat.activeChannel !== activeChannel) {
      chatChannelSubscribe(activeChannel)
      chatHistoryLoad(activeChannel)
    }

    if (prevMsgList.length !== msgList.length) {
      this.refs.scrollbar.refs.scrollbars.scrollToBottom()
    }
  }

  sendMsg = (e) => {
    const input = e.target

    if (e.which === 13 && input.value !== '' && input.value != null) {
      this.props.chatActions.chatSendMsg(
        this.props.chat.activeChannel, this.props.user, input.value
      )

      input.value = ''
    }
  }

  render() {
    const msgList = this.props.chat.msgList

    const chatClass = classNames(
      'chat',
      { 'chat--is-open': this.props.chat.isOpen }
    )

    const messagesList = msgList.map((msg, i) => {
      const prevMsg = msgList[i - 1]
      const msgClass = classNames(
        'chat__msg',
        { 'chat__msg--groupped': i !== 0 && prevMsg.data.user_id === msg.data.user_id }
      )
      const msgTextClass = classNames(
        'chat__msg__text',
        { 'chat__msg__text--me': this.props.user.id === msg.data.user_id }
      )

      const key = msg.timestamp + i;

      return <ChatMsg key={key} msg={msg.data} msgClass={msgClass} msgTextClass={msgTextClass} />
    })

    return (
      <div className={chatClass}>

        <div className="chat__log">
          <Scrollbar autoHide ref="scrollbar">
            {messagesList}
          </Scrollbar>
        </div>

        <div className="chat__input">
          <input
            type="text"
            className="chat__input__text-field"
            placeholder="Type your text here..."
            onKeyPress={this.sendMsg}
          />
        </div>

      </div>
    )
  }
}

Chat.propTypes = {
  chatActions: PropTypes.objectOf(PropTypes.func).isRequired,
  chat: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    facebook_id: PropTypes.string.isRequired,
    tokens: PropTypes.number,
    credits: PropTypes.number,
  }),
}

function mapStateToProps(state) {
  return {
    user: state.user,
    chat: state.chat,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    chatActions: bindActionCreators(_chatActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
