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
    const headers = options && options.headers ? {...options.headers} : {};

    return api.request({
      url: endPoint,
      ...options,
      headers: {
        ...headers,
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMyIsImlhdCI6MTc0MTM1NzE4OCwiZXhwIjoxNzQxMzYwNzg4LCJpc3MiOiJpc3N1ZXIifQ.tFIQYMwAph0nxv8PLpC-UPY7znV7e1HGMBeOPVS0WCI`, // Thêm thủ công ở đây
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMyIsImlhdCI6MTc0MTM1NzE4OCwiZXhwIjoxNzQxMzYwNzg4LCJpc3MiOiJpc3N1ZXIifQ.tFIQYMwAph0nxv8PLpC-UPY7znV7e1HGMBeOPVS0WCI`, // Thêm thủ công ở đây
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMyIsImlhdCI6MTc0MTQwMDc0MSwiZXhwIjoxNzQxNDA0MzQxLCJpc3MiOiJpc3N1ZXIifQ.OXfY8qGRivHnLmjyhb60VaCzqA9aDoKmv9gk4DZ3Qws`, // Thêm thủ công ở đây
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMyIsImlhdCI6MTc0MTQwMDc0MSwiZXhwIjoxNzQxNDA0MzQxLCJpc3MiOiJpc3N1ZXIifQ.OXfY8qGRivHnLmjyhb60VaCzqA9aDoKmv9gk4DZ3Qws`, // Thêm thủ công ở đây
      },
      method: 'DELETE',
    });
  },
};
