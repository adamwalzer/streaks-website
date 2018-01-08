import React from 'react';
import Background from '../Background';
// https://pixabay.com/en/architecture-bridge-building-castle-1850676/
import architecture from './architecture.jpg';
import appStore from './app-store.png';
import googlePlay from './google-play.png';
import './style.scss';

class Header extends React.Component {
  render() {
    return (
      <header>
          <Background image={architecture} />
          <section>
            <h1>
                streaks
            </h1>
            <a
              href="https://itunes.apple.com/us/app/streaks-good-habit-builder/id1257543086?mt=8"
              target="_blank"
            >
              <img src={appStore} />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.thatawe.streaks&hl=en"
              target="_blank"
            >
              <img src={googlePlay} />
            </a>
            <a className="web-app" href="https://thatawe.com/streaks/app" target="_blank">
              check out the web app
            </a>
          </section>
      </header>
    );
  }
}

export default Header;
