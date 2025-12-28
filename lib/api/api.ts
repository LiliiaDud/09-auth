import axios from 'axios';
import { ApiBaseUrl } from '../api-base-url';

export const client = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  baseURL: ApiBaseUrl + '/api',
  withCredentials: true,
});
