import React from 'react';

import {
  api,
} from 'streaks-website/config';

import './style.scss';

class ContactUs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reportSent: false,
      reportError: null,
      email: decodeURIComponent(((location.search || '').split('?email=')[1] || '').split('&')[0]),
      subject: '',
      message: '',
    };
  }

  _updateEmail = e => {
    this.setState({
      email: e.target.value,
    });
  }

  _updateSubject = e => {
    this.setState({
      subject: e.target.value,
    });
  }

  _updateMessage = e => {
    this.setState({
      message: e.target.value,
    });
  }

  _submitReport = e => {
    e.preventDefault();

    const {
      email,
      subject,
      message,
    } = this.state;

    fetch(`${api}contact/us`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        subject,
        message,
      })
    }).then(res => res.json())
    .then(res => {
      if (res.success) {
        this.setState({
          successMessage: 'Your message has been sent!',
          errorMessage: '',
        });
      } else {
        this.setState({
          successMessage: '',
          errorMessage: 'There has been an error sending your message. Please try again.',
        });
      }

      parent.postMessage(res, '*');
    });
  }

  render() {
    const {
      successMessage,
      errorMessage,
      email,
      subject,
      message,
    } = this.state;

    const disabled = !email || !subject || !message;

    return (
      <section className="contact-us">
        <h1>
          Contact Us!
        </h1>
        {
          successMessage ?
          <div className="sent">
            {successMessage}
          </div> :
          <form onSubmit={this._submitReport}>
            {
              errorMessage ?
              <div className="error">
                {errorMessage}
              </div> :
              null
            }
            <input type="email" placeholder="Email" value={email} onChange={this._updateEmail} />
            <input type="text" placeholder="Subject" value={subject} onChange={this._updateSubject} />
            <textarea
              placeholder="Hello friends!"
              value={message}
              onChange={this._updateMessage}
            />
            <input type="submit" value="Send" disabled={disabled} />
          </form>
        }
      </section>
    );
  }
}

export default ContactUs;
