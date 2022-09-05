import axios from "axios";
import axiosRetry from "axios-retry";
import Config from "react-native-config";

import { retryOn5xxError } from "../lib";

export const KMPW_API_NUM_OF_RETRIES = 2;
export const kmpwApi = axios.create({ baseURL: Config.API_BASE_URL });

axiosRetry(kmpwApi, {
    retries: KMPW_API_NUM_OF_RETRIES,
    retryCondition: retryOn5xxError
});
