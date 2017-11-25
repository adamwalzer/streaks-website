import React from 'react';
import './style.scss';

import {
  Link,
  withRouter,
} from 'react-router-dom';

@withRouter
class Footer extends React.Component {
  render() {
    return (
    <footer>
        <section>
          <h3>
              <Link
                to="/privacy-policy"
              >
                privacy policy
              </Link>
              <Link
                to="/terms-of-service"
              >
                terms of service
              </Link>
              <Link
                to="/"
              >
                thatawe
              </Link>
          </h3>
        </section>
    </footer>
    );
  }
}

export default Footer;
