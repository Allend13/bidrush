import React, { PropTypes } from 'react'
import './login.less'

const Login = props => {
  const login = () => {
    FB.login(res => {
      if (res.status === 'connected') {
        props.route.authRedirect('/')
      }
    });
  }
  return (
    <div>
      <div id="app">
        <div className="app-container app-container--login">
          <button
            className="btn btn-blue btn--shadow btn--fb-login"
            onClick={login}
          >
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  route: PropTypes.object.isRequired,
}

export default Login
