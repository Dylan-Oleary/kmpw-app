export interface IApplicationState {
    isLoading: boolean;
    errors: {
        status: number;
        message: number;
        details?: { message: string; field?: string }[];
        theme: string;
    }[];
}

export interface IUserState {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    accessToken: string;
}
