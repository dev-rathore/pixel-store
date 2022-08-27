import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// Actual value we want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  userData: null,
});

// Actual Component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const value = { currentUser, setCurrentUser, userData };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        const response = await createUserDocumentFromAuth(user);
        setUserData(response.data());
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []); // Run once only when the component mounts

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
