import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  allPosts: '/api/posts',
  singlePost: (id) => `/api/posts/${id}`,
  commentsForPost: (id) => `/api/posts/${id}/comments`,
  singleComment: (id, commentId) => `/api/posts/${id}/comments/${commentId}`,
  singleUser: (id) => `/api/users/${id}`,
  login: `/api/login`,
  register: `/api/register`
};

const GET = (endpoint) => axios.get(endpoint);
const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body);
const PUT = (endpoint, body, headers) => axios.put(endpoint, body, headers);
const DELETE = (endpoint, headers) => axios.delete(endpoint, headers);

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${AUTH.getToken()}` }
});

export const API = { ENDPOINTS, GET, POST, PUT, DELETE, getHeaders };
