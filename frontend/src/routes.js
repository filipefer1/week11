import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Logon from './components/Logon';
import Register from './components/Register';
import Profile from './components/Profile';
import NewIncident from './components/NewIncident';

const Routes = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />

        <Route path="/profile" component={Profile}/>
        <Route path="/incidents/new" component={NewIncident}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;