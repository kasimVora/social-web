// API Base URL - can be set based on environment
const BASE_URL = 'http://192.168.41.107:8000/';

// API Endpoints
const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/loginUser',
    REGISTER: '/createUser',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  USER: {
    PROFILE: '/users/me',
    UPDATE_PROFILE: '/users/me',
    CHANGE_PASSWORD: '/users/change-password',
    SEARCH: '/users/search',
    GET_BY_ID: (userId) => `/users/${userId}`,
  },
  POSTS: {
    CREATE: '/posts',
    GET_ALL: '/posts',
    GET_BY_ID: (postId) => `/posts/${postId}`,
    LIKE: (postId) => `/posts/${postId}/like`,
    COMMENT: (postId) => `/posts/${postId}/comments`,
    DELETE_COMMENT: (postId, commentId) => `/posts/${postId}/comments/${commentId}`,
  },
  STORIES: {
    CREATE: '/stories',
    GET_ALL: '/stories',
    GET_USER_STORIES: (userId) => `/stories/user/${userId}`,
  },
  // Add more endpoint categories as needed
};

// Social Login URLs
const SOCIAL_LOGIN_URLS = {
  FACEBOOK: `${BASE_URL}/auth/facebook`,
  GOOGLE: `${BASE_URL}/auth/google`,
  GITHUB: `${BASE_URL}/auth/github`,
};

// Export all constants
export { BASE_URL, API_ENDPOINTS, SOCIAL_LOGIN_URLS };