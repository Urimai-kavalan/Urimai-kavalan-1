const API_BASE_URL = '/api';

// Auth endpoints that should NOT trigger a global logout/redirect on 401.
// A 401 from these endpoints means wrong credentials, not an expired session.
const AUTH_ENDPOINTS = ['/auth/login', '/auth/register'];

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const isAuthEndpoint = AUTH_ENDPOINTS.some((path) => endpoint === path);

    if (!isAuthEndpoint) {
      // Expired/invalid session on a protected endpoint → clear state and redirect
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }
    // For auth endpoints (login/register), fall through so the caller
    // can read the error message and display it to the user.
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Error: ${response.status} ${response.statusText}`);
  }

  return data;
};
