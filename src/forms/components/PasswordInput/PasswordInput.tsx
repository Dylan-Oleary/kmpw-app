import React, { FC, useMemo, useState } from "react";
import { Pressable } from "react-native";

import EyeIcon from "@/assets/svg/eye.svg";
import EyeSlashIcon from "@/assets/svg/eye-slash.svg";
import { TextInput, TextInputProps } from "@/forms";

import { styles } from "./styles";

type TextInputOmitProp =
    | "autoCapitalize"
    | "autoComplete"
    | "postFix"
    | "preFix"
    | "secureTextEntry";

export interface PasswordInputProps extends Omit<TextInputProps, TextInputOmitProp> {
    isNewPassword?: boolean;
}

export const PasswordInput: FC<PasswordInputProps> = ({ isNewPassword = false, ...props }) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

    const postFix = useMemo(
        () => (
            <Pressable
                onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                style={styles.iconContainer}
            >
                {isPasswordHidden ? (
                    <EyeIcon {...styles.icon} />
                ) : (
                    <EyeSlashIcon {...styles.icon} />
                )}
            </Pressable>
        ),
        [isPasswordHidden]
    );

    return (
        <TextInput
            autoCapitalize="none"
            autoComplete={isNewPassword ? "password-new" : "password"}
            autoCorrect={false}
            postFix={postFix}
            secureTextEntry={isPasswordHidden}
            {...props}
        />
    );
};
