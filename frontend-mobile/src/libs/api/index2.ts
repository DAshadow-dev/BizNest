import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import Config from 'react-native-config';
import { getToken } from '@utils/handleToken';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: Config.API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

// Thêm interceptor để tự động đính kèm token vào mọi request
api.interceptors.request.use(
  async (config) => {
    try {
      // Lấy token từ AsyncStorage
      const token = await getToken();
      console.log('[API Interceptor] Token retrieved:', token ? 'Yes' : 'No');
      
      // Chỉ thêm Authorization header nếu có token
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
        console.log('[API Interceptor] Added auth token to request');
      }
      return config;
    } catch (error) {
      console.error('[API Interceptor] Error retrieving token:', error);
      return config;
    }
  },
  (error) => {
    console.error('[API Interceptor] Request error:', error);
    return Promise.reject(error);
  }
);

export default {
  async get(endPoint: string, options?: AxiosRequestConfig) {
    let query = '';
    if (options?.params) {
      query = qs.stringify(options.params, {
        addQueryPrefix: true,
        skipNulls: true,
      });
      delete options.params;
    }

    return api.request({
      url: `${endPoint}${query}`,
      ...options,
      method: 'GET',
    });
  },
  async post(endPoint: string, formData: FormData, options?: AxiosRequestConfig) {
    const headers = options && options.headers ? { ...options.headers } : {};

    // Set the Content-Type to multipart/form-data
    headers['Content-Type'] = 'multipart/form-data';

    return api.request({
      url: endPoint,
      ...options,
      headers,
      method: 'POST',
      data: formData, // Ensure formData is sent as the request body
    });
  },
  async put(endPoint: string, formData: FormData, options?: AxiosRequestConfig) {
    const headers = options && options.headers ? { ...options.headers } : {};

    // Set the Content-Type to multipart/form-data if data is FormData
    if (formData instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    }

    return api.request({
      url: endPoint,
      ...options,
      headers,
      method: 'PUT',
      data: formData, 
    });
  },
  async patch(endPoint: string, options?: AxiosRequestConfig) {
    const headers = options && options.headers ? { ...options.headers } : {};

    return api.request({
      url: endPoint,
      ...options,
      headers,
      method: 'PATCH',
    });
  },
  async delete(endPoint: string, options?: AxiosRequestConfig) {
    const headers = options && options.headers ? { ...options.headers } : {};

    return api.request({
      url: endPoint,
      ...options,
      headers,
      method: 'DELETE',
    });
  },
};