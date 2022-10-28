import { AuthorizedStackParams, HomeStackParams, UnauthorizedStackParams } from "@/navigation";

export type AuthorizedScreenOrController = AuthorizedStackParams & HomeStackParams;

export const AUTHORIZED_SCREEN_NAMES: {
    [key: string]: keyof AuthorizedScreenOrController;
} = {
    ACCOUNT: "Account",
    ADD_OR_EDIT_DOG: "AddOrEditDog",
    DELETE_ACCOUNT: "DeleteAccount",
    HOME: "Home",
    HOME_STACK: "HomeStack",
    LOCATION_DISABLED: "LocationDisabled"
};

export const UNAUTHORIZED_SCREEN_NAMES: { [key: string]: keyof UnauthorizedStackParams } = {
    LOGIN: "Login",
    REGISTER: "Register"
};
