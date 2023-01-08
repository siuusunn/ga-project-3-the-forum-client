import axios from "axios";
import { AUTH } from "./auth";

const ENDPOINTS = {
  allPosts: "/api/posts",
  singlePost: (id) => `/api/posts/${id}`,
  commentsForPost: (id) => `/api/posts/${id}/comments`,
  singleComment: (commentId) => `/api/comments/${commentId}`,
  singleUser: (id) => `/api/users/${id}`,
  login: `/api/login`,
  register: `/api/register`,
  search: (query) => `/api//posts/search?search=${query}`,
  cloudinary: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
};

const GET = (endpoint) => axios.get(endpoint);
const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body);
const PUT = (endpoint, body, headers) => axios.put(endpoint, body, headers);
const DELETE = (endpoint, headers) => axios.delete(endpoint, headers);

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${AUTH.getToken()}` },
});

export const API = { ENDPOINTS, GET, POST, PUT, DELETE, getHeaders };
