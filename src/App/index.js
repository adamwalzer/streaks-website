import React, { Component } from 'react';
import {
  withRouter,
  Route,
  Switch,
} from 'react-router-dom';

import PrivacyPolicy from '../PrivacyPolicy';
import TermsOfService from '../TermsOfService';
import StreaksApp from '../StreaksApp';
import Home from '../Home';
import Footer from '../Footer';

import './style.scss';

@withRouter
class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/terms-of-service" component={TermsOfService} />
          <Route path="/streaks/app" component={StreaksApp} />
          <Route path="/" component={Home} />
        </Switch>
        <Switch>
          <Route path="/streaks/app" component={null} />
          <Route path="/" component={Footer} />
        </Switch>
      </div>
    );
  }
}

export default App;
