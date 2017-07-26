import React from 'react'
import './footer.less'

export default () =>
(
  <div className="footer">
    <div className="footer__share">
      <button className="btn btn--gray footer__share__btn">Share</button>
      Invite your friends and get free Tokens!
    </div>

    <div className="footer__apps">
      <span>Download iBidGames</span>
      <button className="btn btn--black footer__apps__btn footer__apps__btn--apple"></button>
      <button className="btn btn--black footer__apps__btn footer__apps__btn--google"></button>
    </div>
  </div>
)
