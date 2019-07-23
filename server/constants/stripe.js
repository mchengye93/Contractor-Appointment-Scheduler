const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_test_ldUu5VKLUWa3FhMsblWO5ObV'
    : 'sk_test_ldUu5VKLUWa3FhMsblWO5ObV';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
