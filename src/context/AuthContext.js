import React, {createContext, useState, useContext} from "react";
import outfyApi from "../api/outfyApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setUser, clearUser} from "../actions/userActions";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUserState] = useState(null);

  const login = async (email, password) => {
    // Here we request to the api login route to authenticate the user with his email and password and save the token that the api sends to us if the auth data is Ok
    try {
      //Step 1: Auth and get token

      const response = await outfyApi.post("/auth/login", {email, password});
      console.log(response);
      const {token} = response.data;
      await AsyncStorage.setItem("token", token);

      // setUserState(user);
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
  };

  return (
    <AuthContext.Provider value={{user, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
