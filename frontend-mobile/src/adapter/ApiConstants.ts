// const BASE_PREFIX = 'http://10.0.2.2:5001/api';
import Constants from 'expo-constants';

interface ExpoConfig {
  hostUri?: string;
}

const expoConfig: ExpoConfig = Constants.expoConfig || {};
const debuggerHost: string = expoConfig.hostUri?.split(':').shift() || 'localhost';

const BASE_PREFIX = `http://${debuggerHost}:5000/api`

const ApiConstants = {
  //Authentication & Authorization
  LOGIN : `${BASE_PREFIX}/auth/login`,
  REGISTER: `${BASE_PREFIX}/auth/register`,
  VERIFY_EMAIL : `${BASE_PREFIX}/auth/verify-email`,
  // User
  CHANGE_PASSWORD: `${BASE_PREFIX}/user/changePassword`,
  UPDATE_INFORMATION: `${BASE_PREFIX}/user/updateInformation`,
  // product
  GET_ALL_PRODUCTS: `${BASE_PREFIX}/products`,
  CREATE_PRODUCT: `${BASE_PREFIX}/products`,
  UPDATE_PRODUCT: `${BASE_PREFIX}/products`,
  DELETE_PRODUCT: `${BASE_PREFIX}/products`,
  GET_PRODUCT_DETAIL: `${BASE_PREFIX}/products`,

  GET_ALL_STAFFS: `${BASE_PREFIX}/staff`,
  CREATE_STAFF: `${BASE_PREFIX}/staff`,
  UPDATE_STAFF: `${BASE_PREFIX}/staff`,
  DELETE_STAFF: `${BASE_PREFIX}/staff`,
  GET_STAFF_DETAIL: `${BASE_PREFIX}/staff`,
  SEARCH_STAFF: `${BASE_PREFIX}/staff/search`,
  //Admin
  LIST_BUSSINESS_ONWER: `${BASE_PREFIX}/admin/businessOwners`,
  TOGGLE_ACCOUNT_STATUS: `${BASE_PREFIX}/admin/toggleStatus`,
  APPROVE_ACCOUNT: `${BASE_PREFIX}/admin/approve`,
  REJECT_ACCOUNT: `${BASE_PREFIX}/admin/reject`,
  //Customer
  LIST_CUSTOMER: `${BASE_PREFIX}/customer`,
  CREATE_CUSTOMER: `${BASE_PREFIX}/customer`,
  DELETE_CUSTOMER: `${BASE_PREFIX}/customer`,
  UPDATE_CUSTOMER: `${BASE_PREFIX}/customer`,
  // Category
  GET_CATEGORIES: `${BASE_PREFIX}/categories`,
  CREATE_CATEGORY: `${BASE_PREFIX}/categories`,

  // Invoice
  FETCH_LIST_TRANSACTION: `${BASE_PREFIX}/transaction`,
  CREATE_TRANSACTION: `${BASE_PREFIX}/transaction`,
  UPDATE_TRANSACTION: `${BASE_PREFIX}/transaction`,
  DELETE_TRANSACTION: `${BASE_PREFIX}/transaction`,
  GET_TRANSACTION: `${BASE_PREFIX}/transaction`,
};

export default ApiConstants;

export {
  BASE_PREFIX,
};

export const API_URL: string = `http://${debuggerHost}:5000/api`;

