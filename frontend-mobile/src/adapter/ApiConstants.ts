const BASE_PREFIX = 'http://10.0.2.2:5001/api';

const ApiConstants = {
  // User
  CHANGE_PASSWORD: `${BASE_PREFIX}/user/changePassword`,
  UPDATE_INFORMATION: `${BASE_PREFIX}/user/updateInformation`,

  // product
  GET_ALL_PRODUCTS: `${BASE_PREFIX}/products`,
  CREATE_PRODUCT: `${BASE_PREFIX}/products`,
  UPDATE_PRODUCT: `${BASE_PREFIX}/products`,
  DELETE_PRODUCT: `${BASE_PREFIX}/products`,
};

export default ApiConstants;

export {
  BASE_PREFIX,
};
