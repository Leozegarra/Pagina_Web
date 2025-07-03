const USER_STORAGE_KEY = "users_data";  // Cambiado a users_data

const SESSION_USER_KEY = "loggedUser";

export const getUsers = () => {
  return JSON.parse(localStorage.getItem(USER_STORAGE_KEY)) || [];
};

export const saveUser = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
};

export const loginUser = (email, password) => {
  const users = getUsers();
  return users.find((u) => u.email === email && u.password === password);
};

export const setLoggedUser = (user) => {
  localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
};

export const getLoggedUser = () => {
  return JSON.parse(localStorage.getItem(SESSION_USER_KEY));
};

export const logoutUser = () => {
  localStorage.removeItem(SESSION_USER_KEY);
};
