import React from 'react';
import {
  Link
} from 'react-router-dom';
import Background from '../Background';
// https://pixabay.com/en/architecture-bridge-building-castle-1850676/
import architecture from './architecture.jpg';
import './style.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <header>
          <Background image={architecture} />
          <section>
            <h1>
                streaks
            </h1>
            <Link to="/app">
              check out the web app
            </Link>
          </section>
      </header>
    );
  }
}

export default Header;
