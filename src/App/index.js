import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import {
  reduce,
  throttle,
} from 'lodash';

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

@withRouter
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    props.history.listen(this.scrollToSection);
    window.addEventListener('scroll', this.onScroll);
  }

  onScroll = throttle(() => {
    let t = window.innerHeight;
    let key = reduce(this.dom, (a, d, k) => {
      let h = Math.abs(d.offsetTop - document.documentElement.scrollTop);
      if (h < t) {
        t = h;
        return k;
      }
      return a;
    }, 'streaks');

    if (key === 'home') {
      key = '/';
    } else {
      key = '/' + key;
    }

    if (key !== window.location.pathname) {
      window.history.pushState({}, '', key);
    }
  }, 500)

  scrollToSection = (location) => {
    let dom;

    switch (location.pathname) {
      case '/':
        dom = this.dom.home;
        break;

      case '/apps':
        dom = this.dom.apps;
        break;

      case '/streaks':
        dom = this.dom.streaks;
        break;
    }

    if (dom) {
      dom.scrollIntoView({
        block: 'start',
        inline: 'start',
        behavior: 'smooth',
      });
    }
  }

  componentDidMount() {
    this.dom = reduce(this.refs, (a, ref, k) => {
      a[k] = findDOMNode(ref);
      return a;
    }, {});

    setTimeout(() => {
      this.scrollToSection(this.props.location);
    }, 1000);
  }

  render() {
    return (
      <div>
        <Page
          ref="home"
          key="home"
        >
          <Link
            to="/apps"
            className="main-container"
          >
            <main className="thatawe">
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
        <Page
          ref="apps"
          key="apps"
        >
          <main className="apps">
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
        <Page
          ref="streaks"
          key="streaks"
        >
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
      </div>
    );
  }
}

export default App;
