import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "../appwrite";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  async function login(email, password) {
    try {
      const loggedIn = await account.createEmailSession(email, password);
      setUser(loggedIn);
      return { success: true, data: loggedIn };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  }

  async function logout() {
    await account.deleteSession("current");
    setUser(null);
  }

  async function register(email, password) {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error) {
      console.log(error);
      setError(error.message.split(":")[1]?.trim());
    }
  }

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <UserContext.Provider
      value={{ current: user, error, login, logout, register }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
