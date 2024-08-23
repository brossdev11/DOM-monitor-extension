import axios, { AxiosInstance } from 'axios';

// Determines if the environment is development
export const isDev = process.env.NODE_ENV === 'development';

// Base URL for API requests
export const baseUrl = 'http://localhost:3000';

// Creates an Axios instance for making HTTP requests
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
