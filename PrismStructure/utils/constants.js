module.exports = {
  URLS: {
    UI_BASE: 'https://practicesoftwaretesting.com',
    API_BASE: 'https://api.practicesoftwaretesting.com',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    HOME: '/',
    INVOICES: '/account/invoices',
    PROFILE: '/account/profile',
    API: {
      REGISTER: '/users/register',
      LOGIN: '/users/login',
      PRODUCT_SEARCH: '/products/search',
      CARTS: '/carts',
      INVOICES: '/invoices',
      USERS_ME: '/users/me',
    },
  },

  TIMEOUTS: {
    DEFAULT: 60_000,
    CHECKOUT: 120_000,
    VALIDATION: 90_000,
  },

  PRODUCT: {
    NAME: 'Pliers',
    SEARCH_KEYWORD: 'Pliers',
    SECOND_SEARCH_KEYWORD: 'Hammer',
  },

  // Prefer env overrides in real environments; defaults are public demo placeholders.
  // customer / customer2 may be locked after repeated invalid attempts on the public demo.
  USER_CREDENTIALS: {
    VALID: {
      email: process.env.TOOLSHOP_VALID_EMAIL || 'customer3@practicesoftwaretesting.com',
      password: process.env.TOOLSHOP_VALID_PASSWORD || 'pass123',
      displayName: process.env.TOOLSHOP_VALID_DISPLAY_NAME || 'Bob Smith',
    },
    INVALID: {
      email: process.env.TOOLSHOP_INVALID_EMAIL || 'unknown.user@practicesoftwaretesting.com',
      password: process.env.TOOLSHOP_INVALID_PASSWORD || 'wrong-password',
    },
  },

  MESSAGES: {
    INVALID_LOGIN: 'Invalid email or password',
    ACCOUNT_LOCKED: 'Account locked, too many failed attempts. Please contact the administrator.',
    PRODUCT_ADDED: 'Product added to shopping cart',
    NO_PRODUCTS_FOUND: 'There are no products found.',
    ORDER_THANKS: /Thanks for your order!/i,
    ORDER_CONFIRMATION: /Thanks for your order! Your invoice number is/i,
    INVOICE_NUMBER: /INV-\d+/i,
    CART_ITEM_ADDED: 'item added or updated',
    CART_EMPTY: /The cart is empty/i,
    PAYMENT_SUCCESS: 'Payment was successful',
  },

  // Country ISO code + postal/house drive Toolshop postcode lookup for street/city/state.
  SHIPPING: {
    street: 'Polatpad',
    city: 'Spannum',
    state: 'Utrecht',
    country: 'NL',
    countryLabel: 'Netherlands (the)',
    postalCode: '3512 JC',
    houseNumber: '1',
  },

  PAYMENT: {
    method: 'cash-on-delivery',
    details: {},
  },

  QUANTITY: {
    DEFAULT: 1,
    UPDATED: 2,
  },

  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
  },

  AUTH: {
    TOKEN_TYPE: 'bearer',
    MIN_TOKEN_LENGTH: 10,
  },

  API_SCHEMAS: {
    register: ['id', 'email', 'first_name', 'last_name'],
    login: ['access_token', 'token_type', 'expires_in'],
    product: ['id', 'name', 'price', 'description'],
    productSearch: ['current_page', 'data', 'total'],
    cartCreated: ['id'],
    cartItemAdded: ['result'],
    cart: ['id', 'cart_items'],
    invoice: [
      'id',
      'invoice_number',
      'billing_street',
      'billing_city',
      'billing_country',
      'total',
    ],
    invoicesList: ['current_page', 'data', 'total'],
  },
};
