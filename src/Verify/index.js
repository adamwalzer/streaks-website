import React from 'react';

import {
  api,
} from 'streaks-website/config';

import './style.scss';

class Verify extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reportSent: false,
      reportMessage: 'Sending report...',
      reportError: null,
      email: decodeURIComponent(((location.search || '').split('email=')[1] || '').split('&')[0]),
      code: decodeURIComponent(((location.search || '').split('code=')[1] || '').split('&')[0]),
      message: '',
    };
  }

  _submitReport = () => {
    const {
      email,
      code,
    } = this.state;

    if (!email || !code) {
      this.setState({
        successMessage: '',
        errorMessage: 'There has been an error verifying your account. Please try again.',
      });
    }

    fetch(`${api}validate/email`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        code,
      })
    }).then(res => res.json())
    .then(res => {
      if (res.token) {
        this.setState({
          reportSent: true,
          successMessage: 'Your account has been verified!',
          errorMessage: '',
        });
      } else {
        this.setState({
          reportSent: true,
          successMessage: '',
          errorMessage: 'There has been an error verifying your account. Please try again.',
        });
      }

      parent.postMessage(res, '*');
    })
    .catch(() => {
      this.setState({
        reportSent: true,
        successMessage: '',
        errorMessage: 'There has been an error verifying your account. Please try again.',
      });
    });
  }

  componentDidMount() {
    this._submitReport();
  }

  render() {
    const {
      reportSent,
      reportMessage,
      successMessage,
      errorMessage,
    } = this.state;

    return (
      <section className="verify">
        <h1>
          Account Verification
        </h1>
        {
          reportSent ?
            successMessage ?
            <div className="sent">
              {successMessage}
            </div> :
            <div className="error">
              {errorMessage}
            </div> :
          <div>
            {reportMessage}
          </div>
        }
      </section>
    );
  }
}

export default Verify;
