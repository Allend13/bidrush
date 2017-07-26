import React, { Component, PropTypes } from 'react'
import { Scrollbars } from 'react-custom-scrollbars';
import './scrollbar.less'

export default class Scrollbar extends Component {
  render() {
    return (
      <Scrollbars
        {...this.props}
        ref="scrollbars"
        renderTrackVertical={props => <div {...props} className="scrollbar__track--vertical" />}
        renderThumbVertical={props => <div {...props} className="scrollbar__thumb--vertical" />}
      >
        {this.props.children}
      </Scrollbars>
    )
  }
}

Scrollbar.propTypes = {
  children: PropTypes.node,
}
