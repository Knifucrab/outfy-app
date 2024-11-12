import React, {createContext, useState, useContext, useEffect} from "react";
import outfyApi from "../api/outfyApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useDispatch} from "react-redux";
import {setUser, clearUser} from "../actions/userActions";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const login = async (email, password) => {
    // Here we request to the api login route to authenticate the user with his email and password and save the token that the api sends to us if the auth data is Ok
    try {
      //Step 1: Auth and get token

      const response = await outfyApi.post("/auth/login", {email, password});

      const {token} = response.data;

      await AsyncStorage.setItem("token", token);

      //Step 2: Fetch user data
      const userDataRequest = await outfyApi.get("/users/me", {
        headers: {Authorization: `Bearer ${token}`},
      });
      const userData = userDataRequest.data;

      //Step 3: Save the user state and dispatch action in Redux
      setUserState(userData);
      dispatch(setUser(userData));

      return true;
    } catch (error) {
      return false;
    }
  };

  const register = (email, password) => {
    // Perform register logic here
    // setUser({email});
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUserState(null);
    dispatch(clearUser());
  };

  const tryLocalLogin = async () => {
    setLoading(true);

    const token = await AsyncStorage.getItem("token");
    if (token) {
      try {
        const userDataRequest = await outfyApi.get("/users/me", {
          headers: {Authorization: `Bearer ${token}`},
        });
        const userData = userDataRequest.data;
        setUserState(userData);
        dispatch(setUser(userData));
      } catch (error) {
        await AsyncStorage.removeItem("token");
        setUserState(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    tryLocalLogin();
  }, []);

  return (
    <AuthContext.Provider value={{user, login, register, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
