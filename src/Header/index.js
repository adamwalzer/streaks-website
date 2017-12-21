import React from 'react';
import Background from '../Background';
// https://pixabay.com/en/architecture-bridge-building-castle-1850676/
import architecture from './architecture.jpg';
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
            <a href="https://thatawe.com/streaks/app" target="_blank">
              check out the web app
            </a>
          </section>
      </header>
    );
  }
}

export default Header;
