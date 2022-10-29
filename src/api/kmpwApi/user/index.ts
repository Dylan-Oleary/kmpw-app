import { kmpwApi, KMPW_API_NUM_OF_RETRIES, retryOn401Error } from "@/api";

/**
 * Deletes a user
 *
 * @param accessToken A user access token
 */
export const deleteUser = (accessToken: string) =>
    kmpwApi.delete("/users", {
        headers: { Authorization: `Bearer ${accessToken}` },
        "axios-retry": {
            retries: KMPW_API_NUM_OF_RETRIES,
            retryCondition: retryOn401Error
        }
    });
