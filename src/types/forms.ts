export type FormInputValidator<T = string, K = Record<string, unknown>> = (
    value?: T,
    opts?: K
) => string | undefined;
export type FormInputWithError<T = string> = {
    value?: T;
    error?: string;
};
