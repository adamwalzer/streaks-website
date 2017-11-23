import React, { Component } from 'react';
import {
  withRouter,
  Route,
  Switch,
} from 'react-router-dom';

import PrivacyPolicy from '../PrivacyPolicy';
import TermsOfService from '../TermsOfService';
import StreaksApp from '../StreaksApp';
import Upgrade from '../Upgrade';
import ReportBug from '../ReportBug';
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
          <Route path="/store/streaks" component={Upgrade} />
          <Route path="/report/bug" component={ReportBug} />
          <Route path="/contact/us" component={ReportBug} />
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
