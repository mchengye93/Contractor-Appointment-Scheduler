import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD';

const fromUSDToCent = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful');
  console.log(data);
  var paymentId = data.data.success.id;
  var dateId = data.data.success.metadata.dateId;
  var fromUserId = data.data.success.metadata.fromUserId;
  var toUserId = data.data.success.metadata.toUserId;
  var time = new Date();
  time.setHours(time.getHours() - 8);
  var amount = (data.data.success.amount)/100;
  var description = data.data.success.description;

  axios.post('/api/payment/'+paymentId+'/'+dateId+'/'+fromUserId+'/'+toUserId+
  '/'+time+'/'+amount+'/'+description);

  axios.post('/api/paid/'+ dateId);
  
};

const errorPayment = data => {
  alert('Payment Error');
  console.log(data);
};

const onToken = (amount, description,metadata) => token =>
  axios.post(PAYMENT_SERVER_URL,
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUSDToCent(amount),
      metadata

    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ metadata, name, description, amount }) =>
  <StripeCheckout
    metadata= {metadata}
    name={name}
    description={description}
    amount={fromUSDToCent(amount)}
    token={onToken(amount, description,metadata)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />

export default Checkout;
