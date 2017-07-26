import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'
import Icon from '../icon'
import './modal.less'

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalTop: 0 }
  }

  componentDidMount() {
    this.parent = document.querySelector('.app-view')
    this.updateModalTop()
  }

  updateModalTop() {
    this.setState({ modalTop: this.parent.scrollTop })
  }

  renderModalBody() {
    const { hasSpinner, backLink = '/', backLinkHidden = false, children } = this.props

    const closeLink = (
      <Link to={backLink}>
        <div className="modal__close">
          <Icon type="close " />
        </div>
      </Link>
    )

    const bodyClass = classNames(
      'modal__body',
      { 'modal__body--loading': hasSpinner }
    )

    if (hasSpinner) {
      return children
    }

    return (
      <div className={bodyClass}>
        {!backLinkHidden && closeLink}
        {children}
      </div>
    )
  }

  render() {
    const { customBodyClass } = this.props

    const modalClass = classNames(
      'modal',
      { [`${customBodyClass}`]: customBodyClass },
    )

    return (
      <div className={modalClass} style={{ top: this.state.modalTop }}>
        {this.renderModalBody()}
      </div>
    )
  }

}

Modal.propTypes = {
  hasSpinner: PropTypes.bool,
  backLinkHidden: PropTypes.bool,
  customBodyClass: PropTypes.string,
  backLink: PropTypes.string,
  children: PropTypes.element.isRequired,
}
