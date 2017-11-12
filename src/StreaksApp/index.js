import React from 'react';
import Background from '../Background';
// https://pixabay.com/en/architecture-bridge-building-castle-1850676/
import architecture from './architecture.jpg';
import './style.scss';

class StreaksApp extends React.Component {
  render() {
    return (
      <header>
          <Background image={architecture} />
          <iframe src="https://streaks.thatawe.com"></iframe>
      </header>
    );
  }
}

export default StreaksApp;
