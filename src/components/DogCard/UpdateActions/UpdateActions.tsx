import React, { FC } from "react";
import { TouchableOpacity, View, ViewProps } from "react-native";

import LogoutIcon from "@/assets/svg/logout.svg";
import { Button } from "@/components";

import { styles } from "./styles";

export type UpdateActionsProps = ViewProps & {
    onExitPress: () => void;
    onDeletePress: () => void;
    onUpdatePress: () => void;
};

export const UpdateActions: FC<UpdateActionsProps> = ({
    onExitPress,
    onDeletePress,
    onUpdatePress,
    style,
    ...rest
}) => {
    return (
        <View style={[styles.container, style]} {...rest}>
            <View style={styles.buttonRow}>
                <Button
                    icon={<LogoutIcon {...styles.buttonIcon} />}
                    onPress={onUpdatePress}
                    secondary
                    size="sm"
                    text="Update"
                />
                <Button
                    containerStyle={styles.removeButton}
                    icon={<LogoutIcon {...styles.buttonIcon} />}
                    onPress={onDeletePress}
                    size="sm"
                    text="Remove"
                />
            </View>
            <TouchableOpacity onPress={onExitPress}>
                <LogoutIcon {...styles.exitIcon} />
            </TouchableOpacity>
        </View>
    );
};
