import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import { App } from 'components'
import { AuctionsRoutes } from 'components/auctions'
// import Currency from 'components/currency'
//     <Route path="**/currency" component={Currency} />
import { DEFAULT_ROUTE } from 'constants'

const Routes = (
  <Route path="/" component={App}>
    <IndexRedirect to={DEFAULT_ROUTE} />
    {AuctionsRoutes}
  </Route>
)

export default Routes
