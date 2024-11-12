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
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      navigate("LoginFlow");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
