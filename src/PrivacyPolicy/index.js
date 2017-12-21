import React from 'react';
import privacyPolicy from './privacypolicy';
import './style.scss';

class PrivacyPolicy extends React.Component {
  render() {
    return (
      <section
        className="terms"
        dangerouslySetInnerHTML={{__html: privacyPolicy}}
      />
    );
  }
}

export default PrivacyPolicy;
