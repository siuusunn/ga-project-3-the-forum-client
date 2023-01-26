import axios from 'axios';
import { AUTH } from './auth';
import baseUrl from '../config';

const ENDPOINTS = {
  allPosts: `${process.env.REACT_APP_BASE_URL}/api/posts`,
  singlePost: (id) => `${process.env.REACT_APP_BASE_URL}/api/posts/${id}`,
  commentsForPost: (id) =>
    `${process.env.REACT_APP_BASE_URL}/api/posts/${id}/comments`,
  singleComment: (commentId) =>
    `${process.env.REACT_APP_BASE_URL}/api/comments/${commentId}`,
  allUsers: `${process.env.REACT_APP_BASE_URL}/api/users`,
  singleUser: (id) => `${process.env.REACT_APP_BASE_URL}/api/users/${id}`,
  login: `${process.env.REACT_APP_BASE_URL}/api/login`,
  register: `${process.env.REACT_APP_BASE_URL}/api/register`,
  search: (query) =>
    `${process.env.REACT_APP_BASE_URL}/api//posts/search?search=${query}`,
  cloudinary: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`
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
