import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../Dashboard';
import UserProfile from '../UserProfile';

function AuthRoutes() {
  return (
    <>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/profile" component={UserProfile} />
    </>
  );
}

export default AuthRoutes;
