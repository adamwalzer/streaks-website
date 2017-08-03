import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Page from '../Page';
import Header from '../Header';
import Footer from '../Footer';

import add from './add.png';
import view from './view.png';
import edit from './edit.png';

import './style.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <div>
          <Route path="/*" component={props =>
            <Page title="home" page={props.match.params[0] || 'home'}>
              <Header />
              <div className="content">
                <section>
                  <p>
                    add a streak
                  </p>
                  <img src={add} />
                </section>
                <section>
                  <p>
                    view and complete your streaks by tapping on the streak
                  </p>
                  <img src={view} />
                </section>
                <section>
                  <p>
                    see more details about your streak
                  </p>
                  <img src={edit} />
                </section>
              </div>
              <Footer />
            </Page>
          } />
          <Route path="/*" component={props =>
            <Page title="app" page={props.match.params[0] || 'home'}>
              <div className="content">
                hold your horses this part is coming soon&nbsp;
                <Link to="/">
                  back home
                </Link>
              </div>
            </Page>
          } />
        </div>
      </Router>
    );
  }
}

export default App;
