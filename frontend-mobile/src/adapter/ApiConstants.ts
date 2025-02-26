const BASE_PREFIX = 'http://10.0.2.2:5001/api';

const ApiConstants = {
  // User
  CHANGE_PASSWORD: `${BASE_PREFIX}/user/changePassword`,
  UPDATE_INFORMATION: `${BASE_PREFIX}/user/updateInformation`,
};

export default ApiConstants;

export {
  BASE_PREFIX,
};
