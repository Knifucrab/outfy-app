import React, {createContext, useState, useContext, useEffect} from "react";
import outfyApi from "../api/outfyApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setUser, clearUser} from "../actions/userActions";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    // Here we request to the api login route to authenticate the user with his email and password and save the token that the api sends to us if the auth data is Ok
    try {
      //Step 1: Auth and get token

      const response = await outfyApi.post("/auth/login", {email, password});

      const {token} = response.data;
      console.log(token);
      await AsyncStorage.setItem("token", token);

      setUserState({token});
      // dispatch(setUser(user));
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const register = (email, password) => {
    // Perform register logic here
    setUser({email});
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    setUserState(null);
  };

  const tryLocalLogin = async () => {
    setLoading(true);
    console.log("Trying local signin");
    const token = await AsyncStorage.getItem("token");
    if (token) {
      console.log(token);
      setUserState({token});
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
