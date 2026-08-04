const {
  USER_CREDENTIALS,
  PRODUCT,
  SHIPPING,
  PAYMENT,
  QUANTITY,
  MESSAGES,
} = require('./constants');

/**
 * Reusable scenario datasets.
 * Keep this file focused on data only — no test logic.
 */

const positiveLogin = {
  email: USER_CREDENTIALS.VALID.email,
  password: USER_CREDENTIALS.VALID.password,
  displayName: USER_CREDENTIALS.VALID.displayName,
};

const invalidLogin = {
  email: USER_CREDENTIALS.INVALID.email,
  password: USER_CREDENTIALS.INVALID.password,
};

const emptyLogin = {
  email: '',
  password: '',
};

const productSearch = {
  name: PRODUCT.NAME,
  searchKeyword: PRODUCT.SEARCH_KEYWORD,
  secondSearchKeyword: PRODUCT.SECOND_SEARCH_KEYWORD,
  quantity: QUANTITY.DEFAULT,
  updatedQuantity: QUANTITY.UPDATED,
};

const invalidSearch = {
  searchKeyword: 'zzznoproductxyz999',
  expectedMessage: MESSAGES.NO_PRODUCTS_FOUND,
};

const checkoutDetails = {
  street: SHIPPING.street,
  city: SHIPPING.city,
  state: SHIPPING.state,
  country: SHIPPING.country,
  countryLabel: SHIPPING.countryLabel,
  postalCode: SHIPPING.postalCode,
  houseNumber: SHIPPING.houseNumber,
  paymentMethod: PAYMENT.method,
  paymentDetails: PAYMENT.details,
};

/**
 * Builds a unique registration payload for UI/API tests.
 * Password meets Toolshop complexity rules and avoids common leaked passwords.
 */
function buildRegistrationUser(overrides = {}) {
  const stamp = Date.now();
  return {
    firstName: 'Auto',
    lastName: 'Tester',
    dob: '1990-01-15',
    country: SHIPPING.country,
    countryLabel: SHIPPING.countryLabel,
    postalCode: SHIPPING.postalCode,
    houseNumber: SHIPPING.houseNumber,
    street: SHIPPING.street,
    city: SHIPPING.city,
    state: SHIPPING.state,
    phone: '0612345678',
    email: `qa.auto.${stamp}@mailinator.com`,
    password: `Qa!${stamp}Xy9`,
    ...overrides,
  };
}

module.exports = {
  positiveLogin,
  invalidLogin,
  emptyLogin,
  productSearch,
  invalidSearch,
  checkoutDetails,
  buildRegistrationUser,
};
