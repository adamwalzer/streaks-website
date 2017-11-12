import React from 'react';
import termsOfService from './termsofservice';
import './style.scss';

import {
  withRouter,
} from 'react-router-dom';

@withRouter
class TermsOfService extends React.Component {
  render() {
    return (
      <section dangerouslySetInnerHTML={{__html: termsOfService}} />
    );
  }
}

export default TermsOfService;
