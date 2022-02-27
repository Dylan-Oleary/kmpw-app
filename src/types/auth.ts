export interface ILoginUserData {
    email: string;
    password: string;
}

export interface IRegisterUserData extends ILoginUserData {
    confirmPassword: string;
}
