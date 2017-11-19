import React from 'react';
import {
	CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from 'react-stripe-elements';

import './style.scss';

const options = {
  style: {
    base: {
      fontSize: '14px',
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Lato, sans-serif',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

class _CardForm extends React.Component {
  handleSubmit = ev => {
    ev.preventDefault();
    this.props.stripe.createToken().then(payload => {
      if (payload.error) {
        this.setState({ paymentError: payload.error.message, submitDisabled: false });
      } else {
        this.setState({ paymentComplete: true, submitDisabled: false, token: payload.token });
        fetch('https://appsthatawe.dev/store/streaks', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: payload.token,
            email: this.props.email,
            product: document.querySelector('[name=product]:checked').getAttribute('data-product'),
          })
        }).then(res => res.json())
        .then(res => {
          /* eslint-disable no-console */
          console.log(res);
        });
      }
    });
  };

  render() {
    const {
      email,
    } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>
          Upgrade your Streaks account for
        </h1>
        <div className="email">
          {email}
        </div>
        <label>
          Card details
          <CardElement
            {...options}
          />
        </label>
        <label>
          <input type="radio" name="product" data-product="unlimited-streaks" checked readOnly />
          $1 for unlimited streaks for one year
        </label>
        <button>Pay</button>
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);

class Upgrade extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      paymentComplete: false,
      paymentError: null,
      email: decodeURIComponent(location.search.split('?email=')[1].split('&')[0]),
      token: null
    };
  }

  render() {
    const {
      paymentComplete,
      email,
    } = this.state;

    return (
      <section className="upgrade">
       {
          paymentComplete ?
            <div>Payment Complete!</div> :
            <div className="checkout">
              <StripeProvider apiKey="pk_test_HFbpBEhNxE6ByS7a22KrYegM">
                <Elements>
                  <CardForm email={email} />
                </Elements>
              </StripeProvider>
            </div>
       }
      </section>
    );
  }
}

export default Upgrade;
