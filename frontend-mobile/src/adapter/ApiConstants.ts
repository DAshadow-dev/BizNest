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

  //Admin
  LIST_BUSSINESS_ONWER: `${BASE_PREFIX}/admin/businessOwners`,
  TOGGLE_ACCOUNT_STATUS: `${BASE_PREFIX}/admin/toggleStatus`,
};

export default ApiConstants;

export {
  BASE_PREFIX,
};

export const API_URL: string = `http://${debuggerHost}:5000/api`;

console.log('🌐 API_URL:', API_URL);

