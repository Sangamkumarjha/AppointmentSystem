const API_URL = 'http://localhost:5000';

const request = async (url, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = token;
  }

  const response = await fetch(`${API_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await response.json();
  return data;
};

export const register = (user) => request('/auth/register', 'POST', user);
export const login = (credentials) => request('/auth/login', 'POST', credentials);
export const getUsers = (token) => request('/users', 'GET', null, token);
export const getUser = (id, token) => request(`/users/${id}`, 'GET', null, token);
export const updateUser = (id, user, token) => request(`/users/${id}`, 'PUT', user, token);
export const deleteUser = (id, token) => request(`/users/${id}`, 'DELETE', null, token);
export const createAppointment = (appointment, token) => request('/appointments', 'POST', appointment, token);
export const getAppointments = (token) => request('/appointments', 'GET', null, token);
export const updateAppointmentStatus = (id, status, token) => request(`/appointments/${id}`, 'PUT', status, token);
export const deleteAppointment = (id, token) => request(`/appointments/${id}`, 'DELETE', null, token);


export const confirmAppointment = async (id, token) => {
  try {
    await axios.patch(`${API_URL}/appointments/${id}/confirm`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error confirming appointment:', error);
    throw error;
  }
};