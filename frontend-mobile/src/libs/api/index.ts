import { getToken } from '@utils/handleToken';
import axios, {AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, InternalAxiosRequestConfig} from 'axios';
import qs from 'qs'
import Config from 'react-native-config';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: Config.API_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  } as AxiosRequestHeaders,
};

const api: AxiosInstance = axios.create(axiosRequestConfig);
// Interceptor để chèn token trước khi request được gửi
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getToken(); // Lấy token từ nơi lưu trữ an toàn
    if (token) {
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders;
      }
      
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default {
  async get(endPoint: string, options?: AxiosRequestConfig) {
    const headers = options && options.headers ? {...options.headers} : {};
    return api.request({
      url: endPoint,
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMyIsImlhdCI6MTc0MTM1NzE4OCwiZXhwIjoxNzQxMzYwNzg4LCJpc3MiOiJpc3N1ZXIifQ.tFIQYMwAph0nxv8PLpC-UPY7znV7e1HGMBeOPVS0WCI`, // Thêm thủ công ở đây
      },
      method: 'GET',
    });
  },
  
  async post(endPoint: string, options?: AxiosRequestConfig) {
    return api.request({
      url: endPoint,
      ...options,
      method: 'POST',
    });
  },
  async put(endPoint: string, options?: AxiosRequestConfig) {
    return api.request({
      url: endPoint,
      ...options,
      method: 'PUT',
    });
  },  
  async patch(endPoint: string, options?: AxiosRequestConfig) {
    return api.request({
      url: endPoint,
      ...options,
      method: 'PATCH',
    });
  },
  async delete(endPoint: string, options?: AxiosRequestConfig) {
    return api.request({
      url: endPoint,
      ...options,
      method: 'DELETE',
    });
  },
};
