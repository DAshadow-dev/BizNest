import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import qs from 'qs';
import Config from 'react-native-config';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: Config.API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

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
      headers: {
        ...headers,
        Authorization: `Bearer `, // Add your token here if needed
      },
      method: 'POST',
      data: formData, // Ensure formData is sent as the request body
    });
  },
  async put(endPoint: string, formData: FormData, options?: AxiosRequestConfig) { // Add data parameter
    const headers = options && options.headers ? { ...options.headers } : {};

    // Set the Content-Type to multipart/form-data if data is FormData
    if (formData instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    }

    return api.request({
      url: endPoint,
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer `, // Add your token here if needed
      },
      method: 'PUT',
      data: formData, 
    });
  },
  async patch(endPoint: string, options?: AxiosRequestConfig) {
    const headers = options && options.headers ? { ...options.headers } : {};

    return api.request({
      url: endPoint,
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer `, // Add your token here if needed
      },
      method: 'PATCH',
    });
  },
  async delete(endPoint: string, options?: AxiosRequestConfig) {
    const headers = options && options.headers ? { ...options.headers } : {};

    return api.request({
      url: endPoint,
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer `, // Add your token here if needed
      },
      method: 'DELETE',
    });
  },
};