import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
} from 'react-router-dom';

import Page from '../Page';
import Header from '../Header';
import Footer from '../Footer';
import Background from '../Background';
import AppCards from '../AppCards';

import positive from './positive.jpg'; // https://pixabay.com/en/positive-awesome-sun-happy-poster-2223126/
import sunset from './sunset.jpg'; // https://pixabay.com/en/sunset-lake-sky-abendstimmung-2153745/

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
            <Page title="apps" page={props.match.params[0]}>
              <main>
                <Background image={positive} />
                <div>
                  <h1>
                    <span className="rust">apps</span> thatawe
                  </h1>
                  <h2>
                    happily introducing <span>our first app</span>
                  </h2>
                </div>
                <AppCards />
              </main>
            </Page>
          } />
          <Route path="/*" component={props =>
            <Page title="streaks" page={props.match.params[0]}>
              <Header page={props.match.params[0]} />
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
            <Page title="home" page={props.match.params[0]}>
              <Link
                to="/apps"
                className="main-container"
              >
                <main>
                  <Background image={sunset} />
                  <section>
                    <h1>
                      thatawe
                    </h1>
                    <h2>
                      a place for apps <span>that awe</span>
                    </h2>
                    <h4>
                      click anywhere to <span>checkout the apps</span>
                    </h4>
                  </section>
                </main>
              </Link>
            </Page>
          } />
        </div>
      </Router>
    );
  }
}

export default App;
