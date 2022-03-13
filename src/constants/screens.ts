import { AuthorizedStackParams, UnauthorizedStackParams } from "../navigation";

export const AUTHORIZED_SCREEN_NAMES: { [key: string]: keyof AuthorizedStackParams } = {
    HOME: "Home"
};

export const UNAUTHORIZED_SCREEN_NAMES: { [key: string]: keyof UnauthorizedStackParams } = {
    LOGIN: "Login",
    REGISTER: "Register"
};
