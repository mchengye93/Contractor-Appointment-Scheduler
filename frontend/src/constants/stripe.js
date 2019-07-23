const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_C0sG8E4U20Oq6rbtiJUp3vVN'
  : 'pk_test_C0sG8E4U20Oq6rbtiJUp3vVN';

export default STRIPE_PUBLISHABLE;
