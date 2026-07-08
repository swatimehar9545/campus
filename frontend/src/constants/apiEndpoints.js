// Define the base URL depending on the environment
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    ME: `${API_BASE_URL}/auth/me`,
  },
  PROJECTS: {
    BASE: `${API_BASE_URL}/projects`,
    BY_ID: (id) => `${API_BASE_URL}/projects/${id}`,
    PUBLISH: (id) => `${API_BASE_URL}/projects/${id}/publish`,
  },
  AI: {
    GENERATE_WEBSITE: `${API_BASE_URL}/ai/generate-website`,
    GENERATE_CONTENT: `${API_BASE_URL}/ai/generate-content`,
    GENERATE_IMAGE: `${API_BASE_URL}/ai/generate-image`,
  },
  BILLING: {
    PLANS: `${API_BASE_URL}/billing/plans`,
    SUBSCRIBE: `${API_BASE_URL}/billing/subscribe`,
  },
  USERS: {
    PROFILE: `${API_BASE_URL}/users/profile`,
    SETTINGS: `${API_BASE_URL}/users/settings`,
  }
};
