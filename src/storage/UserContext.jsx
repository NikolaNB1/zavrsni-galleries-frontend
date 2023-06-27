import { createContext } from "react";

const UserContext = createContext({
  user: {},
  loggedIn: false,
  logInUser: (user) => {},
  logOutUser: () => {},
});

export default UserContext;
