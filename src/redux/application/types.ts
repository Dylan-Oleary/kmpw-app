export interface IApplicationError {
    status?: number;
    message: number;
    details?: { message: string; field?: string }[];
    theme: string;
}

export interface IApplicationState {
    errors: IApplicationError[];
    isLoadingInitialData: boolean;
    isNavigationReady: boolean;
    showLoadingOverlay: boolean;
}
