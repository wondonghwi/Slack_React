import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';

//page단위로 코드스플리팅 진행 -> lodable이용
const Login = loadable(() => import('@pages/Login'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const App = () => {
  return (
    <Switch>
      <Redirect exact path="/" to="/login" />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/workspace/channel" component={Channel} />
      <Route path="/workspace/dm" component={DirectMessage} />
    </Switch>
  );
};

export default App;
