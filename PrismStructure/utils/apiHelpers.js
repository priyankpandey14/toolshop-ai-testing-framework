const { expect } = require('@playwright/test');
const { URLS, MESSAGES, HTTP_STATUS, QUANTITY } = require('./constants');

/**
 * @param {object} body
 * @param {string[]} requiredKeys
 */
function assertSchema(body, requiredKeys) {
  expect(body).toEqual(expect.any(Object));
  for (const key of requiredKeys) {
    expect(body, `Missing response field: ${key}`).toHaveProperty(key);
  }
}

/**
 * @param {string} [token]
 */
function buildHeaders(token) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {object} user
 */
async function registerUser(request, user) {
  return request.post(`${URLS.API_BASE}${URLS.API.REGISTER}`, {
    headers: buildHeaders(),
    data: {
      first_name: user.firstName,
      last_name: user.lastName,
      dob: user.dob,
      address: {
        street: user.street,
        city: user.city,
        state: user.state,
        country: user.country,
        postal_code: user.postalCode,
      },
      phone: user.phone,
      email: user.email,
      password: user.password,
    },
  });
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {{ email: string, password: string }} credentials
 */
async function login(request, credentials) {
  return request.post(`${URLS.API_BASE}${URLS.API.LOGIN}`, {
    headers: buildHeaders(),
    data: {
      email: credentials.email,
      password: credentials.password,
    },
  });
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} token
 */
async function getCurrentUser(request, token) {
  return request.get(`${URLS.API_BASE}${URLS.API.USERS_ME}`, {
    headers: buildHeaders(token),
  });
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} token
 */
async function listInvoices(request, token) {
  return request.get(`${URLS.API_BASE}${URLS.API.INVOICES}`, {
    headers: buildHeaders(token),
  });
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} query
 */
async function searchProducts(request, query) {
  return request.get(`${URLS.API_BASE}${URLS.API.PRODUCT_SEARCH}`, {
    headers: buildHeaders(),
    params: { q: query },
  });
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {{ lat?: number, lng?: number }} [location]
 */
async function createCart(request, location = {}) {
  const options = { headers: buildHeaders() };
  if (location.lat != null && location.lng != null) {
    options.data = location;
  }
  return request.post(`${URLS.API_BASE}${URLS.API.CARTS}`, options);
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} cartId
 * @param {string} productId
 * @param {number} quantity
 * @param {{ lat?: number, lng?: number }} [location]
 */
async function addProductToCart(
  request,
  cartId,
  productId,
  quantity = QUANTITY.DEFAULT,
  location = {},
) {
  return request.post(`${URLS.API_BASE}${URLS.API.CARTS}/${cartId}`, {
    headers: buildHeaders(),
    data: {
      product_id: productId,
      quantity,
      ...location,
    },
  });
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} cartId
 */
async function getCart(request, cartId) {
  return request.get(`${URLS.API_BASE}${URLS.API.CARTS}/${cartId}`, {
    headers: buildHeaders(),
  });
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} token
 * @param {object} checkoutPayload
 */
async function checkout(request, token, checkoutPayload) {
  return request.post(`${URLS.API_BASE}${URLS.API.INVOICES}`, {
    headers: buildHeaders(token),
    data: checkoutPayload,
  });
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {{ email: string, password: string }} credentials
 */
async function getAccessToken(request, credentials) {
  const response = await login(request, credentials);
  expect(response.status()).toBe(HTTP_STATUS.OK);
  const body = await response.json();
  expect(body.access_token).toBeTruthy();
  return body.access_token;
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} query
 * @param {string} productName
 */
async function findProductByName(request, query, productName) {
  const response = await searchProducts(request, query);
  expect(response.status()).toBe(HTTP_STATUS.OK);
  const body = await response.json();
  const products = body.data || [];
  const matchedProduct =
    products.find(
      (item) => item.name === productName && Number(item.stock) > 0,
    ) || products.find((item) => item.name === productName);

  expect(matchedProduct, `Product not found: ${productName}`).toBeTruthy();
  return matchedProduct;
}

/**
 * @param {object} product
 */
function isProductInStock(product) {
  if (product == null) {
    return false;
  }
  if (product.stock == null) {
    return true;
  }
  return Number(product.stock) > 0;
}

/**
 * Returns the first in-stock product for a search query.
 * Falls back to browsing the catalog when the query has no stocked matches.
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} query
 */
async function findInStockProduct(request, query) {
  const searchResponse = await searchProducts(request, query);
  expect(searchResponse.status()).toBe(HTTP_STATUS.OK);
  const searchBody = await searchResponse.json();
  let matchedProduct = (searchBody.data || []).find((item) => isProductInStock(item));

  if (!matchedProduct) {
    const catalogResponse = await request.get(`${URLS.API_BASE}/products`, {
      headers: buildHeaders(),
      params: { page: 1 },
    });
    expect(catalogResponse.status()).toBe(HTTP_STATUS.OK);
    const catalogBody = await catalogResponse.json();
    matchedProduct = (catalogBody.data || []).find((item) => isProductInStock(item));
  }

  expect(
    matchedProduct,
    `No in-stock product found for query: ${query}. Sample: ${JSON.stringify((searchBody.data || []).slice(0, 2))}`,
  ).toBeTruthy();
  return matchedProduct;
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {{ country: string, postcode: string, houseNumber?: string }} address
 */
async function lookupPostcode(request, address) {
  const params = {
    country: address.country,
    postcode: address.postcode,
  };
  if (address.houseNumber) {
    params.house_number = address.houseNumber;
  }

  const response = await request.get(`${URLS.API_BASE}/postcode-lookup`, {
    headers: buildHeaders(),
    params,
  });
  expect(response.status()).toBe(HTTP_STATUS.OK);
  return response.json();
}

/**
 * @param {import('@playwright/test').APIRequestContext} request
 * @param {string} productId
 * @param {number} [quantity]
 */
async function createCartWithProduct(
  request,
  productId,
  quantity = QUANTITY.DEFAULT,
) {
  const createResponse = await createCart(request);
  expect(createResponse.status()).toBe(HTTP_STATUS.CREATED);
  const { id: cartId } = await createResponse.json();

  const addResponse = await addProductToCart(request, cartId, productId, quantity);
  expect(addResponse.status()).toBe(HTTP_STATUS.OK);
  const addBody = await addResponse.json();
  expect(addBody.result).toBe(MESSAGES.CART_ITEM_ADDED);

  return cartId;
}

module.exports = {
  assertSchema,
  buildHeaders,
  registerUser,
  login,
  getCurrentUser,
  listInvoices,
  searchProducts,
  createCart,
  addProductToCart,
  getCart,
  checkout,
  getAccessToken,
  findProductByName,
  findInStockProduct,
  createCartWithProduct,
  lookupPostcode,
};
