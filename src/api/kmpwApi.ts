import axios from "axios";
import { API_BASE_URL } from "react-native-dotenv";

export const kmpwApi = axios.create({ baseURL: API_BASE_URL });
