/* global Stripe */
import React from 'react';

import './style.scss';

class Upgrade extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentComplete: false,
      paymentError: null,
      submitDisabled: false,
      email: decodeURIComponent(location.search.split('?email=')[1].split('&')[0]),
      token: null
    };
  }

  componentWillMount() {
    Stripe.setPublishableKey('pk_test_HFbpBEhNxE6ByS7a22KrYegM');
  }

  onSubmit= (event) => {
    event.preventDefault();
    this.setState({ submitDisabled: true, paymentError: null });
    // send form here
    Stripe.createToken(event.target, (status, response) => {
      if (response.error) {
        this.setState({ paymentError: response.error.message, submitDisabled: false });
      } else {
        this.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
        /* eslint-disable no-console */
        console.log(response);
        // make request to your server here!
      }
    });
  }

  render() {
    const {
      paymentComplete,
      paymentError,
      submitDisabled,
    } = this.state;

    return (
      <section className="upgrade">
       {
          paymentComplete ?
            <div>Payment Complete!</div> :
            <form onSubmit={this.onSubmit} >
              <span>{ paymentError }</span><br />
              <input type="text" data-stripe="number" placeholder="credit card number" /><br />
              <input type="text" data-stripe="exp-month" placeholder="expiration month" /><br />
              <input type="text" data-stripe="exp-year" placeholder="expiration year" /><br />
              <input type="text" data-stripe="cvc" placeholder="cvc" /><br />
              <input disabled={submitDisabled} type="submit" value="Purchase" />
            </form>
       }
      </section>
    );
  }
}

export default Upgrade;
