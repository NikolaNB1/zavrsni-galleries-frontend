import { API } from "../shared/api";

export const registerUser = (
  first_name,
  last_name,
  email,
  password,
  password_confirmation
) => {
  return API.post("/register", {
    first_name,
    last_name,
    email,
    password,
    password_confirmation,
  });
};

export const logIn = (email, password) => {
  return API.post("/login", {
    email,
    password,
  });
};

export const logOut = () => {
  return API.post("/logout");
};

export const getUsers = () => {
  return API.get("/users");
};
export const getUserGalleries = (id) => {
  return API.get(`/users/${id}/galleries`);
};
export const getUserById = (id) => {
  return API.get(`/users/${id}`);
};
