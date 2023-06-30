import { createContext } from "react";

const UserContext = createContext({
  user: {},
  loggedIn: false,
  logInUser: (user) => {},
  logOutUser: () => {},
  checkToken: () => {},
});

export default UserContext;
