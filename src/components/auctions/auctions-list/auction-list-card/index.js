import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Icon, ProgressCircle } from 'components/ui'

const AuctionListCard = props => {
  const auction = props.auction
  const backgroundImg = { backgroundImage: `url(${auction.item.images[0]})` }
  const nameMaxLength = 20

  const link = `/auctions/${auction.type}/${auction.id}`

  let itemTitle = auction.item.title

  if (itemTitle.length > nameMaxLength) {
    itemTitle = `${itemTitle.substr(0, nameMaxLength)} ...`
  }


  return (
    <div className="col-3">
      <div className="auction">
        <Link to={link}>
          <div className="auction__item">
            <div className="auction__item__img" style={backgroundImg}>
              <div className="auction__item__title">{itemTitle}</div>
            </div>
          </div>
        </Link>
        <div className="auction__item__price">
          Retail price<Icon type={auction.type} />{auction.item.price}
        </div>
        <div className="auction__start">
          <div className="auction__start__progress">
            <ProgressCircle progress={auction.progress} bgClass="white" />
            <div className="auction__start__percentage">
              <div className="auction__start__percentage__count">{auction.progress}%</div>
              To start
            </div>
          </div>
          <Link to={link}>
            <button className="btn auction__join">JOIN</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

AuctionListCard.propTypes = {
  auction: PropTypes.object.isRequired,
}


export default AuctionListCard
