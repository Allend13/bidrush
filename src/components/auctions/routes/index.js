import React from 'react'
import { Route, IndexRedirect, Redirect } from 'react-router'
import { Join, Precap, Race, Finish, PrizeClaim } from '../auction-card/scenes'
import AuctionCard from '../auction-card'
import AuctionsList from '../auctions-list'
import { DEFAULT_ROUTE } from 'constants'

const AuctionsRoutes = (
  <Route>
    <Redirect from="auctions" to={DEFAULT_ROUTE} />
    <Redirect path="auctions/:*" to={DEFAULT_ROUTE} />
    <Route path="auctions/:type" component={AuctionsList}>
      <Route path=":id" component={AuctionCard}>
        <IndexRedirect to="join" />
        <Route path="join" component={Join} />
        <Route path="precap" component={Precap} />
        <Route path="race" component={Race} />
        <Route path="finish" component={Finish} />
        <Route path="prize-claim" component={PrizeClaim} />
      </Route>
    </Route>
  </Route>
)

export default AuctionsRoutes
