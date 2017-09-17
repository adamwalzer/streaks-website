import React from 'react';
import {
  Link,
} from 'react-router-dom';

import './style.scss';

const AppCard = ({ app }) => (
  <Link
    className="AppCard"
    to={app.url}
  >
    <div className="content">
      <h3>
        {app.title}
      </h3>
      <p>
        {app.copy}
      </p>
    </div>
  </Link>
);

export default AppCard;
