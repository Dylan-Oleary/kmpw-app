import React, { FC, useMemo } from "react";
import { View, ViewProps } from "react-native";
import { isValueOfType } from "@theonlydevsever/utilities";

import CloseIcon from "@/assets/svg/close.svg";
import { Button, Container, HeaderText, Text } from "@/components";
import { UserMessageTheme } from "@/types";

import { getAlertStyles, styles } from "./styles";

export interface CommonAlertProps {
    body?: string | JSX.Element;
    messageList?: string[];
    theme?: UserMessageTheme;
    title?: string;
}

export interface DismissableAlertProps extends CommonAlertProps {
    isDismissable?: true;
    onDismiss: () => void;
}

export interface NonDismissableAlertProps extends CommonAlertProps {
    isDismissable?: false;
    onDismiss?: never;
}

export type AlertProps = (DismissableAlertProps | NonDismissableAlertProps) & ViewProps;
export type AlertControl = Omit<AlertProps, "onDismiss" | "isDismissable"> & { show: boolean };

export const Alert: FC<AlertProps> = ({
    body,
    isDismissable = false,
    messageList = [],
    onDismiss,
    style,
    theme = "info",
    title,
    ...rest
}) => {
    const alertStyles = useMemo(() => getAlertStyles(theme), [theme]);

    return (
        <Container style={[styles.container, alertStyles?.container, style]} {...rest}>
            {title && (
                <HeaderText size="sm" style={[alertStyles?.title]}>
                    {title}
                </HeaderText>
            )}
            {isValueOfType(body, "string") ? (
                <Text size="sm" style={[alertStyles?.messageText, styles.messageContainer]}>
                    {body}
                </Text>
            ) : (
                body
            )}
            {messageList.length > 0 && (
                <View style={[styles.messageContainer, styles.listContainer]}>
                    {messageList.map((message, i) => (
                        <Text key={i} size="sm" style={alertStyles?.messageText}>
                            &bull; {message}
                        </Text>
                    ))}
                </View>
            )}
            {isDismissable && (
                <View style={styles.buttonRow}>
                    <Button
                        containerStyle={alertStyles.button}
                        icon={<CloseIcon {...styles.buttonIcon} />}
                        size="xs"
                        onPress={onDismiss}
                        text="Dismiss"
                    />
                </View>
            )}
        </Container>
    );
};
