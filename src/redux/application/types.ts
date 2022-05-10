export interface IApplicationError {
    status?: number;
    message: number;
    details?: { message: string; field?: string }[];
    theme: string;
}

export interface IApplicationState {
    isLoading: boolean;
    errors: IApplicationError[];
}
