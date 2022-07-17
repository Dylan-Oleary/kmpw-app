import axios from "axios";
import Config from "react-native-config";

export const kmpwApi = axios.create({ baseURL: Config.API_BASE_URL });
