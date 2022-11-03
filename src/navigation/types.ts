import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Dog, DogFormSubmission } from "@/types";

export type AppStackParams = {
    AuthorizedNav: undefined;
    UnauthorizedNav: undefined;
};

export type AuthorizedStackParams = {
    DeleteAccount: DeleteAccountScreenRouteParams;
    HomeStack: undefined;
    LocationDisabled: undefined;
};

export type UnauthorizedStackNavigationProp = NativeStackNavigationProp<UnauthorizedStackParams>;
export type UnauthorizedStackParams = {
    Login: undefined;
    Register: undefined;
};

export type AccountScreenRouteProp = RouteProp<Pick<HomeStackParams, "Account">>;
export type AccountScreenRouteParams = {};

export type AddOrEditDogScreenRouteProp = RouteProp<Pick<HomeStackParams, "AddOrEditDog">>;
export type AddOrEditDogScreenRouteParams = {
    dog?: Dog;
};

export type ConfirmAddOrEditDogScreenRouteProp = RouteProp<
    Pick<HomeStackParams, "ConfirmAddOrEditDog">
>;
export type ConfirmAddOrEditDogScreenRouteParams = {
    data: DogFormSubmission;
    id?: string;
};

export type ConfirmRemoveDogScreenRouteProp = RouteProp<Pick<HomeStackParams, "ConfirmRemoveDog">>;
export type ConfirmRemoveDogScreenRouteParams = {
    dog: Dog;
};

export type DeleteAccountScreenRouteProp = RouteProp<Pick<HomeStackParams, "DeleteAccount">>;
export type DeleteAccountScreenRouteParams = {};

export type HomeStackNavigationProp = NativeStackNavigationProp<HomeStackParams>;
export type HomeStackParams = {
    Account: AccountScreenRouteParams;
    AddOrEditDog: AddOrEditDogScreenRouteParams;
    ConfirmAddOrEditDog: ConfirmAddOrEditDogScreenRouteParams;
    ConfirmRemoveDog: ConfirmRemoveDogScreenRouteParams;
    DeleteAccount: DeleteAccountScreenRouteParams;
    Home: undefined;
};
