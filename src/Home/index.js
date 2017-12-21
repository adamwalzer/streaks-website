import React from 'react';
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
import Background from '../Background';

import StreaksLogo from './streaks-logo.svg';
import sunset from './sunset.jpg'; // https://pixabay.com/en/sunset-lake-sky-abendstimmung-2153745/

import './style.scss';

@withRouter
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    props.history.listen(this.scrollToSection);
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

    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  render() {
    return (
      <div>
        <Page
          ref="home"
          key="home"
        >
          <Link to="/streaks">
            <main className="thatawe">
              <Background image={sunset} />
              <section>
                <h1>
                  thatawe
                </h1>
                <h2>
                  a place for apps <span>that awe</span>
                </h2>
                <h3>
                  happily introducing <span>our first app</span>
                </h3>
                  <h3>
                    <StreaksLogo />treaks
                  </h3>
              </section>
            </main>
          </Link>
        </Page>
      </div>
    );
  }
}

export default Home;
