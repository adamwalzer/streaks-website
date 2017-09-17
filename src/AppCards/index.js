import React from 'react';
import AppCard from '../AppCard';

import data from './apps.json';

import './style.scss';

const AppCards = () => (
  <div className="AppCards">
    {data.apps.map(app => (
      <AppCard
        key={app.title}
        app={app}
      />
    ))}
  </div>
);

export default AppCards;
