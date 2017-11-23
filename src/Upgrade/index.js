import React from 'react';

import {
  stripeApiKey,
} from 'streaks-website/secrets';

import {
  api,
} from 'streaks-website/config';

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
  constructor(props) {
    super(props);

    this.state = {
      tokens: 10,
      product: 'unlimited-streaks',
    };
  }

  handleSubmit = ev => {
    ev.preventDefault();
    this.props.stripe.createToken().then(payload => {
      if (payload.error) {
        this.setState({ paymentError: payload.error.message, submitDisabled: false });
      } else {
        this.setState({ paymentComplete: true, submitDisabled: false, token: payload.token });

        const {
          tokens,
          product,
        } = this.state;

        fetch(`${api}store/streaks`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token: payload.token,
            email: this.props.email,
            product: product,
            tokens,
          })
        }).then(res => res.json())
        .then(res => {
          if (res.success) {
            this.setState({
              successMessage: 'Your transaction is complete!',
            });
          } else {
            this.setState({
              errorMessage: 'There has been an error processing with your transaction. Please try again.',
            });
          }

          parent.postMessage(res, '*');
        });
      }
    });
  };

  _updateProduct = (e) => {
    this.setState({
      product: e.target.value,
    });
  }

  _updateTokens = (e) => {
    this.setState({
      product: 'tokens',
      tokens: e.target.value,
    });
  }

  _setTokenMinimum = (e) => {
    this.setState({
      product: 'tokens',
      tokens: Math.max(e.target.value, 10),
    });
  }

  render() {
    const {
      email,
    } = this.props;

    const {
      tokens,
      product,
      errorMessage,
      successMessage,
    } = this.state;

    const cost = Number(tokens / 10).toFixed(2);
    const disabled = product === 'tokens' && tokens < 10;

    return (
      successMessage ?
      <div className="success-message">
        {successMessage}
      </div> :
      <form onSubmit={this.handleSubmit}>
        <div className="error-message">
          {errorMessage}
        </div>
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
          <input
            type="radio"
            name="product"
            value="unlimited-streaks"
            checked={product === 'unlimited-streaks'}
            onChange={this._updateProduct}
          />
          $1 for unlimited streaks for one year
        </label>
        <label>
          <input
            type="radio"
            name="product"
            value="tokens"
            checked={product === 'tokens'}
            onChange={this._updateProduct}
          />
          <input
            type="number"
            name="tokens"
            value={tokens}
            min={10}
            max={100}
            step={10}
            onChange={this._updateTokens}
            onBlur={this._setTokenMinimum}
            onFocus={this._setTokenMinimum}
          />
          tokens for ${cost}
        </label>
        <button
          disabled={disabled}
        >
          Pay
        </button>
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
      email: decodeURIComponent(((location.search || '').split('?email=')[1] || '').split('&')[0]),
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
              <StripeProvider apiKey={stripeApiKey}>
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
