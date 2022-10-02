import { AxiosError } from "axios";

export interface KmpwApiErrorData {
    details?: Array<{
        message: string;
        field?: string;
    }>;
    errorCode: string;
    message: string;
    status: number;
}

export type KmpwApiError = AxiosError<KmpwApiErrorData>;
