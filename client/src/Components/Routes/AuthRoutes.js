import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../Dashboard';
import Subscription from '../Subscription';
import UserProfile from '../UserProfile';

function AuthRoutes() {
  return (
    <>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/profile" component={UserProfile} />
      <Route exact path="/subscription" component={Subscription} />
    </>
  );
}

export default AuthRoutes;
