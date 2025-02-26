import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import qs from 'qs'
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
  async post(endPoint: string, options?: AxiosRequestConfig) {
    const headers = options && options.headers ? {...options.headers} : {};

    return api.request({
      url: endPoint,
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer `, // Thêm thủ công ở đây
      },
      method: 'POST',
    });
  },
  async put(endPoint: string, options?: AxiosRequestConfig) {
    const headers = options && options.headers ? {...options.headers} : {};

    return api.request({
      url: endPoint,
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer `, // Thêm thủ công ở đây
      },
      method: 'PUT',
    });
  },
  async patch(endPoint: string, options?: AxiosRequestConfig) {
    const headers = options && options.headers ? {...options.headers} : {};

    return api.request({
      url: endPoint,
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer `, // Thêm thủ công ở đây
      },
      method: 'PUT',
    });
  },
  async delete(endPoint: string, options?: AxiosRequestConfig) {
    const headers = options && options.headers ? {...options.headers} : {};

    return api.request({
      url: endPoint,
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer `, // Thêm thủ công ở đây
      },
      method: 'DELETE',
    });
  },
};
