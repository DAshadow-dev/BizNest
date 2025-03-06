import axios from 'axios';
const API_URL = "http://localhost:5000/api";

export const registerUser = (user) =>
  axios.post(`${API_URL}/auth/register`, user);
export const loginUser = (user) => axios.post(`${API_URL}/auth/login`, user);
export const sendMessage = (message, token) =>
  axios.post(
    `${API_URL}/chat/send`,
    { message },
    { headers: { Authorization: `Bearer ${token}` } }
  );

export const getMessages = (token) => 
  axios.get(`${API_URL}/chat/messages`, { headers: { Authorization: `Bearer ${token}` }});