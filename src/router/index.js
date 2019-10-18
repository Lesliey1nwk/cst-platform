import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthRoute from './authRoute';
// import { UserContext } from '@/utils/contexts';

import LoginPage from '@/pages/loginPage';
import Layout from '@/pages/layout';
import Page404 from '@/pages/page404';
import Dashboard from '@/pages/dashboard';
import Manufacturer from '@/pages/manufacturer';

export default () => (
  <HashRouter>
    <Switch>
      <AuthRoute exact path="/login" authTo="/" component={LoginPage} />
      <AuthRoute exact path="/config" authTo="/login" component={Layout} />
      <Redirect exact from="/" to="/config" />
      {/* <Route exact path="/sys" component={Dashboard} /> */}
      <Route component={Page404} />
    </Switch>
  </HashRouter>
);

export const RouteList = ({ match }) => {
  // const user = useContext(UserContext);
  const isCs = (process.env.REACT_APP_ENV === 'cs');
  return (
    <Switch>
      {/* {flatTree(user.menu)
        .filter(item => item.component)
        .map((item, index) => (
          <Route
            path={`${match.path + item.path}`}
            key={index}
            component={componentObj[item.component]}
          />
        ))} */}
      {/* <Route exact path="/config" component={isCs ? Manufacturer : Home} /> */}
      <Route exact path="/config" component={isCs ? Manufacturer : Dashboard} />
      <Route component={Page404} />
    </Switch>
  );
};
