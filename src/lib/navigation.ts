import { CommonActions } from "@react-navigation/native";

export const resetHomeStack = () =>
    CommonActions.reset({
        index: 0,
        routes: [{ name: "Home" }]
    });
