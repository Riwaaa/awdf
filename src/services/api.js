const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("token");
}

async function request(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const currentToken = getToken();

  if (currentToken) {
    headers.Authorization = `Bearer ${currentToken}`;
  }

  let response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    const error = new Error(
      "Unable to connect to the backend. Make sure the Express server is running on port 5000.",
    );
    error.status = 0;
    throw error;
  }

  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    localStorage.removeItem("token");
  }

  if (!response.ok) {
    const error = new Error(data.error || "Request failed");
    error.status = response.status;
    throw error;
  }

  return data;
}

export const registerUser = (body) =>
  request("/register", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const loginUser = (body) =>
  request("/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const getMe = () => request("/me");
export const getTasks = () => request("/tasks");

export const createTask = (body) =>
  request("/tasks", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const updateTask = (id, body) =>
  request(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });

export const deleteTask = (id) =>
  request(`/tasks/${id}`, {
    method: "DELETE",
  });
