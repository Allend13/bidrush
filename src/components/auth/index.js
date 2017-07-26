import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routerActions as _routerActions } from 'react-router-redux'
import api from 'components/api'
import Logging from './logging'
import * as _userActions from 'actions/user'


class AuthContainer extends Component {
  componentWillMount() {
    const { userActions } = this.props
    this.checkAuth(userActions)
  }

  configureApi = token => {
    api.defaults.headers['X-Session-Token'] = token
    api.interceptors.response.use(null, error => error.status === '401' && this.loginRedirect())
  }

  loginRedirect = () => {
    const { routerActions: { replace } } = this.props
    replace('/login')
  }

  checkAuth = (userActions) => {
    const { setUserAuthenticated, setUserAuthorized, getUserInfo } = userActions

    const getFacebookResponse = () => {
      FB.getLoginStatus(fbRes => {
        if (fbRes.status === 'not_authorized' || fbRes.status === 'unknown') {
          this.loginRedirect()
        } else {
          const token = fbRes.authResponse.accessToken
          setUserAuthenticated(true)

          api.put('sessions', { access_token: token })
            .then(() => {
              this.configureApi(token)
              getUserInfo()
              setUserAuthorized(true)
            })
            .catch(() => this.loginRedirect())
        }
      })
    }

    const checkFBLoaded = () => {
      if (window.FB) {
        setTimeout(getFacebookResponse, 10)
      } else {
        setTimeout(checkFBLoaded, 10)
      }
    }

    checkFBLoaded()
  }

  render() {
    const { user, user: { isAuthenticated, isAuthorized }, userActions } = this.props
    const children = React.cloneElement(this.props.children, { user, userActions })

    return isAuthenticated && isAuthorized ? children : <Logging />
  }
}

AuthContainer.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
  routerActions: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(_userActions, dispatch),
    routerActions: bindActionCreators(_routerActions, dispatch),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
