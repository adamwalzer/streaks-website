import React from 'react';
import {
  Link
} from 'react-router-dom';
import Background from '../Background';
// https://pixabay.com/en/architecture-bridge-building-castle-1850676/
import architecture from './architecture.jpg';
import './style.scss';

class Header extends React.Component {
  render() {
    const {
      page,
    } = this.props;

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
          <iframe src={page === 'app' ? 'https://thatawe.com' : ''}></iframe>
      </header>
    );
  }
}

export default Header;
