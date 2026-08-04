const { test, expect } = require('@playwright/test');
const {
  MESSAGES,
  HTTP_STATUS,
  AUTH,
  API_SCHEMAS,
} = require('../../utils/constants');
const {
  positiveLogin,
  productSearch,
  checkoutDetails,
  buildRegistrationUser,
} = require('../../utils/testData');
const {
  assertSchema,
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
  lookupPostcode,
} = require('../../utils/apiHelpers');

test.describe('Purchase Flow API', () => {
  test('Register Login And Create Cart', { tag: '@Smoke' }, async ({ request }) => {
    // Arrange — assessment API AC1
    const user = buildRegistrationUser();

    // Act — register
    const registerResponse = await registerUser(request, user);
    const registerBody = await registerResponse.json();

    // Assert — register
    expect(registerResponse.status()).toBe(HTTP_STATUS.CREATED);
    assertSchema(registerBody, API_SCHEMAS.register);
    expect(registerBody.email).toBe(user.email);
    expect(registerBody.first_name).toBe(user.firstName);

    // Act — login with registered credentials
    const loginResponse = await login(request, {
      email: user.email,
      password: user.password,
    });
    const loginBody = await loginResponse.json();

    // Assert — token
    expect(loginResponse.status()).toBe(HTTP_STATUS.OK);
    assertSchema(loginBody, API_SCHEMAS.login);
    expect(loginBody.access_token.length).toBeGreaterThan(AUTH.MIN_TOKEN_LENGTH);
    expect(loginBody.token_type.toLowerCase()).toBe(AUTH.TOKEN_TYPE);

    // Act — create cart with bearer context available
    const meResponse = await getCurrentUser(request, loginBody.access_token);
    expect(meResponse.status()).toBe(HTTP_STATUS.OK);
    const meBody = await meResponse.json();
    expect(meBody.email).toBe(user.email);

    const createResponse = await createCart(request);
    const createBody = await createResponse.json();
    expect(createResponse.status()).toBe(HTTP_STATUS.CREATED);
    assertSchema(createBody, API_SCHEMAS.cartCreated);
    expect(createBody.id.length).toBeGreaterThan(0);
  });

  test('Login API', { tag: '@Smoke' }, async ({ request }) => {
    // Arrange
    const credentials = {
      email: positiveLogin.email,
      password: positiveLogin.password,
    };

    // Act
    const response = await login(request, credentials);
    const body = await response.json();

    // Assert — status
    expect(response.status()).toBe(HTTP_STATUS.OK);

    // Assert — schema
    assertSchema(body, API_SCHEMAS.login);

    // Assert — important fields
    expect(body.access_token).toEqual(expect.any(String));
    expect(body.access_token.length).toBeGreaterThan(AUTH.MIN_TOKEN_LENGTH);
    expect(body.token_type.toLowerCase()).toBe(AUTH.TOKEN_TYPE);
    expect(body.expires_in).toEqual(expect.any(Number));
    expect(body.expires_in).toBeGreaterThan(0);
  });

  test('Product Search API', { tag: '@Regression' }, async ({ request }) => {
    // Arrange / Act
    const response = await searchProducts(request, productSearch.searchKeyword);
    const body = await response.json();

    // Assert — status
    expect(response.status()).toBe(HTTP_STATUS.OK);

    // Assert — schema
    assertSchema(body, API_SCHEMAS.productSearch);
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    assertSchema(body.data[0], API_SCHEMAS.product);

    // Assert — important fields
    const matchedProduct = body.data.find((item) => item.name === productSearch.name);
    expect(matchedProduct).toBeTruthy();
    expect(matchedProduct.id).toEqual(expect.any(String));
    expect(matchedProduct.name).toBe(productSearch.name);
    expect(Number(matchedProduct.price)).toBeGreaterThan(0);
    expect(matchedProduct.description).toEqual(expect.any(String));
    expect(body.total).toBeGreaterThan(0);
  });

  test('Cart API', { tag: '@Regression' }, async ({ request }) => {
    // Arrange
    const matchedProduct = await findProductByName(
      request,
      productSearch.searchKeyword,
      productSearch.name,
    );

    // Act — create cart
    const createResponse = await createCart(request);
    const createBody = await createResponse.json();

    // Assert — create status + schema + fields
    expect(createResponse.status()).toBe(HTTP_STATUS.CREATED);
    assertSchema(createBody, API_SCHEMAS.cartCreated);
    expect(createBody.id).toEqual(expect.any(String));
    expect(createBody.id.length).toBeGreaterThan(0);

    // Act — add product
    const addResponse = await addProductToCart(
      request,
      createBody.id,
      matchedProduct.id,
      productSearch.quantity,
    );
    const addBody = await addResponse.json();

    // Assert — add status + schema + fields
    expect(addResponse.status()).toBe(HTTP_STATUS.OK);
    assertSchema(addBody, API_SCHEMAS.cartItemAdded);
    expect(addBody.result).toBe(MESSAGES.CART_ITEM_ADDED);

    // Act — get cart
    const getResponse = await getCart(request, createBody.id);
    const cartBody = await getResponse.json();

    // Assert — get status + schema + fields
    expect(getResponse.status()).toBe(HTTP_STATUS.OK);
    assertSchema(cartBody, API_SCHEMAS.cart);
    expect(cartBody.id).toBe(createBody.id);
    expect(Array.isArray(cartBody.cart_items)).toBe(true);
    expect(cartBody.cart_items.length).toBeGreaterThan(0);
    expect(cartBody.cart_items[0].product_id).toBe(matchedProduct.id);
    expect(cartBody.cart_items[0].quantity).toBe(productSearch.quantity);
  });

  test('Product Selection And Invoice Generation', { tag: '@Smoke' }, async ({ request }) => {
    // Arrange — assessment API AC2 using a freshly registered user
    const user = buildRegistrationUser();
    const registerResponse = await registerUser(request, user);
    expect(registerResponse.status()).toBe(HTTP_STATUS.CREATED);

    const token = await getAccessToken(request, {
      email: user.email,
      password: user.password,
    });
    const matchedProduct = await findInStockProduct(
      request,
      productSearch.searchKeyword,
    );
    const secondProduct = await findInStockProduct(
      request,
      productSearch.secondSearchKeyword,
    );
    const createResponse = await createCart(request);
    expect(createResponse.status()).toBe(HTTP_STATUS.CREATED);
    const { id: cartId } = await createResponse.json();

    const addFirst = await addProductToCart(
      request,
      cartId,
      matchedProduct.id,
      productSearch.quantity,
    );
    expect(addFirst.status()).toBe(HTTP_STATUS.OK);
    const addSecond = await addProductToCart(
      request,
      cartId,
      secondProduct.id,
      productSearch.quantity,
    );
    expect(addSecond.status()).toBe(HTTP_STATUS.OK);

    const cartResponse = await getCart(request, cartId);
    const cartBody = await cartResponse.json();
    expect(cartResponse.status()).toBe(HTTP_STATUS.OK);
    expect(cartBody.cart_items.length).toBeGreaterThanOrEqual(2);

    const lookedUpAddress = await lookupPostcode(request, {
      country: checkoutDetails.country,
      postcode: checkoutDetails.postalCode,
      houseNumber: checkoutDetails.houseNumber,
    });

    const checkoutPayload = {
      billing_street: lookedUpAddress.street,
      billing_city: lookedUpAddress.city,
      billing_state: lookedUpAddress.state || checkoutDetails.state,
      billing_country: lookedUpAddress.country,
      billing_postal_code: lookedUpAddress.postcode,
      payment_method: checkoutDetails.paymentMethod,
      payment_details: checkoutDetails.paymentDetails,
      cart_id: cartId,
    };

    // Act
    const response = await checkout(request, token, checkoutPayload);
    const body = await response.json();

    // Assert — invoice created
    expect(response.status(), `Checkout failed: ${JSON.stringify(body)}`).toBe(
      HTTP_STATUS.CREATED,
    );
    assertSchema(body, API_SCHEMAS.invoice);
    expect(body.invoice_number).toMatch(MESSAGES.INVOICE_NUMBER);
    expect(Number(body.total)).toBeGreaterThan(0);

    // Assert — invoice appears in list
    const invoicesResponse = await listInvoices(request, token);
    const invoicesBody = await invoicesResponse.json();
    expect(invoicesResponse.status()).toBe(HTTP_STATUS.OK);
    assertSchema(invoicesBody, API_SCHEMAS.invoicesList);
    expect(
      invoicesBody.data.some((item) => item.invoice_number === body.invoice_number),
    ).toBe(true);
  });
});
