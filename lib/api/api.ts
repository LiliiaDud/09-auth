import axios from 'axios';

const vercelApiUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;
const fallbackApiUrl = 'http://localhost:3000';
const ApiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? vercelApiUrl ?? fallbackApiUrl;

export const client = axios.create({
  baseURL: ApiBaseUrl + '/api',
  withCredentials: true,
});
