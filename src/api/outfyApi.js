import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import {navigate} from "../navigation/navigationRef";

// Ensure correct access to the extra field
const {BASE_URL} = Constants.expoConfig.extra;

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      console.log("token from outfyapi:", token);
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("No token found, loggint out...");
      navigate("LoginFlow");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
