import Constants from 'expo-constants';

const expoConfig = Constants.expoConfig || {};
const debuggerHost = expoConfig.hostUri?.split(':').shift() || 'localhost';

export const API_URL = `http://${debuggerHost}:5000/api`;

console.log('🌐 API_URL:', API_URL);
