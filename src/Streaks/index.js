import React from 'react';

import {
  withRouter,
} from 'react-router-dom';

import Page from '../Page';
import Header from '../Header';

import add from './add.png';
import view from './view.png';
import edit from './edit.png';

import './style.scss';

@withRouter
class Streaks extends React.Component {
  render() {
    return (
      <div className="streaks-page">
        <Page
          ref="streaks"
          key="streaks"
        >
          <Header />
          <div className="content">
            <section>
              <p>
                add a streak
              </p>
              <img src={add} />
            </section>
            <section>
              <p>
                view and complete your streaks by tapping on the streak
              </p>
              <img src={view} />
            </section>
            <section>
              <p>
                see more details about your streak
              </p>
              <img src={edit} />
            </section>
          </div>
        </Page>
      </div>
    );
  }
}

export default Streaks;
